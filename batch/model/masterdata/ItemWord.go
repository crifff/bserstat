package masterdata

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"strings"
)

var WordList []Word

func init() {
	f, err := os.Open("./../data/dict.json")
	if err != nil {
		panic(err)
	}
	b, err := ioutil.ReadAll(f)
	if err != nil {
		panic(err)
	}
	if err := json.Unmarshal(b, &WordList); err != nil {
		panic(err)
	}
}

type Word struct {
	Code               int    `json:"code"`
	Key                string `json:"key"`
	Korean             string `json:"korean"`
	English            string `json:"english"`
	Japanese           string `json:"japanese"`
	ChineseSimple      string `json:"chineseSimple"`
	ChineseTraditional string `json:"chineseTraditional"`
	French             string `json:"french"`
	Spanish            string `json:"spanish"`
	SpanishLatin       string `json:"spanishLatin"`
	Portuguese         string `json:"portuguese"`
	Indonesian         string `json:"indonesian"`
	German             string `json:"german"`
	Russian            string `json:"russian"`
	Thai               string `json:"thai"`
	Vietnamese         string `json:"vietnamese"`
	Italian            string `json:"italian"`
	Polish             string `json:"polish"`
}

func CodeFromEngName(name string) int {
	t := strings.TrimSpace(name)
	for i := range WordList {
		if WordList[i].English == t {
			return WordList[i].Code
		}
	}
	panic("not found " + name)
	return 0
}
