// assets/js/auth.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- LOGIN LOGIC ---
    const loginForm = document.getElementById('admin-login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            const btn = loginForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            // Fake loading state
            btn.innerText = "Authenticating...";
            btn.disabled = true;
            btn.classList.add('opacity-70');

            // Simulate network request, then redirect
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 800);
        });
    }

    // --- LOGOUT LOGIC ---
    const logoutBtn = document.getElementById('logout-btn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // In the future, call firebase.auth().signOut() here
            window.location.href = "login.html";
        });
    }
});
