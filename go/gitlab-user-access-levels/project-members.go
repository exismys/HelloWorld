package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
	"strings"
)

var projectPath string

type ProjectMemberAccessLevel struct {
	UserId      int    `json:"id"`
	Username    string `json:"username"`
	Name        string `json:"name"`
	State       string `json:"state"`
	AccessLevel int    `json:"access_level"`
}

type ProjectHasMembers struct {
	ProjectId   int    `json:"id"`
	ProjectPath string `json:"name"`
	Members     []ProjectMemberAccessLevel
}

func fetchProjectMembers() {
	var projectsMembers []ProjectHasMembers

	file, err := os.Open("files/projects.txt")
	if err != nil {
		panic(err)
	}

	scanner := bufio.NewScanner(file)
	scanner.Scan()

	for scanner.Scan() {
		parts := strings.Split(scanner.Text(), ",")
		id, err := strconv.Atoi(parts[0])
		if err != nil {
			panic(err)
		}
		projectPath = parts[2]
		projectMembers, err := fetchMembersByProjectId(id)
		if err != nil {
			continue
		}
		projectsMembers = append(projectsMembers, projectMembers)
	}

	dataJsonBytes, err := json.Marshal(&projectsMembers)
	if err != nil {
		panic(err)
	}

	err = os.WriteFile("files/projects-have-members.json", dataJsonBytes, 0644)
	if err != nil {
		panic(err)
	}
}

func fetchMembersByProjectId(projectId int) (ProjectHasMembers, error) {
	projectMembersUrl := baseUrl + fmt.Sprintf("/projects/%d/members", projectId)
	pageOptions := "?page=%d&per_page=100"
	url := projectMembersUrl + fmt.Sprintf(pageOptions, 1)
	fmt.Println(url)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		panic(err)
	}
	req.Header.Set("Authorization", "Bearer "+token)

	client := &http.Client{}

	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return ProjectHasMembers{}, fmt.Errorf("Status Code not Ok")
	}

	totalPages, err := strconv.Atoi(resp.Header.Get("X-Total-Pages"))
	if err != nil {
		panic(err)
	}
	currentPage := 0

	projectHasMembers := ProjectHasMembers{
		ProjectId:   projectId,
		ProjectPath: projectPath,
	}

	for {
		currentPage += 1
		url = projectMembersUrl + fmt.Sprintf(pageOptions, currentPage)

		req, err := http.NewRequest("GET", url, nil)
		if err != nil {
			panic(err)
		}
		req.Header.Set("Authorization", "Bearer "+token)

		resp, err := client.Do(req)
		if err != nil {
			panic(err)
		}
		defer resp.Body.Close()

		dataBytes, err := io.ReadAll(resp.Body)
		if err != nil {
			panic(err)
		}

		var memberAccessLevels []ProjectMemberAccessLevel
		err = json.Unmarshal(dataBytes, &memberAccessLevels)
		if err != nil {
			panic(err)
		}

		projectHasMembers.Members = append(projectHasMembers.Members, memberAccessLevels...)

		for _, member := range memberAccessLevels {
			fmt.Printf("User ID: %d, Username: %s, Access Level: %d, State: %s\n", member.UserId, member.Username, member.AccessLevel, member.State)
		}

		if currentPage >= totalPages {
			break
		}
	}

	return projectHasMembers, nil
}
