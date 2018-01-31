import { Canvas } from './Canvas';
import { Point } from './Point';
import { PointWithTimestamp } from './PointWithTimestamp';

export class MouseModel {

    private MAX_CURSOR_AGE_STEP: number = 50;
    private MIN_LIGHTNESS: number = 20;
    private MAX_LIGHTNESS: number = 95;
    private MAX_COLOR_MODIFIER: number = 360;

    private cursors: PointWithTimestamp[];
    private cursorsToAdd: Point[];
    private maxCursorAge: number;
    private currentLightness: number;
    private colorModifier: number;

    constructor(private canvas: Canvas) {
        this.cursors = [];
        this.cursorsToAdd = [];
        this.maxCursorAge = 600;
        this.currentLightness = this.MIN_LIGHTNESS;
        this.colorModifier = 0;
    }

    public render(time: number): void {
        this.update(time);
        const lightnessLength: number = this.MAX_LIGHTNESS - this.MIN_LIGHTNESS;
        const lightnessModifier: number = this.currentLightness - this.MIN_LIGHTNESS;
        this.cursors.forEach((p, idx, arr) => {
            const pointAge: number = time - p.timestamp;
            const lightness: number = idx === arr.length - 1 ?
                this.MIN_LIGHTNESS :
                // ((time - p.timestamp) * (60 - this.lightnessModifier) / this.maxCursorAge) + 20;
                (pointAge * (lightnessLength - lightnessModifier) / this.maxCursorAge) + this.MIN_LIGHTNESS;
            this.canvas.fillStyle = 'hsl(' + this.colorModifier + ', 100%, ' + lightness + '%)';
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
        // console.log('age ', this.maxCursorAge);
    }

    public increaseTailLightness(): void {
        this.currentLightness = Math.max(this.currentLightness - 1, this.MIN_LIGHTNESS);
        // console.log('lightness ', this.currentLightness);
    }

    public decreaseTailLightness(): void {
        this.currentLightness = Math.min(this.currentLightness + 1, this.MAX_LIGHTNESS);
        // console.log('lightness ', this.currentLightness);
    }

    public increaseColor(): void {
        this.colorModifier = (this.colorModifier + 1) % this.MAX_COLOR_MODIFIER;
        // console.log('color ', this.colorModifier);
    }

    public decreaseColor(): void {
        const newValue: number = this.colorModifier - 1;
        this.colorModifier = newValue >= 0 ? newValue : this.MAX_COLOR_MODIFIER;
        // console.log('color ', this.colorModifier);
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
