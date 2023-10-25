export const cursorWithinBoundaries = (
  cursor: { x: number; y: number },
  boundaries: { x: number; y: number; width: number; height: number },
): boolean => {
  const { x, y } = cursor;
  const { x: boundaryX, y: boundaryY, width, height } = boundaries;

  // Check if the cursor's x and y are within the boundaries
  const withinXBounds = x >= boundaryX && x <= boundaryX + width;
  const withinYBounds = y >= boundaryY && y <= boundaryY + height;

  // Return true if both x and y are within the boundaries, otherwise return false
  return withinXBounds && withinYBounds;
};
