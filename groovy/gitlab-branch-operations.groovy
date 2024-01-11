import groovy.json.JsonSlurper
import java.net.HttpURLConnection
import java.net.URL

def getAllBranches(projectId, referenceType, gitlabToken) {
    def referenceList = []
    def apiUrl = "https://gitlab.gametechlabs.net/api/v4/projects/${projectId}/repository/${referenceType}?per_page=100"
    URL url = new URL(apiUrl)
    HttpURLConnection conn = url.openConnection()
    conn.setRequestMethod("GET")
    conn.setRequestProperty("PRIVATE-TOKEN", gitlabToken)
    def pages = conn.getHeaderField("X-Total-Pages").toInteger()
    for (int page = 1; page <= pages; page++) {
        apiUrl = "https://gitlab.gametechlabs.net/api/v4/projects/${projectId}/repository/${referenceType}?per_page=100&page=${page}"
        url = new URL(apiUrl)
        conn = url.openConnection()
        conn.setRequestMethod("GET")
        conn.setRequestProperty("PRIVATE-TOKEN", gitlabToken)
        if (conn.responseCode != 200) return ["Error"]
        String response = conn.inputStream.text
        List responseJson = new JsonSlurper().parseText(response)
        for (reference in responseJson) {
            referenceList.add(reference)
        }
    }
    return referenceList
}

def getOldestBranches(projectId, referenceType, gitlabToken, numberOldest) {
    def referenceList = getAllBranches(projectId, referenceType, gitlabToken)
    def sortedList = referenceList.sort { a, b -> 
        def dateTemp1 = a.commit.committed_date.split("T")[0].split("-")
        def dateTemp2 = b.commit.committed_date.split("T")[0].split("-")
        def date1 = new Date(dateTemp1[0].toInteger(), dateTemp1[1].toInteger(), dateTemp1[2].toInteger())
        def date2 = new Date(dateTemp2[0].toInteger(), dateTemp2[1].toInteger(), dateTemp2[2].toInteger())
        return date1 <=> date2
    }
    sortedList = sortedList[0..numberOldest].collect { it.name }
    return sortedList
}

def getBranchesWithRegex(projectId, referenceType, gitlabToken, regex) {
    def referenceList = getAllBranches(projectId, referenceType, gitlabToken)
    filteredList = referenceList.findAll { it.name ==~ regex }.collect { it.name }
    return filteredList
}

def deleteBranches(projectId, branches, privateToken) {
    for (branch in branches) {
        def apiUrl = "https://gitlab.gametechlabs.net/api/v4/projects/${projectId}/repository/branches/${branch}"
        URL url = new URL(apiUrl)
        HttpURLConnection conn = url.openConnection()
        conn.setRequestMethod("DELETE")
        conn.setRequestProperty("PRIVATE-TOKEN", privateToken)
        if (conn.responseCode != 204) return ["Error", "${conn.responseCode} ${conn.responseMessage}"]
    }
    return ["Success"]
}

def getLatestReferences(projectId, referenceType, gitlabToken, latestNumber) {
    def referenceList = getAllBranches(projectId, referenceType, gitlabToken)
    def sortedList = referenceList.sort { a, b -> 
        def dateTemp1 = a.commit.committed_date.split("T")[0].split("-")
        def dateTemp2 = b.commit.committed_date.split("T")[0].split("-")
        def date1 = new Date(dateTemp1[0].toInteger(), dateTemp1[1].toInteger(), dateTemp1[2].toInteger())
        def date2 = new Date(dateTemp2[0].toInteger(), dateTemp2[1].toInteger(), dateTemp2[2].toInteger())
        return date2 <=> date1
    }
    sortedList = sortedList[0..latestNumber].collect { it.name }
    return sortedList
}

def main() {
    def helpText = "Usage: groovy delete-old-branches.groovy [mode] [action] [action-parameter]\nmode: list or delete\naction: oldest or regex\naction-parameter: number of branches to delete or regex to filter branches"
    if (args.size() == 0 || args.size() > 0 && args[0] == "help") {
        println(helpText)
        return
    }
    
    if (args.size() != 3) {
        println("Invalid number of arguments")
        println(helpText)
        return
    }

    def final DELETE = args[0] == "delete" ? "true" : "false"
    def final ACTION = args[1]
    def final ACTION_PARAMETER = args[2]
    def final TOKEN = ""

    if (ACTION == "oldest") {
        def oldestBranches = getOldestBranches(450, "branches", TOKEN, ACTION_PARAMETER.toInteger())
        println(oldestBranches)
        if (DELETE == "true") {
            def result = deleteBranches(454, oldestBranches, TOKEN)
            println(result)
        }
        return
    }
    if (ACTION == "latest") {
        def latestBranches = getLatestReferences(450, "branches", TOKEN, ACTION_PARAMETER.toInteger())
        for (branch in latestBranches) {
            println(branch)
        }
        if (DELETE == "true") {
            def result = deleteBranches(450, latestBranches, TOKEN)
            println(result)
        }
        return
    }
    if (ACTION == "regex") {
        def branches = getBranchesWithRegex(450, "branches", TOKEN, "${ACTION_PARAMETER}")
        println(branches)
        if (DELETE == "true") {
            def result = deleteBranches(450, branches, TOKEN)
            println(result)
        }
        return
    }
}

main()