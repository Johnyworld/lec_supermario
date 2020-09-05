export default class Timer {
  constructor(deltaTime = 1/60) {
    let accumulatedTime = 0;
    let lastTime = 0;
  
    this.updateProxy = (time) => {
      accumulatedTime += (time - lastTime) / 1000;
      console.log( time, accumulatedTime, deltaTime )
  
      while (accumulatedTime > deltaTime)  {
        this.update(deltaTime);
        accumulatedTime -= deltaTime;
      }

      lastTime = time;

      this.enqueue();
    }
  }

  enqueue() {
    requestAnimationFrame(this.updateProxy);
  }

  start() {
    this.enqueue();
  }
}