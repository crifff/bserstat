import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import axios from "axios";
import { SupportedLocales, t } from "../Translate/translate";
import { useParams } from "react-router-dom";
import RankTable from "./RankTable";
import { stringSort, useTitle, valueRender } from "./Common";

interface Row {
  characterName: string;
  weaponName: string;
  soloWinRate: number;
  soloPickRate: number;
  soloPlayerKill: number;
  soloAverageRank: number;
  duoWinRate: number;
  duoPickRate: number;
  duoAverageRank: number;
  duoPlayerKill: number;
  squadWinRate: number;
  squadPickRate: number;
  squadAverageRank: number;
  squadPlayerKill: number;
}

function makeData(data: any): Row[] {
  let result: Row[] = []
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
      duoWinRate: 0,
      duoPickRate: 0,
      duoAverageRank: 0,
      duoPlayerKill: 0,
      squadWinRate: 0,
      squadPickRate: 0,
      squadAverageRank: 0,
      squadPlayerKill: 0,
    }
    weapon.ModeList.forEach((mode: any) => {
      // console.log(mode)
      if (mode.Mode === "Solo") {
        d.soloWinRate = (mode.WinRate)
        d.soloPickRate = (mode.PickRate)
        d.soloPlayerKill = (mode.PlayerKill)
        d.soloAverageRank = (mode.AverageRank)
      }
      if (mode.Mode === "Duo") {
        d.duoWinRate = (mode.WinRate)
        d.duoPickRate = (mode.PickRate)
        d.duoPlayerKill = (mode.PlayerKill)
        d.duoAverageRank = (mode.AverageRank)
      }
      if (mode.Mode === "Squad") {
        d.squadWinRate = (mode.WinRate)
        d.squadPickRate = (mode.PickRate)
        d.squadPlayerKill = (mode.PlayerKill)
        d.squadAverageRank = (mode.AverageRank)
      }
    })
    return d;
  }

  let d = extracted({Name: "Base Win Rate"}, {ModeList: data.BaseWinRate});
  result.push(d)

  data.CharacterList.forEach((chara: any) => {
    // console.log(chara)
    if (chara.RankWeaponList === null) {
      return
    }
    chara.RankWeaponList.forEach((weapon: any) => {

      let d = extracted(chara, weapon);
      result.push(d)

    })
  })
  return result
}

interface UserProp {
  updated: string
  period: string
  label: string
  before: string
  lang: SupportedLocales
}


