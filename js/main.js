import { apiRequest } from './api.js';
import { setupCarousel } from './carousel.js';
import { BLOG_OWNER } from './config.js';

const postsContainer = document.getElementById('posts');
const carouselSlides = document.getElementById('carousel-slides');

async function loadPosts() {
    carouselSlides.innerHTML = '<div class="loading"></div>';
    const oldGrid = postsContainer.querySelector('.post-grid');
    if (oldGrid) oldGrid.remove();
    postsContainer.insertAdjacentHTML('beforeend', '<div class="loading"></div>');

    try {
        const response = await apiRequest(`/blog/posts/${BLOG_OWNER}`);
        const posts = response.data;

        carouselSlides.innerHTML = '';
        setupCarousel(posts);

        postsContainer.querySelector('.loading').remove();
        displayPosts(posts.slice(0, 12));
    } catch (error) {
        carouselSlides.innerHTML = '';
        const loader = postsContainer.querySelector('.loading');
        if (loader) loader.remove();
        postsContainer.insertAdjacentHTML('beforeend', '<p>Kunne ikkje lasta inn nyheiter.</p>');
    }
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('nn-NO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

function truncate(text, maxLength) {
    if (!text || text.length <= maxLength) return text || '';
    return text.substring(0, maxLength).trimEnd() + '...';
}

function displayPosts(posts) {
    const grid = document.createElement('div');
    grid.className = 'post-grid';

    posts.forEach(function (post) {
        const card = document.createElement('a');
        card.href = `./post/index.html?id=${post.id}`;
        card.className = 'post-card';

        card.innerHTML = `
            <img src="${post.media?.url || ''}" alt="${post.media?.alt || post.title}">
            <div class="post-card-content">
                <h3>${post.title}</h3>
                <p class="post-card-excerpt">${truncate(post.body, 120)}</p>
                <p class="post-card-date">${formatDate(post.created)}</p>
                <p class="post-card-author">Av ${post.author?.name}</p>
            </div>
        `;

        grid.appendChild(card);
    });

    postsContainer.appendChild(grid);
}

loadPosts();
