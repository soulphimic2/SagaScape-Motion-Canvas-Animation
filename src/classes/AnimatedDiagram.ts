// src/classes/AnimatedDiagram.ts
import { Vector2 } from '@motion-canvas/core';
import { IAnimatable, Vector2D } from '../types';

// Base class for diagram components
export abstract class DiagramComponent implements IAnimatable<Vector2D> {
    // All interface properties must be present
    public value: Vector2D;

    // Private implementation
    #position: Vector2D;
    protected color: string;
    protected size: Vector2D;

    // Static property to track total components created
    static totalComponents: number = 0;

    // Constructor with default values for color and size
    constructor(
        public readonly id: string,
        position: Vector2D,
        color: string = '#4F46E5',
        size: Vector2D = [100, 100]
    ) {
        this.#position = [...position];
        this.value = [...position]; // Initialize interface property
        this.color = color;
        this.size = size;
        DiagramComponent.totalComponents++;
    }

    // Getter/setter for position
    get position(): Vector2D {
        return [...this.#position];
    }

    // Sync position with interface property
    set position([x, y]: Vector2D) {
        this.#position = [x, y];
        this.value = [x, y]; // Sync interface property
    }

    // Interface implementation
    async animateTo(target: Vector2D, duration: number): Promise<void> {
        console.log(`Animating ${this.id} to [${target[0]}, ${target[1]}] over ${duration}s`);

        // Simulate animation
        await new Promise(resolve => setTimeout(resolve, duration * 1000));

        this.#position = [...target];
        this.value = [...target];

        return Promise.resolve();
    }

    // Return a copy of the current value to prevent external mutation
    currentValue(): Vector2D {
        return [...this.value];
    }

    // Abstract method
    abstract render(): string;

    // Additional functionality
    moveTo(x: number, y: number): void {
        this.position = [x, y];
    }

    // New method to get bounding box
    getBounds() {
        const [x, y] = this.#position;
        const [width, height] = this.size;
        return {
            x: x - width / 2,
            y: y - height / 2,
            width,
            height
        };
    }
}

// Subclass
export class DictionaryNode extends DiagramComponent {
    private entries: number;

    // Constructor with additional parameter for entries
    constructor(id: string, position: Vector2D, entries: number) {
        super(id, position, '#8B5CF6', [150, 100]);
        this.entries = entries;
    }

    // Implement abstract method
    render(): string {
        return `📚 ${this.id}: ${this.entries.toLocaleString()} entries`;
    }

    // Additional methods specific to DictionaryNode
    getMetrics() {
        return {
            entries: this.entries,
            position: this.position,
            bounds: this.getBounds()
        };
    }
}