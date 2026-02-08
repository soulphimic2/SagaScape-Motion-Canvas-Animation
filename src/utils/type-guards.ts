// src/utils/type-guards.ts
import { DictionaryEntry, Vector2D } from '../types';

// TYPE GUARD FUNCTION
export function isDictionaryEntry(obj: any): obj is DictionaryEntry {
    return (
        obj !== null &&
        typeof obj === 'object' &&
        typeof obj.word === 'string' &&
        Array.isArray(obj.definitions) &&
        obj.definitions.every((def: any) => typeof def === 'string')
    );
}

// TYPE GUARD for Vector2D
export function isVector2D(obj: any): obj is Vector2D {
    return (
        Array.isArray(obj) &&
        obj.length === 2 &&
        typeof obj[0] === 'number' &&
        typeof obj[1] === 'number'
    );
}

// ASSERTION FUNCTION
export function assertIsDictionaryEntry(obj: any): asserts obj is DictionaryEntry {
    if (!isDictionaryEntry(obj)) {
        throw new Error('Object is not a valid DictionaryEntry');
    }
}

// USER-DEFINED TYPE GUARD with GENERICS
export function hasProperty<T, K extends string>(
    obj: T,
    key: K
): obj is T & Record<K, any> {
    return obj !== null && typeof obj === 'object' && key in obj;
}