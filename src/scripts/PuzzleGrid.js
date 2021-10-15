
import * as PIXI from "pixi.js";
import { Globals } from "./Globals";
import { PuzzlePiece } from "./PuzzlePiece";
export class PuzzleGrid {
    constructor(parentWidth, parentHeight) {
        this.container = new PIXI.Container();
        this.container.sortableChildren = true;
        this.container.x = 0
        this.container.y = 0
        this.gridSize = 3;
        this.margin = 5;
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

    onTouchStart(e) {
        this.touchPosition = { x: e.data.Globals.x, y: e.data.Globals.y }
        this.dragging = true;
    }

    onTouchMove(e) {
        if (!this.dragging) {
            return;
        }

        const currentPosition = { x: e.data.Globals.x, y: e.data.Globals.y }
        const offsetX = currentPosition.x - this.touchPosition.x;
        const offsetY = currentPosition.y - this.touchPosition.y;

    }

    handleDragEnd(piece) {
        const pieceToReplace = this.pieces.find(item =>
            item !== piece &&
            //dragged piece's center should be within the boundaries of the  piece it is replacing.
            piece.sprite.x >= item.left && piece.sprite.x <= item.right &&
            piece.sprite.y >= item.top && piece.sprite.y <= item.bottom
        );

        if (pieceToReplace) {
            const replaceField = pieceToReplace.field;
            pieceToReplace.setField(piece.field);
            piece.setField(replaceField);
        } else {
            piece.reset();
        }
    }

    createPuzzle() {
        this.pieces = [];

        let puzzlePieceKeys = Object.keys(Globals.resources).filter(k => k.startsWith("puzzle"));
        this.shuffle(puzzlePieceKeys);
        let x = this.margin;
        let y = this.margin;
        let i = 1;
        const pieceSize = Math.min(this.parentWidth, this.parentHeight) / this.gridSize;
        for (let key of puzzlePieceKeys) {
            let piece = new PuzzlePiece(key, {x: x, y: y}, pieceSize);

            piece.on("dragend", () => this.handleDragEnd(piece));

            this.pieces.push(piece);
            this.container.addChild(piece.sprite);


            if (i % 3 === 0) {
                y += this.parentHeight / this.gridSize + this.margin;
                x = this.margin;
            } else {
                x += this.parentHeight / this.gridSize + this.margin;
            }
            i++;
        }
    }
}