package util

import (
	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func FindLabelPosition(label string, data [][]string) (int, int, error) {
	for i := range data {
		for j := range data[i] {
			if data[i][j] == "" {
				continue
			}
			if strings.TrimSpace(data[i][j]) == label {
				return i, j, nil
			}
		}
	}
	return 0, 0, errors.New("not found")
}


func IsEmptyLine(start, limit int, line []string) bool {
	for i := start; i < start+limit; i++ {
		if line[i] != "" {
			return false
		}
	}
	return true
}


func Exists(name string) bool {
	_, err := os.Stat(name)
	return !os.IsNotExist(err)
}

func ParseFloat(s string) float64 {
	num, err := strconv.ParseFloat(strings.TrimSpace(strings.Trim(s, "%")), 64)
	if err != nil {
		return 0.0
	}
	if !strings.HasSuffix(s, "%") {
		return num
	}
	return num / 100
}

func FToPar(f float64) string {
	return fmt.Sprintf("%.1f%%", f*100)
}

func FToS(f float64) string {
	return fmt.Sprintf("%.1f", f)
}
