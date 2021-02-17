package main

import (
	"encoding/json"
	"fmt"
	"github.com/crifff/bserstats/batch/external/gcs"
	"github.com/crifff/bserstats/batch/external/officialsite"
	"github.com/crifff/bserstats/batch/model"
	"sort"
	"time"
)

type Index struct {
	Label   string `json:"label"`
	Updated string `json:"updated"`
	Period  string `json:"period"`
}

func HasLabel(label string, indexes []Index) bool {
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

	//csv, err = cache.ReadCSV("20210208")

	result := model.NewRankData(csv)

	uploadAll(result)

	//fmt.Printf("%#v", result.WeaponRankingAll.CharacterList[1])

	b, err := gcs.DownloadIndex()
	if err != nil {
		panic(err)
	}

	var indexes []Index

	if err := json.Unmarshal(b, &indexes); err != nil {
		panic(err)
	}

	//fmt.Printf("%#v\n", result.Label())

	if !HasLabel(result.Label(), indexes) {
		indexes = append(indexes, Index{
			Label:   result.Label(),
			Updated: result.Updated,
			Period:  result.Period,
		})
		sort.Slice(indexes, func(i, j int) bool {
			return indexes[i].Label > indexes[j].Label
		})
		//fmt.Printf("%#v\n", indexes)

		v, err := json.Marshal(indexes)
		if err != nil {
			panic(err)
		}
		if err := gcs.UploadFile("data/index.json", v); err != nil {
			panic(err)
		}
	}



}

func uploadAll(result model.RankData) {
	layout := "2006. 1. 2"

	t, _ := time.Parse(layout, result.Updated)

	dir := fmt.Sprintf("data/%s/", t.Format("20060102"))
	gcs.UploadJSON(dir+"all.json", result)
	gcs.UploadJSON(dir+"character_all.json", result.CharacterRankingAll)
	gcs.UploadJSON(dir+"character_high.json", result.CharacterRankingHighTier)
	gcs.UploadJSON(dir+"weapon_all.json", result.WeaponRankingAll)
	gcs.UploadJSON(dir+"weapon_high.json", result.WeaponRankingHighTier)
	gcs.UploadJSON(dir+"armor_all.json", result.ArmorRankingAll)
	gcs.UploadJSON(dir+"armor_high.json", result.ArmorRankingHighTier)

	gcs.UploadFile(dir+"character_all.csv", []byte(result.CharacterRankingAll.CSV()))
	gcs.UploadFile(dir+"character_high.csv", []byte(result.CharacterRankingHighTier.CSV()))
	gcs.UploadFile(dir+"weapon_all.csv", []byte(result.WeaponRankingAll.CSV()))
	gcs.UploadFile(dir+"weapon_high.csv", []byte( result.WeaponRankingHighTier.CSV()))
	gcs.UploadFile(dir+"armor_all.csv", []byte(result.ArmorRankingAll.CSV()))
	gcs.UploadFile(dir+"armor_high.csv", []byte(result.ArmorRankingHighTier.CSV()))
}
