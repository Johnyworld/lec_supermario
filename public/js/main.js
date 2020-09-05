import { loadLevel } from './loaders.js';
import { loadBackgroundSprites, loadMarioSprite } from './sprites.js';

function drawBackground(background, context, sprites) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for ( let x = x1; x < x2; ++x ) {
      for ( let y = y1; y < y2; ++y ) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  })
}

class Compositor {
  constructor() {
    this.layers = [];
  }

  draw(context) {
    this.layers.forEach(layer => {
      layer(context);
    })
  }
}

function createBackgroundLayer(backgrounds, sprites) {
  const buffer = document.createElement('canvas');
  buffer.width = 256;
  buffer.height = 240;

  backgrounds.forEach(background=> {
    drawBackground(background, buffer.getContext('2d'), sprites);
  });

  return function drawBackgroundLayer(context) {
    context.drawImage(buffer, 0, 0);
  }
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  loadMarioSprite(),
  loadBackgroundSprites(),
  loadLevel('1-1'),
])
.then(([ marioSprite, sprites, level, ]) => {

  const comp = new Compositor();
  const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites);

  comp.layers.push(backgroundLayer);

  const pos = {
    x: 64,
    y: 64,
  };

  function update() {
    comp.draw(context);
    marioSprite.draw('idle', context, pos.x, pos.y);
    pos.x += 2;
    pos.y += 2;
    requestAnimationFrame(update);
  }

  update();

});
