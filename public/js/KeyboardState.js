const PRESSED = 1;
const RELESED = 0;

export default class keyboardState {
  constructor() {
    //  Holds the current state of a given key.
    this.keyState = new Map();

    // Holds the callback functions for a key code.
    this.keyMap = new Map();
  }

  addMapping(keyCode, callback) {
    this.keyMap.set(keyCode, callback);
  }

  handleEvent(event) {
    const { keyCode } = event;

    if ( !this.keyMap.has(keyCode) ) return; // keyMap 에 등록되지 않은 키일 경우 리턴.

    event.preventDefault();

    const keyState = event.type === 'keydown' ? PRESSED : RELESED;

    if ( this.keyState.get(keyCode) === keyState ) return; // 이미 누르고 있는 키라면 리턴.

    this.keyState.set(keyCode, keyState);
    this.keyMap.get(keyCode)(keyState);
  }

  listenTo(window) {
    ['keydown', 'keyup'].forEach(eventName=> {
      window.addEventListener(eventName, event => {
        this.handleEvent(event);
      });
    })
  }
}