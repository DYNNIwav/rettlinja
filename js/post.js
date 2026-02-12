import { apiRequest } from './api.js';
import { isLoggedIn, getUsername } from './auth.js';

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");
const postContainer = document.getElementById('post');

async function loadPost() {
    try {
        const response = await apiRequest(`/blog/posts/paal/${postId}`);
        const post = response.data;

        document.title = post.title + ' - Rettlinja';

        let editButton = '';
        if (isLoggedIn() && getUsername() === 'paal') {
            editButton = `<a href="/post/edit.html?id=${postId}" class="btn btn-primary" style="display:inline-block;margin-top:var(--space-md);">Rediger nyheit</a>`;
        }

        postContainer.innerHTML = `
        <img src="${post.media?.url || ''}" alt="${post.media?.alt || post.title}">
        <h1>${post.title}</h1>
        <p class="post-meta">Av ${post.author?.name || 'Ukjent'} | ${new Date(post.created).toLocaleDateString()}</p>
        <div class="post-body">${post.body}</div>
        <button class="share-btn" id="share-btn">Del denne nyheita</button>
        ${editButton}
      `;

      setupShareButton();
    } catch (error) {
        console.error('Error loading post:', error);
        postContainer.innerHTML = '<p>Kunne ikkje lasta inn nyheita.</p>';
    }
}

function setupShareButton() {
    const shareBtn = document.getElementById('share-btn');
    shareBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(window.location.href);
        shareBtn.textContent = 'Kopiert til utklippstavla!';
        setTimeout(function () {
            shareBtn.textContent = 'Del denne nyheita';
        }, 2000);
    });
}

loadPost();
