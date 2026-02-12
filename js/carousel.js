let currentIndex = 0;
let slides = [];

export function setupCarousel(posts) {
    const carouselPosts = posts.slice(0, 3);
    const container = document.getElementById('carousel-slides');

    carouselPosts.forEach(function (post, index) {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        if (index === 0) {
            slide.classList.add('active');
        }

        slide.innerHTML = `
            <img src="${post.media?.url || ''}" alt="${post.media?.alt || post.title}">
            <div class="carousel-slide-content">
                <h3>${post.title}</h3>
                <a href="/post/index.html?id=${post.id}" class="btn btn-primary">Les meir</a>
            </div>
        `;
        container.appendChild(slide);
        slides.push(slide);
    });

    setupButtons();
}

function setupButtons() {
    document.getElementById('carousel-prev').addEventListener('click', function () {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
    });

    document.getElementById('carousel-next').addEventListener('click', function () {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
    });
}
