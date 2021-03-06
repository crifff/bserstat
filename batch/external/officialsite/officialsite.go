package officialsite

import (
	"encoding/csv"
	"fmt"
	"github.com/PuerkitoBio/goquery"
	"github.com/crifff/bserstats/batch/util"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"regexp"
	"strings"
	"time"
)

func getSpreadSheetURL(url string) (string, error) {
	res, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer res.Body.Close()

	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		return "", err
	}
	var response string
	doc.Find("iframe").Each(func(_ int, s *goquery.Selection) {
		url, _ := s.Attr("src")
		response = url
	})
	return response, nil
}

const officialSiteURL = "https://playeternalreturn.com/en/stats/"

func FetchCSV() ([][]string, error) {
	spreadsheetURL, err := getSpreadSheetURL(officialSiteURL)
	if err != nil {
		return nil, err
	}
	csvURL := strings.ReplaceAll(spreadsheetURL, "pubhtml?", "pub?output=csv&")

	hashName := time.Now().Format("2006-01-02")
	filename := fmt.Sprintf(".cache/%x.csv", hashName)
	if util.Exists(filename) {
		f, err := os.Open(filename)
		if err != nil {
			return nil, err
		}
		log.Println("read from cache: ", filename)
		return csv.NewReader(f).ReadAll()
	}

	res, err := http.Get(csvURL)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()
	r := csv.NewReader(res.Body)
	data, err := r.ReadAll()
	if err != nil {
		return nil, err
	}

	file, err := os.OpenFile(filename, os.O_WRONLY|os.O_CREATE, 0600)
	if err != nil {
		return nil, err
	}

	writer := csv.NewWriter(file)
	err = writer.WriteAll(data)

	return data, err
}

func DownloadXlsx() (io.ReadCloser, error) {
	spreadsheetURL, err := getSpreadSheetURL(officialSiteURL)
	if err != nil {
		return nil, err
	}
	reg := regexp.MustCompile("pubhtml.*$")
	url := reg.ReplaceAllString(spreadsheetURL, "") + "pub?output=xlsx"

	log.Println("download from ", url)
	hashName := time.Now().Format("2006-01-02")
	filename := fmt.Sprintf(".cache/%x.xlsx", hashName)
	if util.Exists(filename) {
		f, err := os.Open(filename)
		if err != nil {
			return nil, err
		}
		log.Println("read from cache: ", filename)
		return f, nil
	}

	res, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	data, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	file, err := os.OpenFile(filename, os.O_WRONLY|os.O_CREATE, 0600)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	if _, err := file.Write(data); err != nil {
		return nil, err
	}

	return res.Body, nil
}
