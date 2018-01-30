import { Canvas } from './Canvas';

export class KeyboardInteractions {
    constructor(private canvas: Canvas) {
    }

    /**
     * createInteractions
     */
    public createInteractions(): void {
        this.canvas.addEventListener('keydown', e => this.handleKeydown(e));
        this.canvas.addEventListener('keyup', e => this.handleKeyup(e));
    }

    /**
     * handleKeydown
     */
    public handleKeydown(event: KeyboardEvent): void {
        // empty
    }

    /**
     * handleKeyup
     */
    public handleKeyup(event: KeyboardEvent): void {
        // empty
    }
}
