import { apiRequest } from './api.js';
import { isLoggedIn, getToken } from './auth.js';

if (!isLoggedIn()) {
    window.location.href = '/account/login.html';
}

const createPostForm = document.getElementById('create-post-form');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

createPostForm.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').value;
    const category = document.getElementById('category').value;

    try {
        const response = await apiRequest('/posts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ title, content, image, category }),
        });

        successMessage.textContent = 'Nyheita er opprettet!';
        setTimeout(() => {
            window.location.href = '/';
        }, 3000);
    } catch (error) {
        errorMessage.textContent = error.message;
    }
}