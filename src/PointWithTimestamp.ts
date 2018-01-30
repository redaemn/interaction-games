import { Point } from './Point';

export class PointWithTimestamp extends Point {
    private _timestamp: number;

    constructor(x: number, y: number, timestamp: number) {
        super(x, y);
        this._timestamp = timestamp;
    }

    public get timestamp(): number {
        return this._timestamp;
    }
}
