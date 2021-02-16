package model

import (
	"strings"
	"time"
)

type RankData struct {
	Updated                  string
	Period                   string
	CharacterRankingAll      CharacterRanking
	CharacterRankingHighTier CharacterRanking
	WeaponRankingAll         WeaponRanking
	WeaponRankingHighTier    WeaponRanking
	ArmorRankingAll          ArmorRanking
	ArmorRankingHighTier     ArmorRanking
}

func (r RankData) Label() string {
	layout := "2006. 1. 2"
	t, _ := time.Parse(layout, r.Updated)
	return t.Format("20060102")
}

func NewRankData(data [][]string) RankData {
	return RankData{
		Updated:                  findValue("updated.", data),
		Period:                   findValue("data period.", data),
		CharacterRankingAll:      NewAllCharacterRanking(data),
		CharacterRankingHighTier: NewTopTierCharacterRanking(data),
		WeaponRankingAll:         NewAllWeaponRanking(data),
		WeaponRankingHighTier:    NewHighTierWeaponRanking(data),
		ArmorRankingAll:          NewAllArmorRanking(data),
		ArmorRankingHighTier:     NewHighTierArmorRanking(data),
	}
}


func findValue(label string, data [][]string) string {
	findedLine := false
	for i := range data {
		for j := range data[i] {
			if data[i][j] == "" {
				continue
			}
			if strings.TrimSpace(data[i][j]) == label {
				if !findedLine {
					findedLine = true
					continue
				}
			}
			if findedLine && data[i][j] != "" {
				return strings.TrimSpace(data[i][j])
			}
		}
		if findedLine {
			return ""
		}
	}
	return ""
}