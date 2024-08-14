package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
)

type AccessLevel struct {
	ComponentId   int
	ComponentName string
	ComponentType string
	AccessLevel   int
}

type UserAccessLevels struct {
	UserId   int
	Username string
	Accesses []AccessLevel
}

var groupsHaveMembers []GroupHasMembers
var projectsHaveMembers []ProjectHasMembers

var userAccessLevelMap = make(map[int]UserAccessLevels)

func loadData() {
	groupDataBytes, err := os.ReadFile("files/groups-have-members.json")
	if err != nil {
		panic(err)
	}

	err = json.Unmarshal(groupDataBytes, &groupsHaveMembers)
	if err != nil {
		panic(err)
	}

	projectDataBytes, err := os.ReadFile("files/projects-have-members.json")
	if err != nil {
		panic(err)
	}

	err = json.Unmarshal(projectDataBytes, &projectsHaveMembers)
	if err != nil {
		panic(err)
	}
}

func loadForUserWise() {

	for _, project := range projectsHaveMembers {
		for _, member := range project.Members {
			if member.State == "active" {
				userAccessLevels, exists := userAccessLevelMap[member.UserId]
				if !exists {
					userAccessLevels = UserAccessLevels{
						UserId:   member.UserId,
						Username: member.Username,
						Accesses: []AccessLevel{},
					}
				}

				userAccessLevels.Accesses = append(userAccessLevels.Accesses, AccessLevel{
					ComponentId:   project.ProjectId,
					ComponentName: project.ProjectPath,
					ComponentType: "Project",
					AccessLevel:   member.AccessLevel,
				})
				userAccessLevelMap[member.UserId] = userAccessLevels
			}
		}
	}

	for _, group := range groupsHaveMembers {
		for _, member := range group.Members {
			if member.State == "active" {
				userAccessLevels, exists := userAccessLevelMap[member.UserId]
				if !exists {
					userAccessLevels = UserAccessLevels{
						UserId:   member.UserId,
						Username: member.Username,
						Accesses: []AccessLevel{},
					}
				}
				userAccessLevels.Accesses = append(userAccessLevels.Accesses, AccessLevel{
					ComponentId:   group.GroupId,
					ComponentName: group.GroupPath,
					ComponentType: "Group",
					AccessLevel:   member.AccessLevel,
				})
				userAccessLevelMap[member.UserId] = userAccessLevels
			}
		}
	}
}

func formatToCsvUserWise() {
	loadData()
	loadForUserWise()

	file, err := os.Create("files/user-access-levels.csv")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	fmt.Fprintf(file, "User,Projects (Access Level) / Groups (Access Level)\n")
	for _, userAccessLevels := range userAccessLevelMap {
		line := fmt.Sprintf("%s,", userAccessLevels.Username)
		for _, accessLevel := range userAccessLevels.Accesses {
			line += fmt.Sprintf("%s (%s) (%s),", accessLevel.ComponentName, accessLevel.ComponentType, accessLevelMap[accessLevel.AccessLevel])
		}
		line += "\n"
		fmt.Fprintf(file, line)
	}
}

func formatToCsvProjectWise() {
	loadData()

	file, err := os.Create("files/user-access-levels-project-wise.csv")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	fmt.Fprintf(file, "Projects,Users (Access Level)\n")

	for _, project := range projectsHaveMembers {
		line := fmt.Sprintf("%s,", project.ProjectPath)
		for _, member := range project.Members {
			line += fmt.Sprintf("%s (%s),", member.Username, accessLevelMap[member.AccessLevel])
		}
		line += "\n"
		fmt.Fprintf(file, line)
	}
}

func formatToCsvProjectWiseInherited(groups []string, projectName string) {
	loadData()
	str := strings.Split(projectName, "/")
	p := str[len(str)-1]

	file, err := os.Create(fmt.Sprintf("files/%s.csv", p))
	if err != nil {
		panic(err)
	}
	defer file.Close()

	projectAccessLevel := make(map[string]string)

	for _, projectGroup := range groups {
		for _, group := range groupsHaveMembers {
			if group.GroupPath == projectGroup {
				for _, member := range group.Members {
					if member.State == "active" {
						projectAccessLevel[member.Username] = accessLevelMap[member.AccessLevel]
					}
				}
			}
		}
	}

	for _, project := range projectsHaveMembers {
		if project.ProjectPath == projectName {
			for _, member := range project.Members {
				if member.State == "active" {
					projectAccessLevel[member.Username] = accessLevelMap[member.AccessLevel]
				}
			}
		}
	}

	for user, accessLevel := range projectAccessLevel {
		fmt.Fprintf(file, "%s,%s\n", user, accessLevel)
	}
}

func formatToCsvGroupWise() {
	loadData()

	file, err := os.Create("files/user-access-levels-group-wise.csv")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	fmt.Fprintf(file, "Groups/Subgroups,Users (Access Level)\n")

	for _, group := range groupsHaveMembers {
		line := fmt.Sprintf("%s,", group.GroupPath)
		for _, member := range group.Members {
			line += fmt.Sprintf("%s (%s),", member.Username, accessLevelMap[member.AccessLevel])
		}
		line += "\n"
		fmt.Fprintf(file, line)
	}
}
