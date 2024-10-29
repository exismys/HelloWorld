fetchText().then(text => {
    document.getElementById("quote").innerHTML = text;
}).catch(error => {
    console.log(error);
})

async function fetchText() {
    const response = await fetch("InfiniteStretchOfTime.txt");
    const text = await response.text();
    return text;
}