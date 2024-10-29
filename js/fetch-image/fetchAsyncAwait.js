getPinkCloud().then(response => {
    console.log("done!"); // This line won't be printed if there's an error
}).catch(error => {
    console.log("error!");
    console.log(error);
});

async function getPinkCloud() {
    const response = await fetch("pinkCloud.jpg");
    const blob = await response.blob();
    document.getElementById("pinkCloudAsync").src = URL.createObjectURL(blob);
}