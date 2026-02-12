import { register } from './auth.js';

const form =document.getElementById('register-form');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    errorMessage.textContent = '';
    successMessage.textContent = '';
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passordene er ikke like';
        return;
    }

    try {
        await register(username, email, password, confirmPassword);

        successMessage.textContent = 'Kontoen din er oppretta!';
        setTimeout(() => {
            window.location.href = './login.html';
        }, 3000);
    } catch (error) {
        errorMessage.textContent = error.message;
    }
}