import groovy.json.JsonSlurper
import java.net.HttpURLConnection
import java.net.URL

def getReferences(projectId, referenceType, pages, gitlabToken) {
    def referenceList = []
    for (int page = 1; page <= pages; page++) {
        def apiUrl = "https://gitlab.gametechlabs.net/api/v4/projects/${projectId}/repository/${referenceType}?per_page=100&page=${page}"
        URL url = new URL(apiUrl)
        HttpURLConnection conn = url.openConnection()
        conn.setRequestMethod("GET")
        conn.setRequestProperty("PRIVATE-TOKEN", gitlabToken)
        if (conn.responseCode != 200) return ["Error"]
        String response = conn.inputStream.text
        List responseJson = new JsonSlurper().parseText(response)
        for (reference in responseJson) {
            referenceList.add(reference.name)
        }
    }
    return referenceList
}

def main() {
    def gitlabToken = "gitlab-api-token"
    def final REFERENCE_TYPE = "branches"
    def final pagesMap = [
        995: 10,    // ppliveui
        1086: 13,   // pp-ui-arc
        454: 25     // appmobile
    ]
    try {
    def references = []
    if (REFERENCE_TYPE == "tags") {
        for (int projectId : pagesMap.keySet()) {
            references.addAll(getReferences(projectId, REFERENCE_TYPE, 1, gitlabToken))
        }
    } else {
        for (int projectId : pagesMap.keySet()) {
            def pages = pagesMap.get(projectId)
            references.addAll(getReferences(projectId, REFERENCE_TYPE, pages, gitlabToken))
        }
    }
    println(references)
    } catch (Exception e) {
        println(e)
    }
}

main()
