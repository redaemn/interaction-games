import { Canvas } from './Canvas';
import { MouseModel } from './MouseModel';

export class KeyboardInteractions {
    constructor(private canvas: Canvas, private mouseModel: MouseModel) {
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
        switch (event.code) {
            case 'KeyQ':
                this.mouseModel.increaseTailLength();
                break;
            case 'KeyA':
                this.mouseModel.decreaseTailLength();
                break;
            case 'KeyW':
                this.mouseModel.increaseTailLightness();
                break;
            case 'KeyS':
                this.mouseModel.decreaseTailLightness();
                break;
            case 'KeyE':
                this.mouseModel.increaseColor();
                break;
            case 'KeyD':
                this.mouseModel.decreaseColor();
                break;
        }
    }

    /**
     * handleKeyup
     */
    public handleKeyup(event: KeyboardEvent): void {
        // empty
    }
}
