document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelector(".slides");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;
    const totalSlides = dots.length;

    if (!slides || !dots.length) {
        console.error("Không tìm thấy slider hoặc dots!");
        return;
    }

    function showSlide(index) {
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;
        slides.style.transform = `translateX(-${index * (100 / totalSlides)}%)`;
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
        currentIndex = index;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            showSlide(index);
        });
    });

    // Tự động chuyển slide sau mỗi 4 giây
    let slideInterval = setInterval(function () {
        showSlide(currentIndex + 1);
    }, 4000);

    // Tạm dừng slider khi tương tác trên mobile
    slides.addEventListener("touchstart", function () {
        clearInterval(slideInterval);
    });
    slides.addEventListener("touchend", function () {
        slideInterval = setInterval(function () {
            showSlide(currentIndex + 1);
        }, 4000);
    });

    // Tối ưu hiệu suất bằng cách chỉ chạy slider khi hiển thị
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                clearInterval(slideInterval);
            } else {
                slideInterval = setInterval(function () {
                    showSlide(currentIndex + 1);
                }, 4000);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(slides);
});