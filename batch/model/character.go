package model

import (
	"bytes"
	"encoding/csv"
	"github.com/crifff/bserstats/batch/util"
)


const LabelCharacterAllRank = "All Ranks"
const LabelCharacterTopTier = "Top Tiers"

type CharacterRanking struct {
	BaseWinRate   []Rate
	CharacterList []Character
}

type Character struct {
	Name           string
	RankWeaponList []RankWeapon
}
type RankWeapon struct {
	Name     string
	ModeList []Rate
}
type Rate struct {
	Mode        string
	WinRate     float64
	PickRate    float64
	PlayerKill  float64
	AverageRank float64
}

func NewAllCharacterRanking(data [][]string) CharacterRanking {
	rankData := CharacterRanking{
		BaseWinRate:   extractUserRankBaseWinRate(LabelCharacterAllRank, data),
		CharacterList: extractUserRank(LabelCharacterAllRank, data),
	}
	return rankData
}

func NewTopTierCharacterRanking(data [][]string) CharacterRanking {
	rankData := CharacterRanking{
		BaseWinRate:   extractUserRankBaseWinRate(LabelCharacterTopTier, data),
		CharacterList: extractUserRank(LabelCharacterTopTier, data),
	}
	return rankData
}

func (r CharacterRanking) CSV() string {
	var data [][]string
	data = append(data, r.Header())
	base := []string{
		"Base Win Rate", "",
	}
	for _, rate := range r.BaseWinRate {
		base = append(base, []string{util.FToPar(rate.WinRate), util.FToPar(rate.PickRate), util.FToS(rate.PlayerKill), util.FToS(rate.AverageRank)}...)
	}
	data = append(data, base)
	for _, character := range r.CharacterList {
		for _, weapon := range character.RankWeaponList {
			line := []string{
				character.Name,
				weapon.Name,
			}
			for _, rate := range weapon.ModeList {
				line = append(line, []string{util.FToPar(rate.WinRate), util.FToPar(rate.PickRate), util.FToS(rate.PlayerKill), util.FToS(rate.AverageRank)}...)
			}
			data = append(data, line)
		}
	}
	buf := []byte("")
	b := bytes.NewBuffer(buf)
	w := csv.NewWriter(b)

	if err := w.WriteAll(data); err != nil {
		panic(err)
	}
	return b.String()
}

func (r CharacterRanking) Header() []string {
	return []string{
		"Character",
		"Weapon",
		"Solo Win Rate",
		"Solo Pick Rate",
		"Solo Player Kill",
		"Solo Average Rank",
		"Duo Win Rate",
		"Duo Pick Rate",
		"Duo Player Kill",
		"Duo Average Rank",
		"Squad Win Rate",
		"Squad Pick Rate",
		"Squad Player Kill",
		"Squad Average Rank",
	}
}

func extractUserRankBaseWinRate(label string, data [][]string) []Rate {
	i, j, err := util.FindLabelPosition(label, data)
	if err != nil {
		panic(err)
	}
	baseWin := userRankLine(data, i+3, j)
	return baseWin
}


func extractUserRank(label string, data [][]string) []Character {
	var Characters []Character
	i0, j0, err := util.FindLabelPosition(label, data)
	if err != nil {
		panic(err)
	}
	var c Character
	for i := i0 + 4; ; i++ {
		if util.IsEmptyLine(j0, 14, data[i]) {
			if c.Name != "" {
				Characters = append(Characters, c)
			}
			break
		}
		if data[i][j0] != "" && c.Name != data[i][j0] {
			if c.Name != "" {
				Characters = append(Characters, c)
			}
			c = Character{
				Name:           data[i][j0],
				RankWeaponList: nil,
			}
		}
		w := RankWeapon{
			Name:     data[i][j0+1],
			ModeList: userRankLine(data, i, j0),
		}
		c.RankWeaponList = append(c.RankWeaponList, w)
	}
	return Characters
}

func userRankLine(data [][]string, i, j int) []Rate {
	return []Rate{
		{
			Mode:        "Solo",
			WinRate:     util.ParseFloat(data[i][j+2]),
			PickRate:    util.ParseFloat(data[i][j+3]),
			PlayerKill:  util.ParseFloat(data[i][j+4]),
			AverageRank: util.ParseFloat(data[i][j+5]),
		}, {
			Mode:        "Duo",
			WinRate:     util.ParseFloat(data[i][j+6]),
			PickRate:    util.ParseFloat(data[i][j+7]),
			PlayerKill:  util.ParseFloat(data[i][j+8]),
			AverageRank: util.ParseFloat(data[i][j+9]),
		}, {
			Mode:        "Squad",
			WinRate:     util.ParseFloat(data[i][j+10]),
			PickRate:    util.ParseFloat(data[i][j+11]),
			PlayerKill:  util.ParseFloat(data[i][j+12]),
			AverageRank: util.ParseFloat(data[i][j+13]),
		},
	}
}
