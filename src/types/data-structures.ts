// src/types/data-structures.ts

// GENERICS with CONSTRAINTS
export interface DictionaryEntry<T extends string = string> {
    word: T;
    definitions: Array<T>;
    language: 'Old Norse' | 'Old Icelandic' | 'Medieval Swedish';
    phonetic?: string;
}

// TUPLE TYPE for coordinates
export type Vector2D = [number, number];

// INTERSECTION TYPE combining features
export type StudyFeature = DictionaryEntry & {
    highlightColor: string;
    note: string;
    timestamp: Date;
};

// CONDITIONAL TYPE for feature status
export type FeatureStatus<T extends string> = T extends 'implemented'
    ? { status: 'live'; since: Date }
    : T extends 'planned'
        ? { status: 'development'; eta: Date }
        : { status: 'concept'; priority: number };

// Using the conditional type
export type AppFeature = {
    name: string;
    description: string;
} & FeatureStatus<'implemented' | 'planned' | 'concept'>;

// READONLY array example
export interface AppModule {
    name: string;
    dependencies: ReadonlyArray<string>;
}