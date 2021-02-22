package model

import (
	"bytes"
	"encoding/csv"
	"fmt"
	"github.com/crifff/bserstats/batch/util"
)

type ArmorRanking struct {
	BaseWinRate []Rate
	TypeList    []ArmorType
}

type ArmorType struct {
	Name      string
	ArmorList []Armor
}

type Armor struct {
	Name     string
	//Code     int
	ModeList []Rate
}

const LabelArmorAllRank = "Armor Win Rate"
const LabelArmorHighTierRank = "Armor Win Rate"

func NewAllArmorRanking(data [][]string) ArmorRanking {
	rankData := ArmorRanking{
		BaseWinRate: extractArmorRankWinRate(LabelArmorAllRank, 0, data),
		TypeList:    extractArmorRank(LabelArmorAllRank, 0, data),
	}
	return rankData
}

const ColumnOffsetArmorHighTier = 6

func NewHighTierArmorRanking(data [][]string) ArmorRanking {
	rankData := ArmorRanking{
		BaseWinRate: extractArmorRankWinRate(LabelArmorHighTierRank, ColumnOffsetArmorHighTier, data),
		TypeList:    extractArmorRank(LabelArmorHighTierRank, ColumnOffsetArmorHighTier, data),
	}
	return rankData
}

const LineOffsetArmorData = 2
const ColumnOffsetArmorData = 2

func extractArmorRankWinRate(label string, offset int, data [][]string) []Rate {
	i, j, err := util.FindLabelPosition(label, data)
	if err != nil {
		panic(err)
	}
	baseWin := armorRankLine(data, i+LineOffsetArmorData, j+ColumnOffsetArmorData+offset)
	return baseWin
}

func armorRankLine(data [][]string, i, j int) []Rate {
	return []Rate{
		{
			Mode:     "Solo",
			WinRate:  util.ParseFloat(data[i][j]),
			PickRate: util.ParseFloat(data[i][j+1]),
		}, {
			Mode:     "Duo",
			WinRate:  util.ParseFloat(data[i][j+2]),
			PickRate: util.ParseFloat(data[i][j+3]),
		}, {
			Mode:     "Squad",
			WinRate:  util.ParseFloat(data[i][j+4]),
			PickRate: util.ParseFloat(data[i][j+5]),
		},
	}
}

func (a ArmorRanking) String() string {
	var dst string
	for _, armorType := range a.TypeList {
		dst += fmt.Sprint(armorType.Name, "\n")
		for _, a := range armorType.ArmorList {
			dst += fmt.Sprint("\t", a.Name, "\n")
			for _, rate := range a.ModeList {
				dst += fmt.Sprintf("\t\t\t%s %.1f%% %.1f%%\n", rate.Mode, rate.WinRate*100, rate.PickRate*100)
			}
		}
	}
	return dst
}

func (a ArmorRanking) CSV() string {
	var data [][]string
	data = append(data, a.Header())
	base := []string{
		"Base Win Rate", "",
	}
	for _, rate := range a.BaseWinRate {
		base = append(base, []string{util.FToPar(rate.WinRate), ""}...)
	}
	data = append(data, base)
	for _, armorType := range a.TypeList {
		for _, armor := range armorType.ArmorList {
			line := []string{
				armorType.Name,
				armor.Name,
			}
			for _, rate := range armor.ModeList {
				line = append(line, []string{util.FToPar(rate.WinRate), util.FToPar(rate.PickRate)}...)
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

func (a ArmorRanking) Header() []string {
	return []string{
		"Type",
		"Armor",
		"Solo Win Rate",
		"Solo Pick Rate",
		"Duo Win Rate",
		"Duo Pick Rate",
		"Squad Win Rate",
		"Squad Pick Rate",
	}
}

func extractArmorRank(label string, offset int, data [][]string) []ArmorType {
	var Types []ArmorType
	i0, j0, err := util.FindLabelPosition(label, data)
	if err != nil {
		panic(err)
	}
	var c ArmorType
	for i := i0 + 3; ; i++ {
		if len(data) <= i {
			if c.Name != "" {
				Types = append(Types, c)
			}
			break
		}
		if util.IsEmptyLine(j0, 14, data[i]) {
			if c.Name != "" {
				Types = append(Types, c)
			}
			break
		}
		if data[i][j0] != "" && c.Name != data[i][j0] {
			if c.Name != "" {
				Types = append(Types, c)
			}
			c = ArmorType{
				Name:      data[i][j0],
				ArmorList: nil,
			}
		}

		w := Armor{
			Name: sanitize(data[i][j0+1]),
			//Code:     masterdata.CodeFromEngName(sanitize(data[i][j0+1])),
			ModeList: armorRankLine(data, i, j0+2+offset),
		}
		c.ArmorList = append(c.ArmorList, w)
	}
	return Types
}
