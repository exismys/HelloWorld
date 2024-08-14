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

type Project struct {
	Id                int    `json:"id"`
	Name              string `json:"name"`
	PathWithNamespace string `json:"path_with_namespace"`
}

func fetchProjects() {
	var projects []Project
	groupFile, err := os.Open("files/groups.txt")
	if err != nil {
		panic(err)
	}

	scanner := bufio.NewScanner(groupFile)
	scanner.Scan()

	for scanner.Scan() {
		line := scanner.Text()
		parts := strings.Split(line, ",")
		fmt.Println(parts)
		if len(parts) > 0 {
			id, err := strconv.Atoi(parts[0])
			if err != nil {
				panic(err)
			}
			projectList, err := fetchProjectsByGroupId(id)
			if err != nil {
				continue
			}
			projects = append(projects, projectList...)
		}
	}

	projectFile, err := os.Create("files/projects.txt")
	if err != nil {
		panic(err)
	}

	fmt.Fprintf(projectFile, "ID,Name,PathWithNamespace\n")

	projectSeen := make(map[int]struct{})

	for _, project := range projects {
		if _, exists := projectSeen[project.Id]; exists {
			continue
		}
		fmt.Fprintf(projectFile, "%d,%s,%s\n", project.Id, project.Name, project.PathWithNamespace)
		projectSeen[project.Id] = struct{}{}
	}

}

func fetchProjectsByGroupId(groupId int) ([]Project, error) {
	projectsUrl := baseUrl + fmt.Sprintf("/groups/%d/projects", groupId)
	pageOptions := "?page=%d&per_page=100"
	url := projectsUrl + fmt.Sprintf(pageOptions, 1)
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
		return []Project{}, fmt.Errorf("Status Code not Ok")
	}

	totalPages, err := strconv.Atoi(resp.Header.Get("X-Total-Pages"))
	if err != nil {
		panic(err)
	}
	currentPage := 0

	var projects []Project

	for {
		currentPage += 1
		url = projectsUrl + fmt.Sprintf(pageOptions, currentPage)

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

		var p []Project
		err = json.Unmarshal(dataBytes, &p)
		if err != nil {
			panic(err)
		}

		projects = append(projects, p...)

		for _, project := range p {
			fmt.Printf("Project ID: %d, Project Name: %s, Path with namespace: %s\n", project.Id, project.Name, project.PathWithNamespace)
		}

		if currentPage >= totalPages {
			break
		}
	}

	return projects, nil

}
