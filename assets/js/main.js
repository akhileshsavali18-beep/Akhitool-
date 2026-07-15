document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ಮೊಬೈಲ್ ಮೆನು ಓಪನ್ ಆಗಲು
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');

    if (menuBtn && mobileDrawer && mobileOverlay) {
        menuBtn.addEventListener('click', () => {
            mobileDrawer.classList.remove('translate-x-full');
            mobileOverlay.classList.remove('hidden');
        });
        mobileCloseBtn.addEventListener('click', () => {
            mobileDrawer.classList.add('translate-x-full');
            mobileOverlay.classList.add('hidden');
        });
    }

    // 2. ಕ್ಯಾಟಗರಿ ಡ್ರಾಪ್‌ಡೌನ್ ಓಪನ್ ಆಗಲು
    const catBtn = document.getElementById('mobile-categories-btn');
    const catMenu = document.getElementById('mobile-categories-menu');
    if (catBtn && catMenu) {
        catBtn.addEventListener('click', () => {
            catMenu.classList.toggle('hidden');
        });
    }

    // 3. ಟೂಲ್ಸ್ ಕಾಣಿಸಲು (ಡೇಟಾ ಲೋಡ್)
    if (typeof toolsData !== 'undefined') {
        const createCard = (tool) => `
            <a href="${tool.url}" class="group block p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all">
                <div class="w-12 h-12 rounded-xl ${tool.iconBg} flex items-center justify-center ${tool.iconColor} mb-5">${tool.icon}</div>
                <h3 class="text-lg font-bold">${tool.name}</h3>
                <p class="text-sm text-gray-500">${tool.description}</p>
            </a>
        `;

        const containers = {
            'popular-tools-container': (t) => t.isPopular,
            'trending-tools-container': (t) => t.isTrending,
            'recent-tools-container': (t) => t.isRecent,
            'image-tools-container': (t) => t.category === 'Image Tools',
            'calculators-tools-container': (t) => t.category === 'Calculators'
        };

        for (const [id, filterFunc] of Object.entries(containers)) {
            const cont = document.getElementById(id);
            if (cont) {
                cont.innerHTML = toolsData.filter(filterFunc).map(createCard).join('');
            }
        }
    }
});
