const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // Identifiants temporaires de démonstration
    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "Admin2026!";

    if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
    ) {
        sessionStorage.setItem("adminConnected", "true");

        window.location.href = "admin.html";
    } else {
        loginMessage.textContent = "Identifiant ou mot de passe incorrect.";
        loginMessage.style.color = "red";
    }
});