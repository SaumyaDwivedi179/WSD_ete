document.getElementById('fetch-cat-btn').addEventListener('click', fetchCatImage);

function fetchCatImage() {
    fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => {
            const catImageUrl = data[0].url;
            document.getElementById('cat-image').src = catImageUrl;
        })
        .catch(error => console.error('Error fetching cat image:', error));
}
