import Entity from './Entity.js';
import Jump from './traits/Jump.js'
import Velocity from './traits/Velocity.js'
import { loadMarioSprite } from './sprites.js';

export function createMario() {
  return loadMarioSprite()
  .then(sprite=> {
    const mario = new Entity();
    mario.size.set(14, 48);

    mario.addTrait( new Velocity() );
    mario.addTrait( new Jump() );
    
    mario.draw = function drawMario(context) {
      sprite.draw('idle', context, this.pos.x, this.pos.y);
    }
    
    return mario;
  });
}

