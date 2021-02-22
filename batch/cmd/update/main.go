package main

import (
	"fmt"
	"github.com/crifff/bserstats/batch/external/local"
	"github.com/crifff/bserstats/batch/external/officialsite"
	"github.com/crifff/bserstats/batch/model"
	"sort"
	"time"
)

func HasLabel(label string, indexes []model.Index) bool {
	for _, index := range indexes {
		if index.Label == label {
			return true
		}
	}
	return false
}

func main() {
	csv, err := officialsite.FetchCSV()
	if err != nil {
		panic(err)
	}

	//csv, err = local.ReadCSV("20210215")

	result := model.NewRankData(csv)

	saveAll(result)

	indexes, err := local.GetIndexJson()
	if err != nil {
		panic(err)
	}

	if !HasLabel(result.Label(), indexes) {
		indexes = append(indexes, model.Index{
			Label:   result.Label(),
			Updated: result.Updated,
			Period:  result.Period,
		})
		sort.Slice(indexes, func(i, j int) bool {
			return indexes[i].Label > indexes[j].Label
		}) //fmt.Printf("%#v\n", indexes)

		if err := local.SaveJSON("../client/public/data/index.json", indexes); err != nil {
			panic(err)
		}
	}



}

func saveAll(result model.RankData) {
	layout := "2006. 1. 2"

	t, _ := time.Parse(layout, result.Updated)

	dir := fmt.Sprintf("../client/public/data/%s/", t.Format("20060102"))
	local.SaveJSON(dir+"all.json", result)
	local.SaveJSON(dir+"character_all.json", result.CharacterRankingAll)
	local.SaveJSON(dir+"character_high.json", result.CharacterRankingHighTier)
	local.SaveJSON(dir+"weapon_all.json", result.WeaponRankingAll)
	local.SaveJSON(dir+"weapon_high.json", result.WeaponRankingHighTier)
	local.SaveJSON(dir+"armor_all.json", result.ArmorRankingAll)
	local.SaveJSON(dir+"armor_high.json", result.ArmorRankingHighTier)

	local.SaveFile(dir+"character_all.csv", []byte(result.CharacterRankingAll.CSV()))
	local.SaveFile(dir+"character_high.csv", []byte(result.CharacterRankingHighTier.CSV()))
	local.SaveFile(dir+"weapon_all.csv", []byte(result.WeaponRankingAll.CSV()))
	local.SaveFile(dir+"weapon_high.csv", []byte( result.WeaponRankingHighTier.CSV()))
	local.SaveFile(dir+"armor_all.csv", []byte(result.ArmorRankingAll.CSV()))
	local.SaveFile(dir+"armor_high.csv", []byte(result.ArmorRankingHighTier.CSV()))
}
