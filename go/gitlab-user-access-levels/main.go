package main

import (
	"os"
)

var baseUrl string = "https://gitlab.com/api/v4"
var token string = os.Getenv("GITLAB_READ_ACCESS_TOKEN")

var accessLevelMap = map[int]string{
	10: "Guest",
	20: "Reporter",
	30: "Developer",
	40: "Maintainer",
	50: "Owner",
}

func main() {
	fetchGroups()
	fetchGroupMembers()
	fetchProjects()
	fetchProjectMembers()
	formatToCsvUserWise()
	formatToCsvProjectWise()
	formatToCsvGroupWise()
}
