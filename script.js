document.addEventListener("DOMContentLoaded", () => {
    const fetchButton = document.getElementById("fetch-button");
    const catImg = document.getElementById("cat-img");
    const noImage = document.getElementById("no-image");
    const form = document.getElementById("form");
    const formMessage = document.getElementById("form-message");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const breedContainer = document.getElementById("breed-container");
    const breedInfoSection = document.getElementById("breed-info");

    // Function to fetch a random cat image
    const fetchCatImage = async () => {
        try {
            const response = await fetch("https://api.thecatapi.com/v1/images/search");
            const data = await response.json();
            const imageUrl = data[0]?.url;

            if (imageUrl) {
                catImg.src = imageUrl;
                catImg.style.display = "block";
                noImage.style.display = "none";
            } else {
                catImg.style.display = "none";
                noImage.style.display = "block";
            }
        } catch (error) {
            console.error("Error fetching cat image:", error);
            catImg.style.display = "none";
            noImage.style.display = "block";
        }
    };

    // Function to fetch and display breed information
    const fetchBreedInfo = async () => {
        try {
            const response = await fetch('cat-breeds.json');
            const breeds = await response.json();

            breedContainer.innerHTML = ''; // Clear existing content

            breeds.forEach(breed => {
                const breedDiv = document.createElement('div');
                breedDiv.className = 'breed-info';
                
                breedDiv.innerHTML = `
                    <h3>${breed.name}</h3>
                    <img src="${breed.url}" alt="${breed.name}" style="width: 200px; height: 200px; object-fit: cover; border: 2px solid #007bff; border-radius: 10px;">
                    <p><strong>Temperament:</strong> ${breed.temperament}</p>
                    <p><strong>Origin:</strong> ${breed.origin}</p>
                    <p><strong>Description:</strong> ${breed.description}</p>
                    <p><strong>Life Span:</strong> ${breed.life_span}</p>
                `;
                
                breedContainer.appendChild(breedDiv);
            });

            breedInfoSection.style.display = "block"; // Show breed information section
        } catch (error) {
            console.error("Error fetching breed information:", error);
            breedContainer.innerHTML = '<p>Error loading breed information.</p>';
        }
    };

    // Event listener for the Fetch button
    fetchButton.addEventListener("click", fetchCatImage);

    // Form validation and section visibility
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting normally

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = confirmPasswordInput.value;

        if (!name || !email || !password || !confirmPassword) {
            formMessage.textContent = "All fields are required.";
            formMessage.style.color = "red";
            return;
        }

        if (password !== confirmPassword) {
            formMessage.textContent = "Passwords do not match.";
            formMessage.style.color = "red";
            return;
        }

        formMessage.textContent = "Thank you for signing up, " + name + "!";
        formMessage.style.color = "green";

        // Hide sign-up form and show cat image section
        document.getElementById("signup-form").style.display = "none";
        document.getElementById("cat-image").style.display = "block";

        // Fetch and display breed information after successful sign-up
        fetchBreedInfo();

        form.reset(); // Reset the form fields
    });
});
