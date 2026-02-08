// src/types/animation.ts
export type EasingFunction = (t: number) => number;

// DISCRIMINATED UNION for animation types
export type AnimationType =
    | { type: 'fade'; duration: number; easing: EasingFunction }
    | { type: 'slide'; direction: 'left' | 'right' | 'up' | 'down'; distance: number }
    | { type: 'scale'; from: number; to: number; duration: number };

// GENERIC INTERFACE for animatable objects
export interface IAnimatable<T> {
    value: T;
    animateTo(target: T, duration: number): Promise<void>;
    currentValue(): T;
}

// Configuration interface with OPTIONAL PROPERTIES
export interface AnimationConfig {
    duration: number;
    easing: EasingFunction;
    delay?: number;  // Optional property
}

// INDEXED ACCESS TYPE example
export type DurationType = AnimationConfig['duration'];

// For Motion Canvas integration
export interface MotionCanvasElement {
    ref: any;
    position: { x: number; y: number };
    fill: string;
    width?: number;
    height?: number;
}