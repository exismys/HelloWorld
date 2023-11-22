def match(String regex, String text) {
    return text ==~ regex
}

def main() {
    def regex = ".*-release-.*"
    def text = "v1.0.0-release-1"
    println(match(regex, text))
}

main()