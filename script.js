document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelector(".slides");
    const slideItems = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".dots");
    let currentIndex = 0;
    const totalSlides = slideItems.length;

    // Tạo dots động dựa trên số lượng slide
    slideItems.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function showSlide(index) {
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;
        slides.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
        currentIndex = index;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => showSlide(index));
    });

    // Tự động chuyển slide
    let slideInterval = setInterval(() => showSlide(currentIndex + 1), 4000);

    // Tạm dừng khi tương tác
    slides.addEventListener("touchstart", () => clearInterval(slideInterval));
    slides.addEventListener("touchend", () => {
        slideInterval = setInterval(() => showSlide(currentIndex + 1), 4000);
    });

    // Tối ưu hiệu suất
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) clearInterval(slideInterval);
            else slideInterval = setInterval(() => showSlide(currentIndex + 1), 4000);
        });
    }, { threshold: 0.1 });

    observer.observe(slides);
});
// Gallery Slider
const gallerySlides = document.querySelector(".gallery-slides");
const gallerySlideItems = document.querySelectorAll(".gallery-slide");
const prevBtn = document.querySelector(".gallery-prev");
const nextBtn = document.querySelector(".gallery-next");
let galleryIndex = 0;
const totalGallerySlides = gallerySlideItems.length;

function showGallerySlide(index) {
    if (index >= totalGallerySlides) index = 0;
    if (index < 0) index = totalGallerySlides - 1;
    gallerySlides.style.transform = `translateX(-${index * 100}%)`;
    galleryIndex = index;
}

prevBtn.addEventListener("click", () => {
    showGallerySlide(galleryIndex - 1);
});

nextBtn.addEventListener("click", () => {
    showGallerySlide(galleryIndex + 1);
});