import { apiRequest } from './api.js';
import { isLoggedIn, getToken, getUsername } from './auth.js';

if (!isLoggedIn()) {
    window.location.href = '../account/login.html';
}

const createPostForm = document.getElementById('create-post-form');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

const mediaInput = document.getElementById('media');
const preview = document.getElementById('media-preview');

mediaInput.addEventListener('input', function () {
    if (mediaInput.value) {
        preview.src = mediaInput.value;
    } else {
        preview.hidden = true;
    }
});

preview.addEventListener('load', function () {
    preview.hidden = false;
});

preview.addEventListener('error', function () {
    preview.hidden = true;
});

createPostForm.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const media = document.getElementById('media').value;
    const mediaAlt = document.getElementById('media-alt').value;

    errorMessage.textContent = '';
    successMessage.textContent = '';

    try {
        const response = await apiRequest(`/blog/posts/${getUsername()}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ title, body, media: { url: media, alt: mediaAlt } }),
        });

        successMessage.textContent = 'Nyheita er opprettet!';
        setTimeout(() => {
            window.location.href = '../';
        }, 3000);
    } catch (error) {
        errorMessage.textContent = error.message;
    }
}