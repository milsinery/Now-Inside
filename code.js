const allFrames = figma.currentPage.findAll(item => item.parent === figma.currentPage);
for (const item of allFrames) {
    item.setRelaunchData({ edit: '' });
}
const frame = figma.currentPage.selection.find(item => item.type === "FRAME");
if (frame) {
    const other = figma.currentPage.selection.filter(item => item.id !== frame.id);
    if (other.length > 0) {
        for (const item of other) {
            if (item.parent === figma.currentPage) {
                item.x = item.x - frame.x;
                item.y = item.y - frame.y;
                frame.appendChild(item);
            }
        }
    }
}
figma.currentPage.setRelaunchData({ open: '' });
figma.closePlugin();
