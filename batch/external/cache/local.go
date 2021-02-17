package cache

import (
	"encoding/csv"
	"log"
	"os"
	"path"
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
	if err := os.MkdirAll(path.Dir(cachePath), 0777); err != nil {
		return err
	}
	file, err := os.Create(cachePath)
	if err != nil {
		return err
	}

	defer file.Close()

	log.Printf("write to %s", cachePath)
	if _, err := file.Write(data); err != nil {
		return err
	}
	return nil
}