import { apiRequest } from './api.js';
import { setupCarousel } from './carousel.js';

const postsContainer = document.getElementById('posts');

async function loadPosts() {
    try {
        const response = await apiRequest('/blog/posts/paal');
        const posts = response.data;

        setupCarousel(posts);
        displayPosts(posts.slice(0, 12));
    } catch (error) {
        postsContainer.innerHTML = '<p>Could not load posts.</p>';
    }
}

function displayPosts(posts) {
    const grid = document.createElement('div');
    grid.className = 'post-grid';

    posts.forEach(function (post) {
        const card = document.createElement('a');
        card.href = `/post/index.html?id=${post.id}`;
        card.className = 'post-card';

        card.innerHTML = `
            <img src="${post.media?.url || ''}" alt="${post.media?.alt || post.title}">
            <div class="post-card-content">
                <h3>${post.title}</h3>
                <p>${new Date(post.created).toLocaleDateString()}</p>
            </div>
        `;

        grid.appendChild(card);
    });

    postsContainer.appendChild(grid);
}

loadPosts();
