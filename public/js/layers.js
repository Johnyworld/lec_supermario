export function createBackgroundLayer(level, sprites) {
  const buffer = document.createElement('canvas');
  const context = buffer.getContext('2d');
  buffer.width = 256;
  buffer.height = 240;

  level.tiles.forEach((tile, x, y) => {
    sprites.drawTile(tile.name, context, x, y);
  });

  return function drawBackgroundLayer(context) {
    context.drawImage(buffer, 0, 0);
  }
}

export function createSpriteLayer(entities) {
  return function drawSpriteLayer(context) {
    entities.forEach(entity => {
      entity.draw(context);
    })
  }
}
