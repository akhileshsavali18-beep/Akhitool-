document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');

    if (!menuBtn || !mobileDrawer || !mobileOverlay || !mobileCloseBtn) return;

    function toggleMenu() {
        const isHidden = mobileDrawer.classList.contains('translate-x-full');
        if (isHidden) {
            mobileOverlay.classList.remove('hidden');
            setTimeout(() => mobileOverlay.classList.remove('opacity-0'), 10);
            mobileDrawer.classList.remove('translate-x-full');
        } else {
            mobileOverlay.classList.add('opacity-0');
            mobileDrawer.classList.add('translate-x-full');
            setTimeout(() => mobileOverlay.classList.add('hidden'), 300);
        }
    }

    menuBtn.addEventListener('click', toggleMenu);
    mobileCloseBtn.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', toggleMenu);
});
