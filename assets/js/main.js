document.addEventListener('DOMContentLoaded', () => {
    console.log("AkhiTool Script Loaded Successfully");

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
                    <div class="w-12 h-12 rounded-xl ${tool.bgColor || 'bg-blue-50'} flex items-center justify-center ${tool.textColor || 'text-brand-primary'} mb-5 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                        ${tool.iconSvg}
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">${tool.title}</h3>
                    <p class="text-sm text-gray-500 line-clamp-2">${tool.description}</p>
                </a>
            `;
        }

            // Function to generate Tool Card HTML (Debugging Version)
    function createToolCard(tool) {
        // Debugging: ಇದು ಯಾಕೆ undefined ಬರ್ತಿದೆ ಅಂತ ತೋರಿಸುತ್ತದೆ
        if (!id: "image-compressor",
        name: "Image Compressor",
        category: "Image Tools",
        description: "Compress and optimize images without losing quality instantly.",
        url: "image-compressor.html",
        icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>',
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        isPopular: true,
        isTrending: false,
        isRecent: false,
        keywords: "image picture photo compress reduce size optimization webp jpg png" console.log("Missing title for tool:", tool);

        return `
            <a href="${tool.url || '#'}" class="group block p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-brand-primary/30 transition-all duration-300 hover:-translate-y-1">
                <div class="w-12 h-12 rounded-xl ${tool.bgColor || 'bg-blue-50'} flex items-center justify-center ${tool.textColor || 'text-brand-primary'} mb-5 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                    ${tool.iconSvg || '<svg>...</svg>'}
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">${tool.title || tool.name || 'Untitled Tool'}</h3>
                <p class="text-sm text-gray-500 line-clamp-2">${tool.description || tool.desc || 'No description available.'}</p>
            </a>
        `;
    }
        
