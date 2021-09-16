import * as PIXI from "pixi.js";
import Loader from './Loader'; 

class App { 
  run() {
    this.app = new PIXI.Application({resizeTo: window}); 
    this.loader = new Loader(this.app.loader) ; 
    this.loader.preload(); 
    console.log(this.app); 

    document.body.appendChild(this.app.view); 
  }
}

export default App; 
