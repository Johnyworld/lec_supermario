import Entity from './Entity.js';
import Go from './traits/Go.js'
import Jump from './traits/Jump.js'
import { loadSpriteSheet } from './loaders.js';

export function createMario() {
  return loadSpriteSheet('mario')
  .then(sprite=> {
    const mario = new Entity();
    mario.size.set(14, 16);

    mario.addTrait( new Go() );
    mario.addTrait( new Jump() );

    const frames = ['run-1', 'run-2', 'run-3'];

    function routeFrame(mario) {
      if ( mario.go.dir !== 0 ) {
        const frameIndex = Math.floor(mario.go.distance / 10) % frames.length;
        const frameName = frames[frameIndex];
        return frameName;
      }
      return 'idle';
    }
    
    mario.draw = function drawMario(context) {
      sprite.draw(routeFrame(this), context, 0, 0);
    }
    
    return mario;
  });
}

