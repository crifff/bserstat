import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import RankTable from "./RankTable"
import { imageName, stringSort, useTitle, valueRender } from "./Common"
import { useTranslate } from "../Translate/hook"

interface Row {
  characterName: string
  weaponName: string
  soloWinRate: number
  soloPickRate: number
  soloPlayerKill: number
  soloAverageRank: number
  soloMMREfficiency: number
  duoWinRate: number
  duoPickRate: number
  duoAverageRank: number
  duoPlayerKill: number
  duoMMREfficiency: number
  squadWinRate: number
  squadPickRate: number
  squadAverageRank: number
  squadPlayerKill: number
  squadMMREfficiency: number
}

function makeData(data: BserStat.Character.Response | undefined): Row[] {
  let result: Row[] = []
  if (data === undefined) {
    return result
  }
  if (data.CharacterList.length === 0) {
    return result
  }

  function extracted(chara: any, weapon: any) {
    let d: Row = {
      characterName: chara.Name,
      weaponName: weapon.Name,
      soloWinRate: 0,
      soloPickRate: 0,
      soloAverageRank: 0,
      soloPlayerKill: 0,
      soloMMREfficiency: 0,
      duoWinRate: 0,
      duoPickRate: 0,
      duoAverageRank: 0,
      duoPlayerKill: 0,
      duoMMREfficiency: 0,
      squadWinRate: 0,
      squadPickRate: 0,
      squadAverageRank: 0,
      squadPlayerKill: 0,
      squadMMREfficiency: 0,
    }
    weapon.ModeList.forEach((mode: any) => {
      // console.log(mode)
      if (mode.Mode === "Solo") {
        d.soloWinRate = mode.WinRate
        d.soloPickRate = mode.PickRate
        d.soloPlayerKill = mode.PlayerKill
        d.soloAverageRank = mode.AverageRank
        d.soloMMREfficiency = mode.MMREfficiency
      }
      if (mode.Mode === "Duo") {
        d.duoWinRate = mode.WinRate
        d.duoPickRate = mode.PickRate
        d.duoPlayerKill = mode.PlayerKill
        d.duoAverageRank = mode.AverageRank
        d.duoMMREfficiency = mode.MMREfficiency
      }
      if (mode.Mode === "Squad") {
        d.squadWinRate = mode.WinRate
        d.squadPickRate = mode.PickRate
        d.squadPlayerKill = mode.PlayerKill
        d.squadAverageRank = mode.AverageRank
        d.squadMMREfficiency = mode.MMREfficiency
      }
    })
    return d
  }

  let d = extracted({ Name: "Base Win Rate" }, { ModeList: data.BaseWinRate })
  result.push(d)

  data.CharacterList.forEach((chara: any) => {
    // console.log(chara)
    if (chara.RankWeaponList === null) {
      return
    }
    chara.RankWeaponList.forEach((weapon: any) => {
      let d = extracted(chara, weapon)
      result.push(d)
    })
  })
  return result
}

interface UserProp {
  updated: string
  period: string
  label: string
  old: string
}

