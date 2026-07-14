// assets/js/tools.js

document.addEventListener('DOMContentLoaded', () => {
    
    const allToolsTbody = document.getElementById('all-tools-tbody');
    const searchInput = document.getElementById('admin-search-tools');

    if (!allToolsTbody || typeof toolsData === 'undefined') return;

    // Render Row Function
    const renderRow = (tool) => {
        return `
            <tr class="hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl ${tool.iconBg} ${tool.iconColor} flex items-center justify-center shrink-0">
                            ${tool.icon}
                        </div>
                        <div>
                            <div class="font-semibold text-gray-900">${tool.name}</div>
                            <div class="text-xs text-gray-500 mt-0.5 truncate max-w-[200px]">${tool.description}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                        ${tool.category}
                    </span>
                </td>
                <td class="px-6 py-4 text-gray-500 text-sm font-mono">
                    /${tool.url}
                </td>
                <td class="px-6 py-4 text-center">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                        Published
                    </span>
                </td>
                <td class="px-6 py-4 text-right space-x-2">
                    <button class="text-gray-400 hover:text-brand-primary transition-colors" title="Edit">
                        <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button class="text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                        <svg class="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </td>
            </tr>
        `;
    };

    // Initial Render
    const renderTable = (data) => {
        if (data.length === 0) {
            allToolsTbody.innerHTML = `<tr><td colspan="5" class="px-6 py-8 text-center text-gray-500">No tools found matching your search.</td></tr>`;
            return;
        }
        allToolsTbody.innerHTML = data.map(renderRow).join('');
    };

    renderTable(toolsData);

    // Search Logic
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtered = toolsData.filter(tool => {
                return tool.name.toLowerCase().includes(query) || 
                       tool.category.toLowerCase().includes(query) ||
                       tool.url.toLowerCase().includes(query);
            });
            renderTable(filtered);
        });
    }
});
