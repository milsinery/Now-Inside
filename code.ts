const frame: FrameNode = figma.currentPage.selection.find(item => item.type === "FRAME") as FrameNode;

if(frame) {
  const other: Array<SceneNode> = figma.currentPage.selection.filter(item => item.id !== frame.id);

  if(other.length > 0) {
    for(const item of other) {
      item.x = item.x - frame.x;
      item.y = item.y - frame.y;
      frame.appendChild(item);
    }
  }
}

figma.closePlugin();
