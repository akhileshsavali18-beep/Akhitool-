// assets/js/categories.js

document.addEventListener('DOMContentLoaded', () => {
    
    const allCategoriesTbody = document.getElementById('all-categories-tbody');

    if (!allCategoriesTbody || typeof toolsData === 'undefined') return;

    // Process toolsData to get unique categories and tool counts
    const categoryCounts = {};
    
    toolsData.forEach(tool => {
        if (categoryCounts[tool.category]) {
            categoryCounts[tool.category]++;
        } else {
            categoryCounts[tool.category] = 1;
        }
    });

    // Convert object to array for rendering
    const categoriesArray = Object.keys(categoryCounts).map(catName => {
        return {
            name: catName,
            count: categoryCounts[catName]
        };
    });

    // Render Row Function
    const renderRow = (cat) => {
        return `
            <tr class="hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-4">
                    <div class="font-semibold text-gray-900">${cat.name}</div>
                </td>
                <td class="px-6 py-4 text-center">
                    <span class="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-brand-primary border border-blue-100">
                        ${cat.count} Tools
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

    // Render Table
    if (categoriesArray.length === 0) {
        allCategoriesTbody.innerHTML = `<tr><td colspan="3" class="px-6 py-8 text-center text-gray-500">No categories found.</td></tr>`;
    } else {
        allCategoriesTbody.innerHTML = categoriesArray.map(renderRow).join('');
    }
});
