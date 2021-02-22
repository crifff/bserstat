package main

import (
	"encoding/json"
	"github.com/360EntSecGroup-Skylar/excelize/v2"
	"github.com/crifff/bserstats/batch/external/officialsite"
	"github.com/crifff/bserstats/batch/model/masterdata"
	"os"
	"strconv"
	"strings"
)

func main() {
	generateDict()
}

func generateDict() {
	f, err := officialsite.DownloadXlsx()
	if err != nil {
		panic(err)
	}

	xlsx, err := excelize.OpenReader(f)
	if err != nil {
		panic(err)
	}

	lastSheetName := xlsx.GetSheetList()[len(xlsx.GetSheetList())-1]
	//s := xlsx.GetSheetIndex(lastSheetName)
	rows, err := xlsx.GetRows(lastSheetName)
	var words []masterdata.Word
	for i, row := range rows {
		if i == 0 { //最初の行は飛ばす
			continue
		}
		if row[0] == "" {
			continue
		}
		a := strings.Split(cellString(row, 0), "/")
		code, err := strconv.Atoi(a[len(a)-1])
		if err != nil {
			panic(err)
		}
		w := masterdata.Word{
			Code:               code,
			Key:                cellString(row, 0),
			Korean:             cellString(row, 1),
			English:            rename(cellString(row, 2)),
			Japanese:           cellString(row, 3),
			ChineseSimple:      cellString(row, 4),
			ChineseTraditional: cellString(row, 5),
			French:             cellString(row, 6),
			Spanish:            cellString(row, 7),
			SpanishLatin:       cellString(row, 8),
			Portuguese:         cellString(row, 9),
			Indonesian:         cellString(row, 10),
			German:             cellString(row, 11),
			Russian:            cellString(row, 12),
			Thai:               cellString(row, 13),
			Vietnamese:         cellString(row, 14),
			Italian:            cellString(row, 15),
			Polish:             cellString(row, 16),
		}
		//for _, colCell := range row {
		//	fmt.Print(colCell, "\t")
		//}

		words = append(words, w)
	}

	f2, err := os.Create("./../data/dict.json")
	if err != nil {
		panic(err)
	}
	defer f.Close()

	enc := json.NewEncoder(f2)
	enc.SetIndent("", "    ")
	if err := enc.Encode(words); err != nil {
		panic(err)
	}
}

func rename(s string) string {
	if a, ok := l[s]; ok {
		return a
	}
	return s
}

var l = map[string]string{
	"Whip of Nine Bloody Tails": "Bloody Nine Tails",
	"Sword of Shah Jahan":       "Sheath of Shah Jahan",
}

func cellString(row []string, num int) string {
	return strings.TrimSpace(row[num])
}
