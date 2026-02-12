import { isLoggedIn, logout } from './auth.js';

const navLinks = document.getElementById('nav-links');

if (navLinks) {
    if (isLoggedIn()) {
        navLinks.innerHTML = `
            <a href="/post/create.html">Opprett nyheit</a>
            <a href="#" id="logout-btn">Logg ut</a>
        `;

        document.getElementById('logout-btn').addEventListener('click', function (event) {
            event.preventDefault();
            logout();
            window.location.href = '/';
        });
    } else {
        navLinks.innerHTML = `
            <a href="/account/login.html">Logg inn</a>
        `;
    }
}
