// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. DYNAMIC TOOL RENDERING
    // ==========================================
    const renderToolCard = (tool) => {
        return `
            <a href="${tool.url}" class="block bg-brand-card rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-hover hover:-translate-y-1 transition-all duration-300 group cursor-pointer h-full">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 rounded-xl ${tool.iconBg} ${tool.iconColor} flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors shrink-0">
                        ${tool.icon}
                    </div>
                    <h3 class="text-md sm:text-lg font-semibold text-brand-text group-hover:text-brand-primary transition-colors">${tool.name}</h3>
                </div>
                <p class="text-gray-500 text-sm leading-relaxed">${tool.description}</p>
            </a>
        `;
    };

    // Populate sections if they exist on the page
    const popContainer = document.getElementById('popular-tools-container');
    if (popContainer) {
        popContainer.innerHTML = toolsData.filter(t => t.isPopular).map(renderToolCard).join('');
    }

    const trendingContainer = document.getElementById('trending-tools-container');
    if (trendingContainer) {
        trendingContainer.innerHTML = toolsData.filter(t => t.isTrending).map(renderToolCard).join('');
    }

    const recentContainer = document.getElementById('recent-tools-container');
    if (recentContainer) {
        recentContainer.innerHTML = toolsData.filter(t => t.isRecent).map(renderToolCard).join('');
    }

    // ==========================================
    // 2. MOBILE SLIDE-IN DRAWER
    // ==========================================
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const closeDrawerBtn = document.getElementById('mobile-close-btn');

    const toggleDrawer = () => {
        const isClosed = mobileDrawer.classList.contains('translate-x-full');
        if (isClosed) {
            mobileDrawer.classList.remove('translate-x-full');
            mobileOverlay.classList.remove('hidden');
            // Small delay to allow display block to apply before opacity transition
            setTimeout(() => mobileOverlay.classList.remove('opacity-0'), 10);
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            mobileDrawer.classList.add('translate-x-full');
            mobileOverlay.classList.add('opacity-0');
            setTimeout(() => mobileOverlay.classList.add('hidden'), 300);
            document.body.style.overflow = '';
        }
    };

    if (mobileBtn && mobileDrawer && mobileOverlay && closeDrawerBtn) {
        mobileBtn.addEventListener('click', toggleDrawer);
        closeDrawerBtn.addEventListener('click', toggleDrawer);
        mobileOverlay.addEventListener('click', toggleDrawer);

        // Close on link click
        const drawerLinks = mobileDrawer.querySelectorAll('.drawer-link');
        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleDrawer();
            });
        });
    }

    // ==========================================
    // 3. EXPLORE TOOLS FULL-SCREEN MODAL
    // ==========================================
    const exploreModal = document.getElementById('explore-modal');
    const closeExploreBtn = document.getElementById('close-explore-btn');
    const exploreGrid = document.getElementById('explore-tools-grid');
    const modalSearchInput = document.getElementById('modal-search-input');
    const emptyState = document.getElementById('explore-empty-state');
    
    // Bind explore buttons (Hero button & Navbar link)
    const exploreTriggers = document.querySelectorAll('#hero-explore-btn, #nav-explore-btn, .open-explore-modal');
    
    const openExploreModal = () => {
        if (!exploreModal) return;
        // Populate grid initially
        exploreGrid.innerHTML = toolsData.map(renderToolCard).join('');
        exploreModal.classList.remove('hidden');
        setTimeout(() => exploreModal.classList.remove('opacity-0'), 10);
        document.body.style.overflow = 'hidden'; // Stop background scrolling
        if(modalSearchInput) modalSearchInput.focus();
    };

    const closeExploreModal = () => {
        if (!exploreModal) return;
        exploreModal.classList.add('opacity-0');
        setTimeout(() => exploreModal.classList.add('hidden'), 300);
        document.body.style.overflow = '';
        if(modalSearchInput) modalSearchInput.value = '';
    };

    exploreTriggers.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        openExploreModal();
    }));

    if (closeExploreBtn) {
        closeExploreBtn.addEventListener('click', closeExploreModal);
    }

    // ==========================================
    // 4. INSTANT SEARCH LOGIC (MODAL)
    // ==========================================
    if (modalSearchInput && exploreGrid) {
        modalSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtered = toolsData.filter(tool => {
                return tool.name.toLowerCase().includes(query) || 
                       tool.category.toLowerCase().includes(query) || 
                       tool.keywords.toLowerCase().includes(query);
            });

            if (filtered.length === 0) {
                exploreGrid.innerHTML = '';
                emptyState.classList.remove('hidden');
            } else {
                emptyState.classList.add('hidden');
                exploreGrid.innerHTML = filtered.map(renderToolCard).join('');
            }
        });
    }

    // ==========================================
    // 5. MAIN HERO DROPDOWN SEARCH
    // ==========================================
    const mainSearchInput = document.getElementById('main-search-input');
    const searchDropdown = document.getElementById('main-search-dropdown');

    if (mainSearchInput && searchDropdown) {
        // Build dropdown item HTML
        const renderDropdownItem = (tool) => {
            return `
                <a href="${tool.url}" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                    <div class="w-10 h-10 rounded-lg ${tool.iconBg} ${tool.iconColor} flex items-center justify-center shrink-0">
                        ${tool.icon}
                    </div>
                    <div>
                        <div class="text-sm font-semibold text-gray-800">${tool.name}</div>
                        <div class="text-xs text-gray-400">${tool.category}</div>
                    </div>
                </a>
            `;
        };

        mainSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 1) {
                searchDropdown.classList.add('hidden');
                searchDropdown.innerHTML = '';
                return;
            }

            const filtered = toolsData.filter(tool => {
                return tool.name.toLowerCase().includes(query) || 
                       tool.category.toLowerCase().includes(query) || 
                       tool.keywords.toLowerCase().includes(query);
            });

            if (filtered.length > 0) {
                searchDropdown.innerHTML = filtered.map(renderDropdownItem).join('');
                searchDropdown.classList.remove('hidden');
                searchDropdown.classList.add('flex');
            } else {
                searchDropdown.innerHTML = `
                    <div class="px-4 py-4 text-center text-sm text-gray-500">
                        No tools found for "${query}"
                    </div>
                `;
                searchDropdown.classList.remove('hidden');
                searchDropdown.classList.add('flex');
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!mainSearchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
                searchDropdown.classList.add('hidden');
            }
        });

        // Open Dropdown again if input has value on focus
        mainSearchInput.addEventListener('focus', () => {
            if (mainSearchInput.value.trim().length > 0) {
                searchDropdown.classList.remove('hidden');
                searchDropdown.classList.add('flex');
            }
        });
    }

});
                                                     
