import * as PIXI from "pixi.js";
import { Globals } from "./Globals";


export class PuzzlePiece {
    constructor(id, field, size) {
        this.sprite = new PIXI.Sprite(Globals.resources[id].texture)
        this.sprite.x = field.x;
        this.sprite.y = field.y;
        this.field = field;

        this.sprite.height = this.sprite.width = size;
        this.sprite.anchor.set(0);

        this.setInteractive();
    }

    setInteractive() {
        this.sprite.interactive = true;
        this.sprite.on("mousedown", this.onTouchStart, this);
        this.sprite.on("mousemove", this.onTouchMove, this);
        this.sprite.on("mouseupoutside", this.onTouchEnd, this);
        this.sprite.on("mouseup", this.onTouchEnd, this);
    }

    onTouchStart(e) {
        this.touchPosition = {x: e.data.global.x, y: e.data.global.y}
        this.draggingState = true;
    }

    onTouchMove(e) {
        if (!this.draggingState) return;
        const currentPosition = { x: e.data.global.x, y: e.data.global.y }
        const offsetX = currentPosition.x - this.touchPosition.x;
        const offsetY = currentPosition.y - this.touchPosition.y;

        this.sprite.x = this.field.x + offsetX;
        this.sprite.y = this.field.y + offsetY;
    }

    onTouchEnd(e) {
        if (!this.draggingState) return;

        this.sprite.x = this.field.x;
        this.sprite.y = this.field.y;

        this.draggingState = false;
    }

}