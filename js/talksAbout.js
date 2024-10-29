// This function takes a node (presumebly body) and a string and finds out if the string exist in the body
// Associated html: talksAbout.html

let talksAbout = function(node, string) {
    if (node.nodeType == Node.ELEMENT_NODE) {
        for (let i = 0; i < node.childNodes.length; i++) {
            if (talksAbout(node.childNodes[i], string)) {
                return true;
            }
        }
        return false;
    } else if (node.nodeType == Node.TEXT_NODE) {
        return node.nodeValue.indexOf(string) > -1;
    }
}

console.log(talksAbout(document.body, "not something")); // false
console.log(talksAbout(document.body, "something")); // true
console.log(talksAbout(document.body, "something to find")); // true