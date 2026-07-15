document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. MOBILE MENU & DROPDOWN LOGIC
    // -------------------------------------------------------------------------
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    
    // Dropdown Elements
    const catBtn = document.getElementById('mobile-categories-btn');
    const catMenu = document.getElementById('mobile-categories-menu');
    const catIcon = document.getElementById('mobile-categories-icon');

    // Toggle Mobile Menu Function
    function toggleMenu() {
        if (!mobileDrawer || !mobileOverlay) return;
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

    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
    if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', toggleMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMenu);

    // Toggle Categories Dropdown Function
    if (catBtn && catMenu && catIcon) {
        catBtn.addEventListener('click', () => {
            catMenu.classList.toggle('hidden');
            catIcon.classList.toggle('-rotate-180');
        });
    }

    // -------------------------------------------------------------------------
    // 2. DYNAMIC TOOLS RENDERING LOGIC
    // -------------------------------------------------------------------------
    // Check if toolsData exists (from tools-data.js)
    if (typeof toolsData === 'undefined') {
        console.warn("tools-data.js is not loaded properly.");
        return;
    }

    // Function to generate Tool Card HTML
    function createToolCard(tool) {
        return `
            <a href="${tool.url}" class="group block p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-brand-primary/30 transition-all duration-300 hover:-translate-y-1">
                <div class="w-12 h-12 rounded-xl ${tool.bgColor || 'bg-blue-50'} flex items-center justify-center ${tool.textColor || 'text-brand-primary'} mb-5 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                    ${tool.iconSvg}
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">${tool.title}</h3>
                <p class="text-sm text-gray-500 line-clamp-2">${tool.description}</p>
            </a>
        `;
    }

    // Render Popular Tools (On Homepage)
    const popularContainer = document.getElementById('popular-tools-container');
    if (popularContainer) {
        const popularTools = toolsData.filter(t => t.isPopular);
        popularContainer.innerHTML = popularTools.map(createToolCard).join('');
    }

    // Render Tools by Category (On Category Pages)
    const categoryContainers = {
        'image-tools-container': 'Image Tools',
        'calculators-tools-container': 'Calculators',
        'pdf-tools-container': 'PDF Tools',
        'ai-tools-container': 'AI Tools',
        'dev-tools-container': 'Developer Tools',
        'seo-tools-container': 'SEO Tools'
    };

    for (const [containerId, categoryName] of Object.entries(categoryContainers)) {
        const container = document.getElementById(containerId);
        if (container) {
            const categoryTools = toolsData.filter(t => t.category === categoryName);
            if (categoryTools.length > 0) {
                container.innerHTML = categoryTools.map(createToolCard).join('');
            } else {
                container.innerHTML = `<p class="text-gray-500 col-span-full text-center py-8">More tools coming soon!</p>`;
            }
        }
    }
});

                                                     