function Character(prop: UserProp) {
  const { t } = useTranslate()
  const [json, setJson] = useState<BserStat.Character.Response>()
  const [oldJson, setOldJson] = useState<BserStat.Character.Response>()

  let { tier } = useParams<{
    tier: string
  }>()

  let title = "Character(All)"
  if (tier === "high") {
    title = "Character(High Tier)"
  }

  useTitle(t(title) + " | BSER Stat", tier)

  function fetchUserRankJson(tier: string, label: string, isOld = false) {
    if (label === "") {
      return
    }
    let url = "/data/"
    url += label + "/"
    if (tier === "all") {
      url += "character_all.json"
    } else {
      url += "character_high.json"
    }
    axios
      .get<BserStat.Character.Response>(url)
      .then((response) => {
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
      if (oldJson === undefined) {
        return null
      }
      // console.log(record.characterName, record.weaponName, column)
      let old: number | null = null
      if (oldJson.CharacterList.length !== 0) {
        const tmp1 = oldJson.CharacterList.find((el: any) => {
          return el.Name === record.characterName
        })
        if (tmp1 !== undefined) {
          // console.log("tmp1: ", tmp1.RankWeaponList)
          const tmp2 = tmp1.RankWeaponList.find((el: any) => {
            return el.Name === record.weaponName
          })
          if (tmp2 !== undefined) {
            // console.log("tmp2: ", tmp2)
            const tmp3 = tmp2.ModeList.find((el: any) => {
              return el.Mode === mode
            })
            // console.log("tmp3: ", tmp3)
            if (tmp3 !== undefined && tmp3.hasOwnProperty(column)) {
              // console.log("winrate: ", tmp3[column])
              old = tmp3[column]
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

  function characterFilter(json: BserStat.Character.Response | undefined) {
    if (json === undefined) {
      return null
    }
    let uniqueCharaList: FilterSet[] = []
    json.CharacterList.forEach((chara: any) => {
      if (chara.Name === "") {
        return
      }
      uniqueCharaList.push({ text: t(chara.Name), value: chara.Name })
    })
    return uniqueCharaList
  }

  function weaponTypeFilter(json: BserStat.Character.Response | undefined) {
    if (json === undefined) {
      return null
    }
    let uniqueWeaponTypeList: FilterSet[] = []
    json.CharacterList.forEach((chara: any) => {
      if (chara.WeaponTypeList === null) {
        return
      }
      chara.RankWeaponList.forEach((weapon: any) => {
        if (weapon.Name === "") {
          return
        }
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

  function textCell(text: string, record: any): any {
    return t(text)
  }

  function characterCell(text: string, record: any): any {
    return (
      <div>
        {text !== "Base Win Rate" && text !== "All Melee" &&text !== "All Ranged" &&(
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
          title: t("Weapon"),
          dataIndex: "weaponName",
          sorter: (a: Row, b: Row) => stringSort(a.weaponName, b.weaponName),
          filters: weaponTypeFilter(json),
          onFilter: (value: any, record: any) => {
            if (record.characterName === "Base Win Rate") {
              return true
            }
            return record.weaponName === value
          },
          filterMultiple: true,
          render: weaponTypeCell,
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
        {
          title: t("Player Kill"),
          dataIndex: "soloPlayerKill",
          align: "right",
          render: valueCell("Solo", "PlayerKill", true),
          sorter: (a: Row, b: Row) => a.soloPlayerKill - b.soloPlayerKill,
        },
        {
          title: t("Average Rank"),
          dataIndex: "soloAverageRank",
          align: "right",
          render: valueCell("Solo", "AverageRank", true, true),
          sorter: (a: Row, b: Row) => a.soloAverageRank - b.soloAverageRank,
        },
        {
          title: t("MMR Efficiency"),
          dataIndex: "soloMMREfficiency",
          align: "right",
          render: valueCell("Solo", "MMR Efficiency", true, true),
          sorter: (a: Row, b: Row) => a.soloMMREfficiency - b.soloMMREfficiency,
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
        {
          title: t("Player Kill"),
          dataIndex: "duoPlayerKill",
          align: "right",
          render: valueCell("Duo", "PlayerKill", true),
          sorter: (a: Row, b: Row) => a.duoPlayerKill - b.duoPlayerKill,
        },
        {
          title: t("Average Rank"),
          dataIndex: "duoAverageRank",
          align: "right",
          render: valueCell("Duo", "AverageRank", true, true),
          sorter: (a: Row, b: Row) => a.duoAverageRank - b.duoAverageRank,
        },
        {
          title: t("MMR Efficiency"),
          dataIndex: "duoMMREfficiency",
          align: "right",
          render: valueCell("Duo", "MMR Efficiency", true, true),
          sorter: (a: Row, b: Row) => a.duoMMREfficiency - b.duoMMREfficiency,
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
        {
          title: t("Player Kill"),
          dataIndex: "squadPlayerKill",
          align: "right",
          render: valueCell("Squad", "PlayerKill", true),
          sorter: (a: Row, b: Row) => a.squadPlayerKill - b.squadPlayerKill,
        },
        {
          title: t("Average Rank"),
          dataIndex: "squadAverageRank",
          align: "right",
          render: valueCell("Squad", "AverageRank", true, true),
          sorter: (a: Row, b: Row) => a.squadAverageRank - b.squadAverageRank,
        },
        {
          title: t("MMR Efficiency"),
          dataIndex: "squadMMREfficiency",
          align: "right",
          render: valueCell("Squad", "MMR Efficiency", true, true),
          sorter: (a: Row, b: Row) => a.squadMMREfficiency - b.squadMMREfficiency,
        },
      ],
    },
  ]
  return <RankTable title={title} columns={columns} data={makeData(json)} {...prop} />
}

export default Character
