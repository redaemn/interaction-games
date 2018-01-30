import { Canvas } from './Canvas';
import { MouseModel } from './MouseModel';
import { Point } from './Point';

export class MouseInteractions {
    constructor(private canvas: Canvas, private mouseModel: MouseModel) {
    }

    public createInteractions(): void {
        this.canvas.addEventListener('mousemove', e => this.handleMouseMove(e));
    }

    public handleMouseMove(event: MouseEvent): void {
        this.mouseModel.addCursor(new Point(event.offsetX, event.offsetY));
    }
}
