import { apiRequest } from './api.js';
import { isLoggedIn, getToken, getUsername } from './auth.js';

if (!isLoggedIn()) {
    window.location.href = '../account/login.html';
}

const params = new URLSearchParams(window.location.search);
const postId = params.get('id');

const editForm = document.getElementById('edit-post-form');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

async function loadPost() {
    editForm.style.display = 'none';
    editForm.insertAdjacentHTML('beforebegin', '<div class="loading" id="edit-loading"></div>');

    try {
        const response = await apiRequest(`/blog/posts/${getUsername()}/${postId}`);
        const post = response.data;

        document.getElementById('title').value = post.title;
        document.getElementById('body').value = post.body;
        document.getElementById('media').value = post.media?.url || '';

        document.getElementById('edit-loading').remove();
        editForm.style.display = '';
    } catch (error) {
        const loader = document.getElementById('edit-loading');
        if (loader) loader.remove();
        editForm.style.display = '';
        errorMessage.textContent = 'Kunne ikkje lasta inn nyheita.';
    }
}

editForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const media = document.getElementById('media').value;

    errorMessage.textContent = '';
    successMessage.textContent = '';

    try {
        await apiRequest(`/blog/posts/${getUsername()}/${postId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ title, body, media: { url: media } }),
        });

        successMessage.textContent = 'Nyheita er oppdatert!';
        setTimeout(() => {
            window.location.href = `./index.html?id=${postId}`;
        }, 2000);
    } catch (error) {
        errorMessage.textContent = error.message;
    }
});

document.getElementById('delete-btn').addEventListener('click', async function () {
    const confirmed = confirm('Er du sikker på at du vil sletta denne nyheita?');

    if (!confirmed) {
        return;
    }

    try {
        await apiRequest(`/blog/posts/${getUsername()}/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
        });

        alert('Nyheita er sletta.');
        window.location.href = '../';
    } catch (error) {
        errorMessage.textContent = error.message;
    }
});

loadPost();
