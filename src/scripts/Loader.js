class Loader {
  constructor (loader) {
    this.loader = loader; 
  }

  preload() {
    this.loader.add('background', '../src/sprites/bg.png');
    this.loader.load((loader, resources) => {
      console.log(resources);
    })
  }
}

export default Loader; 