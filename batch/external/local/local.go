package local

import (
	"bytes"
	"encoding/csv"
	"encoding/json"
	"github.com/crifff/bserstats/batch/model"
	"io/ioutil"
	"log"
	"os"
	"path"
	"strings"
)

func ReadCSV(date string) ([][]string, error) {
	f, err := os.Open(".cache/" + date + ".csv")
	if err != nil {
		panic(err)
	}
	r := csv.NewReader(f)
	return r.ReadAll()
}

func WriteCache(objectPath string, data []byte) error {
	cachePath := ".cache/" + objectPath
	return WriteFile(cachePath, data)
}

func WriteFile(filePath string, data []byte) error {
	if err := os.MkdirAll(path.Dir(filePath), 0777); err != nil {
		return err
	}
	file, err := os.Create(filePath)
	if err != nil {
		return err
	}

	defer file.Close()

	log.Printf("write to %s", filePath)
	if _, err := file.Write(data); err != nil {
		return err
	}
	return nil
}

func GetIndexJson() ([]model.Index, error) {
	objectPath := "../client/public/data/index.json"
	f, err := os.Open(objectPath)
	if err != nil {
		return nil, err
	}
	b, err := ioutil.ReadAll(f)
	if err != nil {
		panic(err)
	}

	var indexes []model.Index

	if err := json.Unmarshal(b, &indexes); err != nil {
		return nil, err
	}
	return indexes, nil
}
func SaveJSON(objectPath string, data interface{}) error {
	v, err := json.Marshal(data)
	if err != nil {
		panic(err)
	}

	if strings.HasSuffix(objectPath, "index.json") {
		var buf bytes.Buffer
		if err := json.Indent(&buf, v, "", "	"); err != nil {
			panic(err)
		}
		if err := SaveFile(objectPath, buf.Bytes()); err != nil {
			return err
		}
	} else {
		if err := SaveFile(objectPath, v); err != nil {
			return err
		}
	}

	return nil
}

func SaveFile(objectPath string, data []byte) error {

	if err := WriteFile(objectPath, data); err != nil {
		return err
	}

	return nil
}
