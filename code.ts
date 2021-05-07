const setPluginLinkToSidebar = () => {
  const allObjects = figma.currentPage.findAll(
    (item) => item.parent === figma.currentPage
  );

  for (const item of allObjects) {
    item.setRelaunchData({ edit: '' });
  }
};

const main = () => {
  const frame: FrameNode = figma.currentPage.selection.find(
    (item) => item.type === 'FRAME' && item.layoutMode === "NONE"
  ) as FrameNode;

  if (!frame) return;

  const calculateCoordinates = (obj, frame) => {
    const coordinates = {
      x: obj.x -= frame.x,
      y: obj.y -= frame.y,
    };

    if(obj.parent.type !== "PAGE") {
      coordinates.x += frame.x;
      coordinates.y += frame.y;
    }

    if (frame.parent.type === 'PAGE') return coordinates;
    
    return calculateCoordinates(obj, frame.parent);
  };

  const other: Array<SceneNode> = figma.currentPage.selection.filter(
    (item) => item.id !== frame.id
  );

  if (other.length === 0) return;

  for (const item of other) {
    const { x, y } = calculateCoordinates(item, frame);

    item.x = x;
    item.y = y;

    frame.appendChild(item);
  }
};

setPluginLinkToSidebar();
main();
figma.currentPage.setRelaunchData({ open: '' });
figma.closePlugin();
