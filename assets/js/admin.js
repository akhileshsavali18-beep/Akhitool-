// assets/js/admin.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- SIDEBAR TOGGLE LOGIC ---
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    const toggleSidebar = () => {
        const isClosed = sidebar.classList.contains('-translate-x-full');
        if (isClosed) {
            sidebar.classList.remove('-translate-x-full');
            sidebarOverlay.classList.remove('hidden');
        } else {
            sidebar.classList.add('-translate-x-full');
            sidebarOverlay.classList.add('hidden');
        }
    };

    if (sidebarToggle && sidebar && sidebarOverlay) {
        sidebarToggle.addEventListener('click', toggleSidebar);
        sidebarOverlay.addEventListener('click', toggleSidebar);
    }

    // --- DASHBOARD STATS & RECENT TOOLS ---
    const recentToolsTbody = document.getElementById('recent-tools-tbody');
    
    if (recentToolsTbody && typeof toolsData !== 'undefined') {
        
        // 1. Update Stats
        const totalToolsEl = document.getElementById('stat-total-tools');
        const categoriesEl = document.getElementById('stat-categories');
        
        if (totalToolsEl) totalToolsEl.innerText = toolsData.length;
        
        if (categoriesEl) {
            const uniqueCategories = [...new Set(toolsData.map(t => t.category))];
            categoriesEl.innerText = uniqueCategories.length;
        }

        // 2. Render Recent Tools (Showing last 5 added tools conceptually)
        // For now, we filter by isRecent, or just show top 5.
        const recentTools = toolsData.filter(t => t.isRecent).slice(0, 5);
        
        const renderAdminToolRow = (tool) => {
            return `
                <tr class="hover:bg-gray-50/50 transition-colors">
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg ${tool.iconBg} ${tool.iconColor} flex items-center justify-center shrink-0">
                                ${tool.icon}
                            </div>
                            <span class="font-medium text-gray-900">${tool.name}</span>
                        </div>
                    </td>
                    <td class="px-6 py-4 text-gray-500 hidden sm:table-cell">${tool.category}</td>
                    <td class="px-6 py-4 text-center">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                        </span>
                    </td>
                    <td class="px-6 py-4 text-right">
                        <button class="text-brand-primary hover:text-brand-secondary text-sm font-medium">Edit</button>
                    </td>
                </tr>
            `;
        };

        recentToolsTbody.innerHTML = recentTools.map(renderAdminToolRow).join('');
    }
});
