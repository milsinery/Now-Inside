const setPluginLinkToSidebar = () => {
    const allObjects = figma.currentPage.findAll((item) => item.parent === figma.currentPage);
    for (const item of allObjects) {
        item.setRelaunchData({ edit: '' });
    }
};
const main = () => {
    const frame = figma.currentPage.selection.find((item) => item.type === 'FRAME');
    if (!frame)
        return;
    const other = figma.currentPage.selection.filter((item) => item.id !== frame.id);
    if (other.length === 0)
        return;
    for (const item of other) {
        item.x = item.x - frame.x;
        item.y = item.y - frame.y;
        frame.appendChild(item);
    }
};
setPluginLinkToSidebar();
main();
figma.currentPage.setRelaunchData({ open: '' });
figma.closePlugin();
