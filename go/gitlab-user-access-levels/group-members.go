package main

import (
  "fmt"
  "net/http"
  "strconv"
  "io"
  "encoding/json"
  "os"
  "bufio"
  "strings"
)

var groupPath string

type GroupMemberAccessLevel struct {
  UserId int `json:"id"`
  Username string `json:"username"`
  Name string `json:"name"`
  State string `json:"state"`
  AccessLevel int `json:"access_level"`
}

type GroupHasMembers struct {
  GroupId int `json:"id"`
  GroupPath string `json:"path"`
  Members []GroupMemberAccessLevel
}


func fetchGroupMembers() {
  var groupsMembers []GroupHasMembers

  file, err := os.Open("files/groups.txt")
  if err != nil {
    panic(err)
  }

  scanner := bufio.NewScanner(file)
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
      groupPath = parts[2]
      gm, err := fetchMembersByGroup(id)
      if err != nil {
        continue
      }
      groupsMembers = append(groupsMembers, gm)
    }
  }

  dataJsonBytes, err := json.Marshal(&groupsMembers)
  if err != nil {
    panic(err) }

  err = os.WriteFile("files/groups-have-members.json", dataJsonBytes, 0644)
  if err != nil {
    panic(err)
  }
}

func fetchMembersByGroup(groupId int) (GroupHasMembers, error)  {
  groupMembersUrl := baseUrl + fmt.Sprintf("/groups/%d/members", groupId)
  pageOptions := "?page=%d&per_page=100"
  url := groupMembersUrl + fmt.Sprintf(pageOptions, 1)
  fmt.Println(url)

  req, err := http.NewRequest("GET", url, nil)
  if err != nil {
    panic(err)
  }
  req.Header.Set("Authorization", "Bearer " + token)

  client := &http.Client{}

  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()

  if resp.StatusCode != http.StatusOK {
    return GroupHasMembers{} , fmt.Errorf("Status Code not Ok")
  }

  totalPages, err := strconv.Atoi(resp.Header.Get("X-Total-Pages"))
  if err != nil {
    panic(err)
  }
  currentPage := 0

  groupHasMembers := GroupHasMembers{
    GroupId: groupId,
    GroupPath: groupPath,
  }

  for {
    currentPage += 1
    url = groupMembersUrl + fmt.Sprintf(pageOptions, currentPage)
    
    req, err := http.NewRequest("GET", url, nil)
    if err != nil {
      panic(err)
    }
    req.Header.Set("Authorization", "Bearer " + token)

    resp, err := client.Do(req)
    if err != nil {
      panic(err)
    }
    defer resp.Body.Close()

    dataBytes, err := io.ReadAll(resp.Body)
    if err != nil {
      panic(err)
    }

    var memberAccessLevels []GroupMemberAccessLevel
    err = json.Unmarshal(dataBytes, &memberAccessLevels)
    if err != nil {
      panic(err)
    }

    groupHasMembers.Members = append(groupHasMembers.Members, memberAccessLevels...)

    for _, member := range memberAccessLevels {
      fmt.Printf("User ID: %d, Username: %s, Access Level: %d, State: %s\n", member.UserId, member.Username, member.AccessLevel, member.State)
    }

    if currentPage >= totalPages {
      break
    }
  }

  return groupHasMembers, nil
}
