export class Renderer {
    private callbacks: FrameRequestCallback[] = [];
    private isLoopActive: boolean = false;
    private currentAnimationFrameId: number;

    public addCallback(fn: FrameRequestCallback): void {
        this.callbacks.push(fn);
    }

    public startLoop(): void {
        this.isLoopActive = true;
        this.renderLoop();
    }

    public stopLoop(): void {
        this.isLoopActive = false;
        window.cancelAnimationFrame(this.currentAnimationFrameId);
    }

    private renderLoop(): void {
        if (!this.isLoopActive) {
            return;
        }
        this.currentAnimationFrameId = window.requestAnimationFrame(time => {
            this.renderLoop();
            this.executeCallbacks(time);
        });
    }

    private executeCallbacks(time: number): void {
        this.callbacks.forEach(fn => fn(time));
    }
}
