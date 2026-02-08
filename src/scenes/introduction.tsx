// src/scenes/introduction.ts - CORRECTED VERSION
import { Txt, Rect, Circle, makeScene2D } from '@motion-canvas/2d';
import { all, createRef, waitFor, linear } from '@motion-canvas/core';
import { DictionaryNode } from '../classes/AnimatedDiagram';
import { DictionaryEntry } from '../types';

export default makeScene2D(function* (view) {
    // Refs for animation
    const title = createRef<Txt>();
    const subtitle = createRef<Txt>();
    const background = createRef<Rect>();
    const logo = createRef<Circle>();
    const author = createRef<Txt>();

    // Create dictionary node using our custom class
    const dictNode = new DictionaryNode('cleasby-vigfusson', [-400, 100], 35207);

    // Sample data using our TypeScript interfaces
    const sampleEntries: DictionaryEntry[] = [
        { word: 'maðr', definitions: ['man', 'person'], language: 'Old Norse' },
        { word: 'konungr', definitions: ['king'], language: 'Old Norse' },
        { word: 'saga', definitions: ['story', 'history'], language: 'Old Norse' }
    ];

    // Create scene elements
    view.add(
        <>
            {/* Background - FIXED: Use solid color instead of gradient */}
            <Rect
                ref={background}
                width={1920}
                height={1080}
                fill={'#1e1b4b'}  // Solid dark blue instead of gradient
                opacity={0}
            />

            {/* Animated logo */}
            <Circle
                ref={logo}
                width={300}
                height={300}
                fill={'#8b5cf6'}
                opacity={0}
                scale={0}
            />

            {/* Title */}
            <Txt
                ref={title}
                text="SagaScape"
                fontSize={120}
                fontFamily={'Helvetica, Arial, sans-serif'}
                fontWeight={800}
                fill={'#ffffff'}
                y={-100}
                opacity={0}
            />

            {/* Subtitle */}
            <Txt
                ref={subtitle}
                text="Old Norse Digital Study Environment"
                fontSize={42}
                fill={'#c7d2fe'}
                y={30}
                opacity={0}
            />

            {/* Author */}
            <Txt
                ref={author}
                text="CSE 310 Module 2: TypeScript Data Layer"
                fontSize={28}
                fill={'#a5b4fc'}
                y={350}
                opacity={0}
            />
        </>
    );

    // ANIMATION SEQUENCE

    // 1. Fade in background
    yield* background().opacity(1, 1.5);

    // 2. Logo animation
    yield* all(
        logo().opacity(1, 1),
        logo().scale(1, 1.5, linear)
    );

    // 3. Title animation with typing effect
    yield* waitFor(0.5);

    const titleText = title().text();
    title().text('');
    for (let i = 0; i <= titleText.length; i++) {
        title().text(titleText.substring(0, i));
        yield* waitFor(0.05);
    }

    yield* title().opacity(1, 0.5);

    // 4. Subtitle animation
    yield* subtitle().opacity(1, 0.8);

    // 5. Author text
    yield* author().opacity(1, 0.6);

    // 6. Show dictionary stats using our custom class
    yield* waitFor(1);

    const dictInfo = createRef<Txt>();
    view.add(
        <Txt
            ref={dictInfo}
            text={`${dictNode.render()}\n${sampleEntries.length} sample entries loaded`}
            fontSize={32}
            fill={'#d1d5db'}
            y={150}
            opacity={0}
        />
    );

    yield* dictInfo().opacity(1, 0.8);

    // 7. Animate sample entries
    yield* waitFor(1);

    const entryYPositions = [-50, 0, 50];
    const entryRefs = sampleEntries.map((entry, index) => {
        const entryText = createRef<Txt>();
        view.add(
            <Txt
                ref={entryText}
                text={`${entry.word} → ${entry.definitions.join(', ')}`}
                fontSize={28}
                fill={'#93c5fd'}
                x={-400}
                y={entryYPositions[index]}
                opacity={0}
            />
        );
        return entryText;
    });

    // Stagger entry animations
    for (let i = 0; i < entryRefs.length; i++) {
        yield* all(
            entryRefs[i]().opacity(1, 0.5),
            entryRefs[i]().x(0, 0.8)
        );
        yield* waitFor(0.3);
    }

    // 8. Module title reveal
    yield* waitFor(1);

    const moduleTitle = createRef<Txt>();
    view.add(
        <Txt
            ref={moduleTitle}
            text="TypeScript Data Layer Demonstration"
            fontSize={48}
            fill={'#fbbf24'}
            y={250}
            opacity={0}
            scale={0.8}
        />
    );

    yield* all(
        moduleTitle().opacity(1, 0.8),
        moduleTitle().scale(1, 0.8)
    );

    // Hold for next scene
    yield* waitFor(3);
});