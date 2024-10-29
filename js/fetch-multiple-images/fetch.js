console.log("About to fetch 3 images");
fetchAndShowImage("bwFlower.jpeg", "bwFlower");
fetchAndShowImage("pluckedFlower.jpeg", "pluckedFlower");
fetchAndShowImage("puppies.jpeg", "puppies");

async function fetchAndShowImage(image, id) {
    let response = await fetch(image);
    let blob = await response.blob();
    document.getElementById(id).src = URL.createObjectURL(blob);
}