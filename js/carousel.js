let currentIndex = 0;
let slides = [];
let dots = [];

export function setupCarousel(posts) {
    const carouselPosts = posts.slice(0, 3);
    const container = document.getElementById('carousel-slides');
    const dotsContainer = document.getElementById('carousel-dots');

    carouselPosts.forEach(function (post, index) {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        if (index === 0) {
            slide.classList.add('active');
        } else {
            slide.inert = true; // so hidden slides cant be focused with keyboard
        }

        slide.innerHTML = `
            <img src="${post.media?.url || ''}" alt="${post.media?.alt || post.title}">
            <div class="carousel-slide-content">
                <h3>${post.title}</h3>
                <a href="./post/index.html?id=${post.id}" class="btn btn-primary">Les meir</a>
            </div>
        `;
        container.appendChild(slide);
        slides.push(slide);

        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Gå til nyheit ' + (index + 1));
        dot.addEventListener('click', function () {
            const direction = index > currentIndex ? 'next' : 'prev';
            goToSlide(index, direction);
        });
        dotsContainer.appendChild(dot);
        dots.push(dot);
    });

    setupButtons();
}

// prevents clicking too fast while a slide is still moving
let isAnimating = false;

function goToSlide(newIndex, direction) {
    if (isAnimating || newIndex === currentIndex) return;
    isAnimating = true;

    const currentSlide = slides[currentIndex];
    const nextSlide = slides[newIndex];

    nextSlide.style.transition = 'none';
    nextSlide.style.transform = direction === 'next'
        ? 'translateX(100%)'
        : 'translateX(-100%)';

    // force the browser to register the new position before animating
    // based on https://www.xjavascript.com/blog/css-transitions-do-not-work-when-assigned-trough-javascript/
    nextSlide.offsetHeight;

    nextSlide.style.transition = '';
    currentSlide.style.transform = direction === 'next'
        ? 'translateX(-100%)'
        : 'translateX(100%)';
    nextSlide.style.transform = 'translateX(0)';

    currentSlide.classList.remove('active');
    currentSlide.inert = true;
    nextSlide.classList.add('active');
    nextSlide.inert = false;
    dots[currentIndex].classList.remove('active');
    dots[newIndex].classList.add('active');
    currentIndex = newIndex;

    setTimeout(function () {
        isAnimating = false;
    }, 500);
}

function setupButtons() {
    document.getElementById('carousel-prev').addEventListener('click', function () {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(newIndex, 'prev');
    });

    document.getElementById('carousel-next').addEventListener('click', function () {
        const newIndex = (currentIndex + 1) % slides.length;
        goToSlide(newIndex, 'next');
    });
}
