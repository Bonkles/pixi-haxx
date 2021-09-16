const bg = require('../sprites/bg.png')
class Loader {
  constructor (loader) {
    this.loader = loader;
  }

  preload() {
    this.loader.add('background', bg);
    this.loader.load((loader, resources) => {
      console.log(resources);
    })
  }
}

export default Loader;