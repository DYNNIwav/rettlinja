import { isLoggedIn, logout } from './auth.js';

const navLinks = document.getElementById('nav-links');
// figure out the correct relative path depending on what page we are on
const path = window.location.pathname;
const root = path.includes('/post/') || path.includes('/account/') ? '../' : './';

if (navLinks) {
    if (isLoggedIn()) {
        navLinks.innerHTML = `
            <a href="${root}post/create.html">Opprett nyheit</a>
            <a href="#" id="logout-btn">Logg ut</a>
        `;

        document.getElementById('logout-btn').addEventListener('click', function (event) {
            event.preventDefault();
            logout();
            window.location.href = root;
        });
    } else {
        navLinks.innerHTML = `
            <a href="${root}account/login.html">Logg inn</a>
        `;
    }
}
