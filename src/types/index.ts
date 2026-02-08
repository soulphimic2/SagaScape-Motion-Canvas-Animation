// src/types/index.ts
export * from './animation';
export * from './data-structures';

// Re-export with renaming
import { DictionaryEntry as DE } from './data-structures';
export { DE as DictionaryEntryModel };

// Type for our SagaScape animation project
export interface SagaScapeAnimation {
    title: string;
    scenes: Array<{
        name: string;
        duration: number;
        elements: string[];
    }>;
    totalDuration: number;
}