import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
import TWEEN from "@tweenjs/tween.js";
export class PuzzlePiece extends PIXI.utils.EventEmitter{
    constructor(id, field, size) {
        super();
        this.sprite = new PIXI.Sprite(Globals.resources[id].texture)
        this.field = field;
        this.reset();
        console.log(this.sprite)
        this.sprite.height = this.sprite.width = size;
        this.sprite.anchor.set(0);

        this.setInteractive();
    }

    setInteractive() {
        this.sprite.interactive = true;
        this.sprite.on("pointerdown", this.onTouchStart, this);
        this.sprite.on("pointermove", this.onTouchMove, this);
        this.sprite.on("pointerupoutside", this.onTouchEnd, this);
        this.sprite.on("pointerup", this.onTouchEnd, this);
    }

    onTouchStart(e) {
        Globals.resources.click.sound.play();
        this.touchPosition = {x: e.data.global.x, y: e.data.global.y}
        this.draggingState = true;
        this.sprite.zIndex = 1;
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
        Globals.resources.click.sound.play();
        this.sprite.zIndex = 0;
        this.draggingState = false;
        this.emit("dragend");
    }

    get left() {
        return this.sprite.x;
    }

    get right() {
        return this.sprite.x + this.sprite.width;
    }

    get top() {
        return this.sprite.y;
    }

    get bottom() {
        return this.sprite.y + this.sprite.height;
    }

    reset() {
        const tween = new TWEEN.Tween(this.sprite);
        tween.to({ x: this.field.x, y: this.field.y }, 300);
        tween.start();
        // this.sprite.x = this.field.x;
        // this.sprite.y = this.field.y;
        this.sprite.zIndex = 0;
    }

    setField(field) {
        this.field = field;
        this.reset();
    }
}