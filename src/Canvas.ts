export class Canvas {
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private isResizing: boolean = false;
    private onResizeCallbacks: Array<() => void> = [];

    constructor() {
        const canvasElements: NodeListOf<HTMLCanvasElement> = document.getElementsByTagName('canvas');
        if (canvasElements.length > 0) {
            this.canvas = canvasElements[0];
            this.canvas.focus();
            this.ctx = this.canvas.getContext('2d');
            this.updateSize();
            this.addResizeListener();
        }
    }

    public onResize(fn: () => void): void {
        this.onResizeCallbacks.push(fn);
    }

    public addEventListener<K extends keyof HTMLElementEventMap>(
        type: K,
        listener: (
            this: HTMLCanvasElement,
            ev: HTMLElementEventMap[K]
        ) => any,
        options?: boolean | AddEventListenerOptions): void {
        this.canvas.addEventListener(type, listener, options);
    }

    public get width(): number {
        return this.canvas.width;
    }

    public clear(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public set fillStyle(value: string | CanvasGradient | CanvasPattern) {
        this.ctx.fillStyle = value;
    }

    public get fillStyle(): string | CanvasGradient | CanvasPattern {
        return this.ctx.fillStyle;
    }

    public fillRect(x: number, y: number, w: number, h: number): void {
        this.ctx.fillRect(x, this.recalculateY(y, h), w, h);
    }

    public fillArc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        this.ctx.fill();
    }

    private recalculateY(originalY: number, height: number = 0): number {
        return Math.round(-originalY + (this.canvas.height / 2)) - height;
    }

    private updateSize(): void {
        const width: number = document.documentElement.clientWidth;
        const height: number = document.documentElement.clientHeight;
        this.canvas.width = width;
        this.canvas.height = height;
    }

    private addResizeListener(): void {
        window.addEventListener('resize', () => {
            if (this.isResizing) {
                return;
            }
            this.isResizing = true;
            window.requestAnimationFrame(() => {
                this.updateSize();
                this.onResizeCallbacks.forEach(fn => fn());
                this.isResizing = false;
            });
        });
    }
}
