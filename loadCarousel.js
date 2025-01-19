 document.addEventListener("DOMContentLoaded", function () {
        const carousel = document.getElementById('carousel');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        let jsonData = [];
        let currentIndex = 0;

        // Function to fetch the JSON file from the provided URL
        async function fetchJsonFile() {
            const url = 'https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json'; // Updated URL
            try {
                const response = await fetch(url);
                const data = await response.json();
                jsonData = data; // Store the JSON data
                displayJsonInCarousel();
            } catch (error) {
                console.error('Error fetching the JSON file:', error);
            }
        }

        // Function to display JSON data in the carousel
        function displayJsonInCarousel() {
            if (jsonData.length > 0) {
                carousel.innerHTML = ''; // Clear current carousel items
                jsonData.forEach((item, index) => {
                    const div = document.createElement('div');
                    div.classList.add('carousel-item');
                    div.textContent = JSON.stringify(item); // Display each item as a string
                    carousel.appendChild(div);
                });
                updateCarouselPosi();
            }
        }

        // Function to update the carousel's position based on the current index
        function updateCarouselPosition() {
            const carouselWidth = carousel.offsetWidth;
            const newTransformValue = -currentIndex * carouselWidth;
            carousel.style.transform = `translateX(${newTransformValue}px)`;
        }

        // Event listeners for prev and next buttons
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarouselPosition();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < jsonData.length - 1) {
                currentIndex++;
                updateCarouselPosition();
            }
        });

        // Load the JSON file when the page loads
        fetchJsonFile();
    });
