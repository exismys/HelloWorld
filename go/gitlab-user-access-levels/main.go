package main

import (
	"fmt"
	"os"
)

const baseUrl string = "https://gitlab.com/api/v4"

var token string = os.Getenv("GITLAB_READ_ACCESS_TOKEN")

var accessLevelMap = map[int]string{
	10: "Guest",
	20: "Reporter",
	30: "Developer",
	40: "Maintainer",
	50: "Owner",
}

func prepare() {
	if token == "" {
		panic("GITLAB_READ_ACCESS_TOKEN is missing. Please set it in your environment variables.")
	}

	// Create output directory
	dirName := "files"
	err := os.Mkdir(dirName, 0755)
	if err != nil {
		if os.IsExist(err) {
			fmt.Printf("Directory %s already exists\n", dirName)
		} else {
			fmt.Printf("Error creating directory: %v\n", err)
			return
		}
	} else {
		fmt.Printf("Successfully created directory: %s\n", dirName)
	}
}

func main() {
	prepare()
	// fetchGroups()
	// fetchGroupMembers()
	// fetchProjects()
	// fetchProjectMembers()
	// formatToCsvUserWise()
	// formatToCsvProjectWise()
	// formatToCsvGroupWise()
}
