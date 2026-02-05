import { login } from './auth.js';

const form =document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    errorMessage.textContent = '';
    successMessage.textContent = '';
    try {
       await login(email, password);

        successMessage.textContent = 'Velkomen tilbake!';
        setTimeout(() => {
            window.location.href = '/';
        }, 3000);
    } catch (error) {
        errorMessage.textContent = error.message;
    }
}