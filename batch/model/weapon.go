package model

import (
	"bytes"
	"encoding/csv"
	"fmt"
	util "github.com/crifff/bserstats/batch/util"
)

type WeaponRanking struct {
	BaseWinRate   []Rate
	CharacterList []WeaponCharacter
}
type WeaponCharacter struct {
	Name           string
	WeaponTypeList []WeaponType
}
type WeaponType struct {
	Name       string
	WeaponList []Weapon
}
type Weapon struct {
	Name     string
	ModeList []Rate
}

const LabelWeaponAllRank = "Weapons Win Rate"
const LabelWeaponHighTierRank = "Weapons Win Rate"

func NewAllWeaponRanking(data [][]string) WeaponRanking {
	rankData := WeaponRanking{
		BaseWinRate:   extractWeaponRankWinRate(LabelWeaponAllRank, 0, data),
		CharacterList: extractWeaponRank(LabelWeaponAllRank, 0, data),
	}
	return rankData
}

const ColumnOffsetWeaponHighTier = 6

func NewHighTierWeaponRanking(data [][]string) WeaponRanking {
	rankData := WeaponRanking{
		BaseWinRate:   extractWeaponRankWinRate(LabelWeaponHighTierRank, ColumnOffsetWeaponHighTier, data),
		CharacterList: extractWeaponRank(LabelWeaponHighTierRank, ColumnOffsetWeaponHighTier, data),
	}
	return rankData
}

const LineOffsetWeaponData = 2
const ColumnOffsetWeaponData = 3

func extractWeaponRankWinRate(label string, offset int, data [][]string) []Rate {
	i, j, err := util.FindLabelPosition(label, data)
	if err != nil {
		panic(err)
	}
	baseWin := weaponRankLine(data, i+LineOffsetWeaponData, j+ColumnOffsetWeaponData+offset)
	return baseWin
}

func weaponRankLine(data [][]string, i, j int) []Rate {
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

func (r WeaponRanking) CSV() string {
	var data [][]string
	data = append(data, r.Header())
	base := []string{
		"Base Win Rate", "", "",
	}
	for _, rate := range r.BaseWinRate {
		base = append(base, []string{util.FToPar(rate.WinRate), ""}...)
	}
	data = append(data, base)
	for _, character := range r.CharacterList {
		for _, weaponType := range character.WeaponTypeList {
			for _, weapon := range weaponType.WeaponList {
				line := []string{
					character.Name,
					weaponType.Name,
					weapon.Name,
				}
				for _, rate := range weapon.ModeList {
					line = append(line, []string{util.FToPar(rate.WinRate), util.FToPar(rate.PickRate)}...)
				}
				data = append(data, line)
			}

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

func (r WeaponRanking) Header() []string {
	return []string{
		"Character",
		"Weapon Type",
		"Weapon",
		"Solo Win Rate",
		"Solo Pick Rate",
		"Duo Win Rate",
		"Duo Pick Rate",
		"Squad Win Rate",
		"Squad Pick Rate",
	}
}

func extractWeaponRank(label string, offset int, data [][]string) []WeaponCharacter {
	var Characters []WeaponCharacter
	i0, j0, err := util.FindLabelPosition(label, data)
	if err != nil {
		panic(err)
	}
	var c WeaponCharacter
	var t WeaponType
	for i := i0 + 3; ; i++ {
		if len(data) <= i {
			if t.Name != "" {
				c.WeaponTypeList = append(c.WeaponTypeList, t)
			}
			if c.Name != "" {
				Characters = append(Characters, c)
			}
			break
		}
		if util.IsEmptyLine(j0, 15, data[i]) {
			if t.Name != "" {
				c.WeaponTypeList = append(c.WeaponTypeList, t)
			}
			if c.Name != "" {
				Characters = append(Characters, c)
			}
			break
		}
		if data[i][j0] != "" && c.Name != data[i][j0] {
			if t.Name != "" {
				c.WeaponTypeList = append(c.WeaponTypeList, t)
			}
			if c.Name != "" {
				Characters = append(Characters, c)
			}
			c = WeaponCharacter{
				Name:           data[i][j0],
				WeaponTypeList: nil,
			}
			t = WeaponType{
				Name: data[i][j0+1],
			}
		}
		if data[i][j0+1] != "" && t.Name != data[i][j0+1] {
			if t.Name != "" {
				c.WeaponTypeList = append(c.WeaponTypeList, t)
			}
			t = WeaponType{
				Name: data[i][j0+1],
			}
		}
		w := Weapon{
			Name:     data[i][j0+2],
			ModeList: weaponRankLine(data, i, j0+3+offset),
		}
		t.WeaponList = append(t.WeaponList, w)
	}
	return Characters
}

func dumpWeaponRanking(d WeaponRanking) {
	for _, character := range d.CharacterList {
		fmt.Printf("%s\n", character.Name)

		for _, weaponType := range character.WeaponTypeList {
			fmt.Printf("\t%s\n", weaponType.Name)

			for _, weapon := range weaponType.WeaponList {
				fmt.Printf("\t\t%s \n", weapon.Name)
				for _, rate := range weapon.ModeList {
					fmt.Printf("\t\t\t%s %.1f%% %.1f%%\n", rate.Mode, rate.WinRate*100, rate.PickRate*100)
				}
			}

		}

	}
}
