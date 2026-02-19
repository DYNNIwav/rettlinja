import { apiRequest } from './api.js';
import { isLoggedIn, getUsername } from './auth.js';
import { BLOG_OWNER } from './config.js';

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");
const postContainer = document.getElementById('post');

// the api returns plain text with \n\n between paragraphs so we need to wrap them in <p> tags
function formatBody(text) {
    if (!text) return '';
    const paragraphs = text.split('\n\n');
    let html = '';
    for (const p of paragraphs) {
        if (p.trim()) {
            html += `<p>${p.trim()}</p>`;
        }
    }
    return html;
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('nn-NO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

async function loadPost() {
    postContainer.innerHTML = '<div class="loading"></div>';

    try {
        const response = await apiRequest(`/blog/posts/${BLOG_OWNER}/${postId}`);
        const post = response.data;

        document.title = post.title + ' - Rettlinja';

        // only show edit button if the logged in user is the blog owner
        let editButton = '';
        if (isLoggedIn() && getUsername() === BLOG_OWNER) {
            editButton = `<a href="./edit.html?id=${postId}" class="btn btn-primary edit-btn">Rediger nyheit</a>`;
        }

        postContainer.innerHTML = `
        <img src="${post.media?.url || ''}" alt="${post.media?.alt || post.title}">
        <h1>${post.title}</h1>
        <p class="post-meta">Av ${post.author?.name || 'Ukjent'} &middot; ${formatDate(post.created)}</p>
        <hr class="post-divider">
        <div class="post-body">${formatBody(post.body)}</div>
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
