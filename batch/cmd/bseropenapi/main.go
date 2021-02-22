package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"
)


type APIResponse struct {
	Code    int             `json:"code"`
	Message string          `json:"message"`
	Data    json.RawMessage `json:"data"`
}

func main() {
	for _, name := range downloadMasterList() {
		downloadMaster(name)
	}
}

func downloadMasterList() []string {
	key := os.Getenv("BSER_API_KEY")
	url := "https://open-api.bser.io/v1/data/hash"
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("x-api-key", key)

	client := new(http.Client)
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	//pp.Println(string(b))
	var response APIResponse
	if err := json.Unmarshal(b, &response); err != nil {
		panic(err)
	}

	var list map[string]int
	if err := json.Unmarshal(response.Data, &list); err != nil {
		panic(err)
	}

	var result []string
	for s := range list {
		result = append(result, s)
	}
	return result
}

func downloadMaster(name string) {
	log.Println("download master: " + name)
	key := os.Getenv("BSER-API-KEY")
	if key == "" {
		key = "rmfTKqtIyB2JSx0mC3Tig6qGTXk1QPU33XjHf3TT"
	}
	url := "https://open-api.bser.io/v1/data/" + name
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("x-api-key", key)

	client := new(http.Client)
	time.Sleep(1 * time.Second)
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	//pp.Println(string(b))
	var response APIResponse
	if err := json.Unmarshal(b, &response); err != nil {
		panic(err)
	}
	if response.Code != 200 {
		panic(response.Message)
	}

	f, err := os.Create("./../data/" + name + ".json")
	if err != nil {
		panic(err)
	}
	defer f.Close()

	enc := json.NewEncoder(f)
	enc.SetIndent("", "    ")
	if err := enc.Encode(response.Data); err != nil {
		panic(err)
	}
}
