import * as PIXI from "pixi.js";
import Loader from './Loader';

class App {
  run() {
    this.app = new PIXI.Application({resizeTo: window});
    this.loader = new Loader(this.app.loader) ;
    this.loader.preload().then(() => this.start());

    document.body.appendChild(this.app.view);
  }

  start() {
    console.log("The game started.")
  }
}

export default App;
