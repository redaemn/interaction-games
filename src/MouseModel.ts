import { Canvas } from './Canvas';
import { Point } from './Point';
import { PointWithTimestamp } from './PointWithTimestamp';

export class MouseModel {

    private cursors: PointWithTimestamp[];
    private cursorsToAdd: Point[];

    constructor(private canvas: Canvas) {
        this.cursors = [];
        this.cursorsToAdd = [];
    }

    public render(time: number): void {
        this.update(time);
        this.cursors.forEach(p => {
            const alpha: number = 1 / ((time - p.timestamp) / 50);
            this.canvas.fillStyle = 'rgba(0, 0, 255, ' + alpha + ')';
            this.canvas.fillArc(p.x, p.y, 10, 0, Math.PI * 2);
        });
    }

    public addCursor(point: Point): void {
        this.cursorsToAdd.push(point);
    }

    private update(time: number): void {
        this.cursors = this.cursors.filter(p => {
            return time - p.timestamp <= 600;
        });
        this.cursorsToAdd.forEach(p => {
            this.cursors.push(new PointWithTimestamp(p.x, p.y, time));
        });
        this.cursorsToAdd.length = 0;
    }
}
