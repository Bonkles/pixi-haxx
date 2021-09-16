import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class MainScene {
    constructor() {
        this.container = new PIXI.Container();
        this.createBackground();
    }

    createBackground() {
        this.bg = new PIXI.Sprite(Globals.resources["bg"].texture);
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        // this.bg.x = window.innerWidth / 2;
        // this.bg.y = window.innerHeight / 2;


        console.log(this.bg);
        // this.bg.scale.set(1, -1);
        // this.bg.y = window.innerHeight;

        // this.bg.alpha = 0;

        // this.bg.visible = false;

        this.bg.tint = 0xffff00;

        this.container.addChild(this.bg);
    }

}