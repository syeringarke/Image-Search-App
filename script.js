const accessKey = "SM9SbY3Kq1xnqI7GzBMmyXsDBh-mGFYpv61lPw-Z4n4";

const form = document.getElementById("form");
const searchInput = document.getElementById("search-input");
const searchResult = document.getElementById("search-result");
const showMoreButton = document.getElementById("showmore-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data =  await response.json();
    
    if(page === 1) {
        searchResult.innerHTML = "";
    }
    const results = data.results;

    results.map((result) => {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("search-single");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");;
        imageLink.href = result.links.html ;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageContainer.appendChild(image);
        imageContainer.appendChild(imageLink);
        searchResult.appendChild(imageContainer);
    });
    page++;

    if (page > 1) {
        showMoreButton.style.display = "block";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreButton.addEventListener("click", () => {
    searchImages();
});
    