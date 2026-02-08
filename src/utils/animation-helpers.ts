// src/utils/animation-helpers.ts
import { EasingFunction, AnimationType } from '../types';

// GENERIC FUNCTION with DEFAULT TYPE PARAMETER
export function createAnimation<T extends AnimationType>(
    config: T
): { type: T['type']; duration: number } {
    return {
        type: config.type,
        duration: 'duration' in config ? config.duration : 1
    };
}

// CURRYING example
export const createEasingAnimation = (easing: EasingFunction) => {
    return (duration: number) => {
        return (targetValue: number) => {
            return {
                easing,
                duration,
                targetValue
            };
        };
    };
};

// HIGHER-ORDER FUNCTION
export function withLogging<T extends (...args: any[]) => any>(func: T): T {
    return ((...args: Parameters<T>) => {
        console.log(`Calling ${func.name} with arguments:`, args);
        const result = func(...args);
        console.log(`Result:`, result);
        return result;
    }) as T;
}