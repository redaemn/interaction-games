import { Canvas } from './Canvas';
import { KeyboardInteractions } from './KeyboardInteractions';
import { MouseInteractions } from './MouseInteractions';
import { MouseModel } from './MouseModel';
import { Renderer } from './Renderer';

export class App {
    private canvas: Canvas;
    private renderer: Renderer;
    private mouseModel: MouseModel;
    private keyboardInteractions: KeyboardInteractions;
    private mouseInteractions: MouseInteractions;

    constructor() {
        this.canvas = new Canvas();
        this.renderer = new Renderer();
        this.mouseModel = new MouseModel(this.canvas);
        this.keyboardInteractions = new KeyboardInteractions(this.canvas, this.mouseModel);
        this.mouseInteractions = new MouseInteractions(this.canvas, this.mouseModel);
    }

    /**
     * start
     */
    public start(): void {
        this.keyboardInteractions.createInteractions();
        this.mouseInteractions.createInteractions();

        this.canvas.onResize(() => {
            // empty
        });

        this.renderer.addCallback(() => this.canvas.clear());
        this.renderer.addCallback(time => this.mouseModel.render(time));

        this.renderer.startLoop();
    }
}
