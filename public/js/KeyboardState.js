const PRESSED = 1;
const RELESED = 0;

export default class keyboardState {
  constructor() {
    //  Holds the current state of a given key.
    this.keyState = new Map();

    // Holds the callback functions for a key code.
    this.keyMap = new Map();
  }

  addMapping(code, callback) {
    this.keyMap.set(code, callback);
  }

  handleEvent(event) {
    const { code } = event;

    if ( !this.keyMap.has(code) ) return; // keyMap 에 등록되지 않은 키일 경우 리턴.

    event.preventDefault();

    const keyState = event.type === 'keydown' ? PRESSED : RELESED;

    if ( this.keyState.get(code) === keyState ) return; // 이미 누르고 있는 키라면 리턴.

    this.keyState.set(code, keyState);
    this.keyMap.get(code)(keyState);
  }

  listenTo(window) {
    ['keydown', 'keyup'].forEach(eventName=> {
      window.addEventListener(eventName, event => {
        this.handleEvent(event);
      });
    })
  }
}