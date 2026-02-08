// test-types.ts (in project root)
import { DictionaryEntry, AppFeature } from './src/types';
import { DictionaryNode } from './src/classes/AnimatedDiagram';
import { isDictionaryEntry } from './src/utils/type-guards';

// Test 1: Using custom types
const testEntry: DictionaryEntry = {
    word: 'konungr',
    definitions: ['king', 'ruler'],
    language: 'Old Norse'
};

console.log('Test Entry:', testEntry.word);

// Test 2: Type guard
if (isDictionaryEntry(testEntry)) {
    console.log('✓ Type guard passed');
}

// Test 3: Custom class
const node = new DictionaryNode('test', [0, 0], 1000);
console.log('✓ Class instantiated:', node.render());

// Test 4: Conditional type
const feature: AppFeature = {
    name: 'TypeScript Migration',
    description: 'Convert JS to TS',
    status: 'live',
    since: new Date()
};

console.log('✓ Conditional type works:', feature.name, feature.status);

console.log('\n✅ All TypeScript tests passed!');