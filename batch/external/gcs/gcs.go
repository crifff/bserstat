package gcs

import (
	"bytes"
	"cloud.google.com/go/storage"
	"context"
	"encoding/json"
	"github.com/crifff/bserstats/batch/external/cache"
	"log"
	"path/filepath"
)

const bucketName = "bserstat"

func DownloadIndex() ([]byte, error) {
	ctx := context.Background()
	client, err := storage.NewClient(ctx)
	if err != nil {
		return nil, err
	}
	objectPath := "data/index.json"
	r, err := client.Bucket(bucketName).Object(objectPath).NewReader(ctx)
	if err != nil {
		return nil, err
	}
	defer r.Close()

	var buf bytes.Buffer
	if _, err := buf.ReadFrom(r); err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}

func UploadJSON(objectPath string, data interface{}) error {
	v, err := json.Marshal(data)
	if err != nil {
		panic(err)
	}
	if err := UploadFile(objectPath, v); err != nil {
		return err
	}
	return nil
}

func UploadFile(objectPath string, data []byte) error {

	if err := cache.WriteCache(objectPath, data); err != nil {
		return err
	}
	return nil

	ctx := context.Background()
	client, err := storage.NewClient(ctx)
	if err != nil {
		return err
	}

	log.Printf("Upload to %s", objectPath)
	wc := client.Bucket(bucketName).Object(objectPath).NewWriter(ctx)
	switch filepath.Ext(objectPath) {
	case ".csv":
		wc.ContentType = "text/csv"
	case ".json":
		wc.ContentType = "application/json"
	}

	wc.ACL = append(wc.ACL, storage.ACLRule{
		Entity: storage.AllUsers,
		Role:   storage.RoleReader,
	})
	defer func() {
		err := wc.Close()
		if err != nil {
			panic(err)
		}
	}()
	if _, err := wc.Write(data); err != nil {
		log.Printf("failed to write object body : %v", err)
		return err
	}
	return nil
}

