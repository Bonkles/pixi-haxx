
import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class PuzzleGrid {
    constructor(parentWidth, parentHeight) {
        this.container = new PIXI.Container();
        this.container.x = 0
        this.container.y = 0
        this.gridSize = 3;
        this.margin = 10;
        this.parentWidth = parentWidth - this.gridSize * this.margin;
        this.parentHeight = parentHeight - this.gridSize * this.margin;

        this.createPuzzle();
    }

        shuffle(input) {

            for (let i = 0; i < input.length; i++) {
                let index = Math.floor(Math.random() * (input.length - i) + .5);

                //Swap the random index with the 'last' index.
                [input[index], input[input.length - i - 1]] = [input[input.length - i - 1], input[index]];
            }
        }

    onTouchStart() {

    }
    createPuzzle() {

        let puzzlePieceKeys = Object.keys(Globals.resources).filter(k => k.startsWith("puzzle"));
        this.shuffle(puzzlePieceKeys);
        let x = this.margin;
        let y = this.margin;
        let i = 1;
        const pieceSize = Math.min(this.parentWidth, this.parentHeight) / this.gridSize;
        for (let key of puzzlePieceKeys) {
            let sprite = new PIXI.Sprite(Globals.resources[key].texture);
            sprite.x = x;
            sprite.y = y;

            sprite.height = sprite.width = pieceSize;
            sprite.anchor.set(0);
            // sprite.interactive = true;
            // sprite.on("mousedown",
            //     this.onTouchStart, this
            // );

            this.container.addChild(sprite);


            if (i % 3 === 0) {
                y += this.parentWidth / this.gridSize + this.margin;
                x = this.margin;
            } else {
                x += this.parentHeight / this.gridSize + this.margin;
            }
            i++;
        }
    }
}