import { Canvas } from './Canvas';
import { Point } from './Point';
import { PointWithTimestamp } from './PointWithTimestamp';

export class MouseModel {

    private MAX_CURSOR_AGE_STEP: number = 50;
    private ALPHA_MODIFIER_STEP: number = 5;

    private cursors: PointWithTimestamp[];
    private cursorsToAdd: Point[];
    private maxCursorAge: number;
    private alphaModifier: number;

    constructor(private canvas: Canvas) {
        this.cursors = [];
        this.cursorsToAdd = [];
        this.maxCursorAge = 600;
        this.alphaModifier = 50;
    }

    public render(time: number): void {
        this.update(time);
        this.cursors.forEach((p, idx, arr) => {
            const alpha: number = idx === arr.length - 1 ?
                1 :
                1 / ((time - p.timestamp) / this.alphaModifier);
            this.canvas.fillStyle = 'rgba(0, 0, 255, ' + alpha + ')';
            this.canvas.fillArc(p.x, p.y, 10, 0, Math.PI * 2);
        });
    }

    public addCursor(point: Point): void {
        this.cursorsToAdd.push(point);
    }

    public increaseTailLength(): void {
        this.maxCursorAge += this.MAX_CURSOR_AGE_STEP;
        // console.log('age ', this.maxCursorAge);
    }

    public decreaseTailLength(): void {
        this.maxCursorAge = Math.max(this.maxCursorAge - this.MAX_CURSOR_AGE_STEP, 1);
        this.alphaModifier = Math.min(this.alphaModifier, this.maxCursorAge);
        // console.log('age ', this.maxCursorAge);
        // console.log('alpha ', this.alphaModifier);
    }

    public increaseTailTransparency(): void {
        const newValue: number = this.alphaModifier - this.ALPHA_MODIFIER_STEP;
        this.alphaModifier = Math.max(newValue, 1);
        // console.log('alpha ', this.alphaModifier);
    }

    public decreaseTailTransparency(): void {
        const newValue: number = this.alphaModifier + this.ALPHA_MODIFIER_STEP;
        this.alphaModifier = Math.min(newValue, this.maxCursorAge);
        // console.log('alpha ', this.alphaModifier);
    }

    private update(time: number): void {
        this.cursors = this.cursors.filter((p, idx, arr) => {
            return idx === arr.length - 1 || time - p.timestamp <= this.maxCursorAge;
        });
        this.cursorsToAdd.forEach(p => {
            this.cursors.push(new PointWithTimestamp(p.x, p.y, time));
        });
        this.cursorsToAdd.length = 0;
    }
}