function User(prop: UserProp) {
  const [json, setJson] = useState({CharacterList: []});
  const [beforeJson, setBeforeJson] = useState({CharacterList: []});

  let {tier} = useParams<{
    tier: string
  }>();

  let title = "Character(All)"
  if (tier === "high") {
    title = "Character(High Tier)"
  }

  useTitle(t(title, prop.lang) + " | BSER Stat", tier);

  function fetchUserRankJson(tier: string, label: string, isBefore = false) {
    if (label === "") {
      return
    }
    let url = "https://storage.googleapis.com/bserstat/data/"
    url += label + "/"
    if (tier === "all") {
      url += "character_all.json"
    }else {
      url += "character_high.json"
    }
    axios.get<any>(url)
      .then((response: any) => {
        if (isBefore) {
          setBeforeJson(response.data)
        }else {
          setJson(response.data)
        }
      })
      .catch((err: any) => {
        console.error(err)
      })

  }

  useEffect(() => {
    // console.log("effect:", prop)
    fetchUserRankJson(tier, prop.label);
    if (prop.before !== "") {
      fetchUserRankJson(tier, prop.before, true);
    }
  }, [prop]);

  function textCell(text: string, record: any): any {
    return t(text, prop.lang)
  }

  function valueCell(mode: string, column: string, isRawNumber = false, isReverseColor = false): (text: number, record: any) => any {
    return function (text: number, record: any): any {
      // console.log(record.characterName, record.weaponName, column)
      let before: any = null
      if (beforeJson.CharacterList.length !== 0) {
        const tmp1: any = beforeJson.CharacterList.find((el: any) => {
          return el.Name === record.characterName
        })
        if (tmp1 !== undefined) {
          // console.log("tmp1: ", tmp1.RankWeaponList)
          const tmp2: any = tmp1.RankWeaponList.find((el: any) => {
            return el.Name === record.weaponName
          })
          // console.log("tmp2: ", tmp2)
          const tmp3: any = tmp2.ModeList.find((el: any) => {
            return el.Mode === mode
          })
          // console.log("tmp3: ", tmp3)

          if (tmp3.hasOwnProperty(column)) {
            // console.log("winrate: ", tmp3[column])
            before = tmp3[column]
          }
        }
      }

      return valueRender(text, before, isRawNumber, isReverseColor);
    }
  }



  interface FilterSet {
    text: string;
    value: string
  }

  function characterFilter(json: { CharacterList: any[] }, lang: SupportedLocales) {
    let uniqueCharaList: FilterSet[] = []
    json.CharacterList.forEach((chara: any) => {
      if (chara.Name === "") {
        return
      }
      uniqueCharaList.push({text: t(chara.Name, lang), value: chara.Name})
    })
    return uniqueCharaList;
  }

  function weaponTypeFilter(json: { CharacterList: any[] }, lang: SupportedLocales) {
    let uniqueWeaponTypeList: FilterSet[] = []
    json.CharacterList.forEach((chara: any) => {
      if (chara.WeaponTypeList === null) {
        return
      }
      chara.RankWeaponList.forEach((weapon: any) => {
        uniqueWeaponTypeList.push({text: t(weapon.Name, lang), value: weapon.Name})
      })
    })
    return uniqueWeaponTypeList.reduce<FilterSet[]>((a, v) => {
      if (!a.some((e) => e.value === v.value)) {
        a.push(v);
      }
      return a;
    }, []);
  }

  const columns = [
    {
      title: "",
      children: [
        {
          title: t('Character', prop.lang),
          dataIndex: 'characterName',
          sorter: (a: Row, b: Row) => stringSort(a.characterName, b.characterName),
          filters: characterFilter(json, prop.lang),
          onFilter: (value: any, record: any) => {
            if (record.characterName === "Base Win Rate") {
              return true
            }
            return record.characterName === value
          },
          filterMultiple: true,
          render: textCell,
        },
        {
          title: t('Weapon', prop.lang),
          dataIndex: 'weaponName',
          sorter: (a: Row, b: Row) => stringSort(a.weaponName, b.weaponName),
          filters: weaponTypeFilter(json, prop.lang),
          onFilter: (value: any, record: any) => {
            if (record.characterName === "Base Win Rate") {
              return true
            }
            return record.weaponName === value
          },
          filterMultiple: true,
          render: textCell,
        }
      ]
    },
    {
      title: t("Solo", prop.lang),
      className: "border-left",
      style: {borderLeft: "solid #000 2px", backgroundColor: "black !important"},
      children: [
        {
          title: t('Win Rate', prop.lang),
          dataIndex: 'soloWinRate',
          align: "right",
          className: "border-left",
          render: valueCell("Solo", "WinRate"),
          sorter: (a: Row, b: Row) => a.soloWinRate - b.soloWinRate,

        },
        {
          title: t('Pick Rate', prop.lang),
          dataIndex: 'soloPickRate',
          align: "right",
          render: valueCell("Solo", "PickRate"),
          sorter: (a: Row, b: Row) => a.soloPickRate - b.soloPickRate,
        },
        {
          title: t('Player Kill', prop.lang),
          dataIndex: 'soloPlayerKill',
          align: "right",
          render: valueCell("Solo", "PlayerKill", true),
          sorter: (a: Row, b: Row) => a.soloPlayerKill - b.soloPlayerKill,
        },
        {
          title: t('Average Rank', prop.lang),
          dataIndex: 'soloAverageRank',
          align: "right",
          render: valueCell("Solo", "AverageRank", true, true),
          sorter: (a: Row, b: Row) => a.soloAverageRank - b.soloAverageRank,
        },
      ]
    },
    {
      title: t("Duo", prop.lang),
      className: "border-left",
      children: [
        {
          title: t('Win Rate', prop.lang),
          dataIndex: 'duoWinRate',
          align: "right",
          className: "border-left",
          render: valueCell("Duo", "WinRate"),
          sorter: (a: Row, b: Row) => a.duoWinRate - b.duoWinRate,

        },
        {
          title: t('Pick Rate', prop.lang),
          dataIndex: 'duoPickRate',
          align: "right",
          render: valueCell("Duo", "PickRate"),
          sorter: (a: Row, b: Row) => a.duoPickRate - b.duoPickRate,
        },
        {
          title: t('Player Kill', prop.lang),
          dataIndex: 'duoPlayerKill',
          align: "right",
          render: valueCell("Duo", "PlayerKill", true),
          sorter: (a: Row, b: Row) => a.duoPlayerKill - b.duoPlayerKill,
        },
        {
          title: t('Average Rank', prop.lang),
          dataIndex: 'duoAverageRank',
          align: "right",
          render: valueCell("Duo", "AverageRank", true, true),
          sorter: (a: Row, b: Row) => a.duoAverageRank - b.duoAverageRank,
        },
      ]
    },
    {
      title: t("Squad", prop.lang),
      className: "border-left",
      children: [
        {
          title: t('Win Rate', prop.lang),
          dataIndex: 'squadWinRate',
          align: "right",
          className: "border-left",
          render: valueCell("Squad", "WinRate"),
          sorter: (a: Row, b: Row) => a.squadWinRate - b.squadWinRate,

        },
        {
          title: t('Pick Rate', prop.lang),
          dataIndex: 'squadPickRate',
          align: "right",
          render: valueCell("Squad", "PickRate"),
          sorter: (a: Row, b: Row) => a.squadPickRate - b.squadPickRate,
        },
        {
          title: t('Player Kill', prop.lang),
          dataIndex: 'squadPlayerKill',
          align: "right",
          render: valueCell("Squad", "PlayerKill", true),
          sorter: (a: Row, b: Row) => a.squadPlayerKill - b.squadPlayerKill,
        },
        {
          title: t('Average Rank', prop.lang),
          dataIndex: 'squadAverageRank',
          align: "right",
          render: valueCell("Squad", "AverageRank", true, true),
          sorter: (a: Row, b: Row) => a.squadAverageRank - b.squadAverageRank,
        },
      ]
    },
  ];
  return <RankTable title={title} columns={columns} data={makeData(json)} {...prop} />
}

export default User;