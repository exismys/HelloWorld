package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"slices"
	"strconv"
)

var gsRecord = map[string]int{
	"qa3":  2,
	"qa4": 5,
	"qa5": 4,
	"qa7": 8,
	"devint": 1,
	"dev2": 2,
	"certification": 8,
	"training0": 2,
	"prelive": 1,
	"uat": 5,
	"nightly": 2,
	"qaautomation": 1,
}

var ansic = map[string]string{
	"red":    "\033[0;31m",
	"green":  "\033[0;32m",
	"yellow": "\033[0;33m",
	"blue":   "\033[0;34m",
	"reset":  "\033[0m",
}

func getUrlMap(env string, element string, gs string) map[string]string {
	urlTemplateMap := map[string][]string{
		"gtc": []string{"https://" + env + "-", ".pragmaticplaylive.net/api/system/reload/gametablescache"},
		"tc": []string{"https://" + env + "-", ".pragmaticplaylive.net/api/system/reload/tableConfig/all"},
		"ss": []string{"https://" + env + "-", ".pragmaticplaylive.net/api/system/reload/systemSettings"},
	}
	urls := map[string]string{}
	if element == "gtc" || element == "tc" || element == "ss" {
		template := urlTemplateMap[element]
		if gs == "all" {
			var gsNum int
			if value, ok := gsRecord[env]; ok {
				gsNum = value
			}
			for i := 1; i <= gsNum; i++ {
				urls["gs" + strconv.Itoa(i)] = template[0] + "gs" + strconv.Itoa(i) + template[1]
			}
			return urls
		}
		urls[gs] = template[0] + gs + template[1]
		return urls
	}
	return urls
}

func callApi(url string) string {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		fmt.Println(err)
		return ""
	}

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Println(err)
		return ""
	}

	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return ""
	}

	return string(body)
}

func reload(env string, element string, gs string, verbose bool) {

	urls := getUrlMap(env, element, gs)
	
	process := map[string]string{
		"gtc": "Reloading Game Tables Cache...",
		"tc": "Reloading Table Config...",
		"ccc": "Reloading Casino Config Cache...",
		"ss": "Reloading System Settings...",
	}

	fmt.Println(process[element])

	for gs, url := range urls {
		result := callApi(url)
		if result == "" {
			fmt.Printf("%s-%s: %s✖%s\n", env, gs, ansic["red"], ansic["reset"])
			if verbose {
				fmt.Printf("Error reloading %s%s%s\n\n", ansic["blue"], url, ansic["reset"])
			}
			continue
		}
		fmt.Printf("%s-%s: %s✓%s\n", env, gs, ansic["green"], ansic["reset"])
		if verbose {
			fmt.Printf("Reloaded: %s%s%s\n%s%s%s\n", ansic["blue"], url, ansic["reset"], ansic["yellow"], result, ansic["reset"])
		}
	}
}

func handleCommand(args []string) (string, string, string, bool) {
	helptext := `Usage: ppref <env> <element> <gs>  [-v]
Possible values for <env>: qa3, qa4, qa5, qa6, qa7, devint, dev2, uat, prelive, certification, training0, nightly, qaautomation
Possible values for <element>: gtc, tc, ss
Possible values for <gs>: all, gs1, gs2, gs3, gs4, gs5, gs6, etc.
Example: ppref qa3 gtc all

Made with  ❤️  by Ritesh (ritesh.patel@arrise.com) at Arrise`

	if len(os.Args) < 4 {
		fmt.Println(helptext)
		return "", "", "", false
	}

	verbose := slices.Contains(os.Args, "-v")
	help := slices.Contains(os.Args, "-h")

	if help {
		fmt.Println(helptext)
		return "", "", "", false
	}

	env := os.Args[1]
	element := os.Args[2]
	gs := os.Args[3]
	
	return env, element, gs, verbose
}

func main() {
	env, element, gs, verbose := handleCommand(os.Args)
	reload(env, element, gs, verbose)
}
