console.log("About to fetch pinkCloud.jpg");

fetch("pinkCloud.jpg").then(response => {
    console.log(response);
    return response.blob();
}).then(blob => {
    console.log(blob);
    document.getElementById("pinkCloud").src = URL.createObjectURL(blob);
})