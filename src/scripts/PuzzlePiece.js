import * as PIXI from "pixi.js";
import { Globals } from "./Globals";


export class PuzzlePiece {
    constructor(id, x, y, size) {
        this.sprite = new PIXI.Sprite(Globals.resources[id].texture)
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.height = this.sprite.width = size;
        this.sprite.anchor.set(0);
    }

}