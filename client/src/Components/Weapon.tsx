import React, { useEffect, useState } from "react"
import axios from "axios"
import RankTable from "./RankTable"
import { imageName, stringSort, useTitle, valueRender } from "./Common"
import { useParams } from "react-router-dom"
import { useTranslate } from "../Translate/hook"

interface Row {
  characterName: string
  weaponTypeName: string
  weaponName: string
  soloWinRate: number
  soloPickRate: number
  duoWinRate: number
  duoPickRate: number
  squadWinRate: number
  squadPickRate: number
}

function makeData(data: BserStat.Weapon.Response | undefined): Row[] {
  let result: Row[] = []
  if (data === undefined) {
    return result
  }
  if (data.CharacterList.length === 0) {
    return result
  }

  function extracted(chara: any, weaponType: any, weapon: any) {
    let d: Row = {
      characterName: chara.Name,
      weaponTypeName: weaponType.Name,
      weaponName: weapon.Name,
      soloWinRate: 0,
      soloPickRate: 0,
      duoWinRate: 0,
      duoPickRate: 0,
      squadWinRate: 0,
      squadPickRate: 0,
    }
    weapon.ModeList.forEach((mode: any) => {
      // console.log(mode)
      if (mode.Mode === "Solo") {
        d.soloWinRate = mode.WinRate
        d.soloPickRate = mode.PickRate
      }
      if (mode.Mode === "Duo") {
        d.duoWinRate = mode.WinRate
        d.duoPickRate = mode.PickRate
      }
      if (mode.Mode === "Squad") {
        d.squadWinRate = mode.WinRate
        d.squadPickRate = mode.PickRate
      }
    })

    return d
  }

  let d = extracted({ Name: "Base Win Rate" }, { Name: "" }, { ModeList: data.BaseWinRate })
  result.push(d)

  data.CharacterList.forEach((chara: any) => {
    // console.log(chara)
    if (chara.WeaponTypeList === null) {
      return
    }
    chara.WeaponTypeList.forEach((weaponType: any) => {
      if (weaponType.WeaponList === null) {
        return
      }
      weaponType.WeaponList.forEach((weapon: any) => {
        let d = extracted(chara, weaponType, weapon)
        result.push(d)
      })
    })
  })
  return result
}

interface Props {
  updated: string
  period: string
  label: string
  old: string
}

