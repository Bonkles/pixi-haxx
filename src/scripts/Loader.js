import { LoaderConfig } from './LoaderConfig';

const bg = require('../sprites/bg.png')
class Loader {
  constructor (loader) {
    this.loader = loader;
    this.resources = LoaderConfig;
  }

  preload() {
    return new Promise(resolve => {
      for (let key in this.resources) {
        this.loader.add(key, this.resources[key]);
      }

      this.loader.load((loader, resources) => {
        console.log("resources loaded!", resources);
        resolve();
      });
    });
  }
}

export default Loader;