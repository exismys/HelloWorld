package main

import (
  "fmt"
  "net/http"
  "io"
  "encoding/json"
  "strconv"
  "os"
)

type Group struct {
  Id int `json:"id"`
  Name string `json:"name"`
  FullPath string `json:"full_path"`
}

func fetchGroups() {
  groupUrl := baseUrl + "/groups"
  pageOptions := "?page=%d&per_page=100"
  url := groupUrl + fmt.Sprintf(pageOptions, 1)

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

  // for key, value := range resp.Header {
  //   fmt.Printf("%s: %s\n", key, value)
  // }

  totalPages, err := strconv.Atoi(resp.Header.Get("X-Total-Pages"))
  if err != nil {
    panic(err)
  }
  currentPage := 0

  file, err := os.Create("files/groups.txt")
  if err != nil {
    panic(err)
  }
  defer file.Close()

  for {
    currentPage += 1
    url := groupUrl + fmt.Sprintf(pageOptions, currentPage)
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

    dataBytes, err := io.ReadAll(resp.Body)
    if err != nil {
      panic(err)
    }

    // fmt.Println(string(dataBytes))

    var groups []Group
    err = json.Unmarshal(dataBytes, &groups)
    if err != nil {
      panic(err)
    }

    fmt.Fprintln(file, "ID,Name,FullPath")

    for _, group := range groups {
      fmt.Printf("ID: %d, Name: %s, Full Path: %s\n", group.Id, group.Name, group.FullPath)
      n, err := fmt.Fprintf(file, "%d,%s,%s\n", group.Id, group.Name, group.FullPath)
      if err != nil {
        panic(err)
      }
      fmt.Printf("%d bytes written\n", n)
    }

    if currentPage >= totalPages {
      break
    }
  }

}