function Weapon(prop: Props) {
  const { t } = useTranslate()
  const [json, setJson] = useState<BserStat.Weapon.Response>()
  const [oldJson, setOldJson] = useState<BserStat.Weapon.Response>()

  let { tier } = useParams<{
    tier: string
  }>()

  let title = "Weapon(All)"
  if (tier === "high") {
    title = "Weapon(High Tier)"
  }

  useTitle(t(title) + " | BSER Stat", tier)

  function fetchUserRankJson(tier: string, label: string, isOld = false) {
    if (label === "") {
      return
    }
    let url = "/data/"
    url += label + "/"
    if (tier === "all") {
      url += "weapon_all.json"
    } else {
      url += "weapon_high.json"
    }
    axios
      .get<any>(url)
      .then((response: any) => {
        if (isOld) {
          setOldJson(response.data)
        } else {
          setJson(response.data)
        }
      })
      .catch((err: any) => {
        console.error(err)
      })
  }

  useEffect(() => {
    // console.log("effect:", prop)
    fetchUserRankJson(tier, prop.label)
    if (prop.old !== "") {
      fetchUserRankJson(tier, prop.old, true)
    }
  }, [tier, prop.label, prop.old])

  function valueCell(
    mode: string,
    column: string,
    isRawNumber = false,
    isReverseColor = false,
  ): (text: number, record: any) => any {
    return function (text: number, record: any): any {
      // console.log(record.characterName, record.weaponName, column)
      let old: number | null = null
      if (oldJson === undefined) {
        return null
      }
      if (oldJson.CharacterList.length !== 0) {
        const tmp1: any = oldJson.CharacterList.find((el: any) => {
          return el.Name === record.characterName
        })
        if (tmp1 !== undefined) {
          const tmp2: any = tmp1.WeaponTypeList.find((el: any) => {
            return el.Name === record.weaponTypeName
          })
          const tmp3: any = tmp2.WeaponList.find((el: any) => {
            return el.Name === record.weaponName
          })
          if (tmp3 !== undefined) {
            const tmp4: any = tmp3.ModeList.find((el: any) => {
              return el.Mode === mode
            });
            if (tmp4.hasOwnProperty(column)) {
              // console.log("winrate: ", tmp3[column])
              old = tmp4[column]
            }
          }

        }
      }
      return valueRender(text, old, isRawNumber, isReverseColor)
    }
  }

  interface FilterSet {
    text: string
    value: string
  }

  function characterFilter(json: BserStat.Weapon.Response | undefined) {
    let uniqueCharaList: FilterSet[] = []
    if (json === undefined) {
      return null
    }
    // console.log(data)
    json.CharacterList.forEach((chara: any) => {
      if (chara.Name === "") {
        return
      }
      uniqueCharaList.push({ text: t(chara.Name), value: chara.Name })
    })
    return uniqueCharaList
  }

  function weaponTypeFilter(json: BserStat.Weapon.Response | undefined) {
    let uniqueWeaponTypeList: FilterSet[] = []
    if (json === undefined) {
      return null
    }
    json.CharacterList.forEach((chara: any) => {
      if (chara.WeaponTypeList === null) {
        return
      }
      chara.WeaponTypeList.forEach((weapon: any) => {
        uniqueWeaponTypeList.push({ text: t(weapon.Name), value: weapon.Name })
      })
    })
    return uniqueWeaponTypeList.reduce<FilterSet[]>((a, v) => {
      if (!a.some((e) => e.value === v.value)) {
        a.push(v)
      }
      return a
    }, [])
  }

  function weaponFilter(json: BserStat.Weapon.Response | undefined) {
    let uniqueWeaponList: FilterSet[] = []
    if (json === undefined) {
      return null
    }
    json.CharacterList.forEach((chara: any) => {
      if (chara.WeaponTypeList === null) {
        return
      }
      chara.WeaponTypeList.forEach((weaponType: any) => {
        weaponType.WeaponList.forEach((weapon: any) => {
          uniqueWeaponList.push({ text: t(weapon.Name), value: weapon.Name })
        })
      })
    })
    return uniqueWeaponList.reduce<FilterSet[]>((a, v) => {
      if (!a.some((e) => e.value === v.value)) {
        a.push(v)
      }
      return a
    }, [])
  }

  function textCell(text: string, record: any): any {
    return t(text)
  }

  function characterCell(text: string, record: any): any {
    return (
      <div>
        {text !== "Base Win Rate" && (
          <img className={"thumbnail-character"} src={`/images/characters/${imageName(text)}.png`} alt={text} width={30} />
        )}

        {textCell(text, record)}
      </div>
    )
  }

  function weaponTypeCell(text: string, record: any): any {
    return (
      <div>
        {text !== undefined && text !== "" && (
          <img className={"thumbnail-weaponType"} src={`/images/weapon_types/${imageName(text)}.png`} alt={text} />
        )}

        {textCell(text, record)}
      </div>
    )
  }

  function weaponCell(text: string, record: any): any {
    return (
      <div>
        {text !== undefined && text !== "" && (
          <img className={"thumbnail-weapon"} src={`/images/items/${imageName(text)}.png`} alt={text} />
        )}

        {textCell(text, record)}
      </div>
    )
  }

  const columns = [
    {
      title: "",
      children: [
        {
          title: t("Character"),
          dataIndex: "characterName",
          sorter: (a: Row, b: Row) => stringSort(a.characterName, b.characterName),
          filters: characterFilter(json),
          onFilter: (value: any, record: any) => {
            if (record.characterName === "Base Win Rate") {
              return true
            }
            return record.characterName === value
          },
          filterMultiple: true,
          render: characterCell,
        },
        {
          title: t("Weapon Type"),
          dataIndex: "weaponTypeName",
          sorter: (a: Row, b: Row) => stringSort(a.weaponTypeName, b.weaponTypeName),
          filters: weaponTypeFilter(json),
          onFilter: (value: any, record: any) => {
            if (record.characterName === "Base Win Rate") {
              return true
            }
            return record.weaponTypeName === value
          },
          filterMultiple: true,
          render: weaponTypeCell,
        },
        {
          title: t("Weapon"),
          dataIndex: "weaponName",
          sorter: (a: Row, b: Row) => stringSort(a.weaponName, b.weaponName),
          filters: weaponFilter(json),
          onFilter: (value: any, record: any) => {
            if (record.characterName === "Base Win Rate") {
              return true
            }
            return record.weaponName === value
          },
          filterMultiple: true,
          render: weaponCell,
        },
      ],
    },
    {
      title: t("Solo"),
      className: "border-left",
      style: { borderLeft: "solid #000 2px", backgroundColor: "black !important" },
      children: [
        {
          title: t("Win Rate"),
          dataIndex: "soloWinRate",
          align: "right",
          className: "border-left",
          render: valueCell("Solo", "WinRate"),
          sorter: (a: Row, b: Row) => a.soloWinRate - b.soloWinRate,
        },
        {
          title: t("Pick Rate"),
          dataIndex: "soloPickRate",
          align: "right",
          render: valueCell("Solo", "PickRate"),
          sorter: (a: Row, b: Row) => a.soloPickRate - b.soloPickRate,
        },
      ],
    },
    {
      title: t("Duo"),
      className: "border-left",
      children: [
        {
          title: t("Win Rate"),
          dataIndex: "duoWinRate",
          align: "right",
          className: "border-left",
          render: valueCell("Duo", "WinRate"),
          sorter: (a: Row, b: Row) => a.duoWinRate - b.duoWinRate,
        },
        {
          title: t("Pick Rate"),
          dataIndex: "duoPickRate",
          align: "right",
          render: valueCell("Duo", "PickRate"),
          sorter: (a: Row, b: Row) => a.duoPickRate - b.duoPickRate,
        },
      ],
    },
    {
      title: t("Squad"),
      className: "border-left",
      children: [
        {
          title: t("Win Rate"),
          dataIndex: "squadWinRate",
          align: "right",
          className: "border-left",
          render: valueCell("Squad", "WinRate"),
          sorter: (a: Row, b: Row) => a.squadWinRate - b.squadWinRate,
        },
        {
          title: t("Pick Rate"),
          dataIndex: "squadPickRate",
          align: "right",
          render: valueCell("Squad", "PickRate"),
          sorter: (a: Row, b: Row) => a.squadPickRate - b.squadPickRate,
        },
      ],
    },
  ]

  return <RankTable title={title} columns={columns} data={makeData(json)} {...prop} />
}

export default Weapon
