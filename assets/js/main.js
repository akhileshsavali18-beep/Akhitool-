document.addEventListener('DOMContentLoaded', () => {
    // 1. MOBILE MENU LOGIC
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    
    if (menuBtn && mobileDrawer && mobileOverlay && mobileCloseBtn) {
        menuBtn.addEventListener('click', () => {
            mobileDrawer.classList.remove('translate-x-full');
            mobileOverlay.classList.remove('hidden');
            setTimeout(() => mobileOverlay.classList.remove('opacity-0'), 10);
        });

        const closeFunc = () => {
            mobileOverlay.classList.add('opacity-0');
            mobileDrawer.classList.add('translate-x-full');
            setTimeout(() => mobileOverlay.classList.add('hidden'), 300);
        };

        mobileCloseBtn.addEventListener('click', closeFunc);
        mobileOverlay.addEventListener('click', closeFunc);
    }

    // 2. CATEGORIES DROPDOWN LOGIC
    const catBtn = document.getElementById('mobile-categories-btn');
    const catMenu = document.getElementById('mobile-categories-menu');
    const catIcon = document.getElementById('mobile-categories-icon');

    if (catBtn && catMenu && catIcon) {
        catBtn.addEventListener('click', (e) => {
            e.preventDefault();
            catMenu.classList.toggle('hidden');
            catIcon.classList.toggle('-rotate-180');
        });
    }

    // 3. DYNAMIC TOOLS RENDERING LOGIC
    if (typeof toolsData !== 'undefined') {
        function createToolCard(tool) {
            return `
                <a href="${tool.url}" class="group block p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-brand-primary/30 transition-all duration-300 hover:-translate-y-1">
                    <div class="w-12 h-12 rounded-xl ${tool.iconBg} flex items-center justify-center ${tool.iconColor} mb-5 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                        ${tool.icon}
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">${tool.name}</h3>
                    <p class="text-sm text-gray-500 line-clamp-2">${tool.description}</p>
                </a>
            `;
        }

        // Render sections logic
        const sections = [
            { id: 'popular-tools-container', filter: (t) => t.isPopular },
            { id: 'trending-tools-container', filter: (t) => t.isTrending },
            { id: 'recent-tools-container', filter: (t) => t.isRecent }
        ];

        sections.forEach(sec => {
            const container = document.getElementById(sec.id);
            if (container) {
                container.innerHTML = toolsData.filter(sec.filter).map(createToolCard).join('');
            }
        });

        // Render Categories
        const cats = {
            'image-tools-container': 'Image Tools',
            'calculators-tools-container': 'Calculators',
            'pdf-tools-container': 'PDF Tools',
            'ai-tools-container': 'AI Tools',
            'dev-tools-container': 'Developer Tools',
            'seo-tools-container': 'SEO Tools'
        };

        for (const [id, name] of Object.entries(cats)) {
            const cont = document.getElementById(id);
            if (cont) {
                cont.innerHTML = toolsData.filter(t => t.category === name).map(createToolCard).join('');
            }
        }
    }
    
