const carouselWrapper = document.querySelector("#three-item-carousel");
const carousel = carouselWrapper.querySelector(".carousel");
const prevBtn = carouselWrapper.querySelector(".prev");
const nextBtn = carouselWrapper.querySelector(".next");
const images = carousel.querySelectorAll("img");
const imageWidth = images[0].clientWidth;
const totalImages = images.length;
const visibleImages = 3;
let currentIndex = 0;

// Clone first and last visibleImages for smooth infinite scrolling
for (let i = 0; i < visibleImages; i++) {
    carousel.appendChild(images[i].cloneNode(true));
    carousel.insertBefore(images[totalImages - 1 - i].cloneNode(true), carousel.firstChild);
}

// Adjust initial position to show first 3 actual images
carousel.style.transform = `translateX(-${visibleImages * imageWidth}px)`;

function updateCarousel() {
    carousel.style.transition = "transform 0.5s ease-in-out";
    carousel.style.transform = `translateX(-${(currentIndex + visibleImages) * imageWidth}px)`;
}

function moveToNextImage() {
    currentIndex++;
    updateCarousel();
    if (currentIndex === totalImages) {
        setTimeout(() => {
            carousel.style.transition = "none";
            currentIndex = 0;
            carousel.style.transform = `translateX(-${visibleImages * imageWidth}px)`;
        }, 500);
    }
}

function moveToPrevImage() {
    currentIndex--;
    updateCarousel();
    if (currentIndex === -1) {
        setTimeout(() => {
            carousel.style.transition = "none";
            currentIndex = totalImages - 1;
            carousel.style.transform = `translateX(-${(currentIndex + visibleImages) * imageWidth}px)`;
        }, 500);
    }
}

nextBtn.addEventListener("click", moveToNextImage);
prevBtn.addEventListener("click", moveToPrevImage);
