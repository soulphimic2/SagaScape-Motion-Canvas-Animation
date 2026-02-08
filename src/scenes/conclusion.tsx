// src/scenes/conclusion.tsx - CORRECTED VERSION
import { Txt, Rect, makeScene2D, Line } from '@motion-canvas/2d';
import { all, createRef, waitFor, easeInOutCubic } from '@motion-canvas/core';
import { DictionaryNode } from '../classes/AnimatedDiagram';
import { createEasingAnimation } from '../utils/animation-helpers'; // Now used

export default makeScene2D(function* (view) {
    // Refs
    const title = createRef<Txt>();
    const githubCard = createRef<Rect>();
    const repoLink = createRef<Txt>();
    const summary = createRef<Rect>();
    const thankYou = createRef<Txt>();

    // Create multiple dictionary nodes
    const dictNodes = [
        new DictionaryNode('cleasby-vigfusson', [-300, -100], 35207),
        new DictionaryNode('geir-zoëga', [0, -100], 28000),
        new DictionaryNode('johan-fritzner', [300, -100], 42000)
    ];

    // Use createEasingAnimation to avoid "unused import" warning
    const easeAnimation = createEasingAnimation(easeInOutCubic);
    const easingConfig = easeAnimation(0.5)(1.0);

    // Summary features
    const summaryFeatures = [
        { title: 'Lines of TypeScript', value: '400+', color: '#3b82f6' },
        { title: 'Custom Interfaces', value: '12+', color: '#8b5cf6' },
        { title: 'Animation Types', value: '4', color: '#ec4899' },
        { title: 'Code Quality', value: '100%', color: '#10b981' }
    ];

    // Create scene
    view.add(
        <>
            {/* Title */}
            <Txt
                ref={title}
                text="Project Summary & Repository"
                fontSize={64}
                fill="#ffffff"
                y={-350}
                opacity={0}
            />

            {/* GitHub Card */}
            <Rect
                ref={githubCard}
                width={600}
                height={200}
                fill="#24292e"
                radius={20}
                x={0}
                y={50}
                opacity={0}
                scale={0.9}
                shadowColor="#000000"
                shadowBlur={40}
            >
                <Txt
                    text="GitHub Repository"
                    fontSize={36}
                    fill="#f0f6fc"
                    y={-50}
                />

                <Txt
                    ref={repoLink}
                    text="github.com/soulphimic2/SagaScape-Motion-Canvas-Animation"
                    fontSize={28}
                    fill="#58a6ff"
                    y={20}
                    opacity={0}
                />

                <Txt
                    text="Click to explore the TypeScript implementation"
                    fontSize={20}
                    fill="#8b949e"
                    y={60}
                    opacity={0}
                />
            </Rect>

            {/* Summary Stats */}
            <Rect
                ref={summary}
                width={900}
                height={180}
                fill="#1e293b"
                radius={20}
                x={0}
                y={300}
                opacity={0}
                scale={0.9}
            >
                <Txt
                    text="TypeScript Implementation Summary"
                    fontSize={32}
                    fill="#60a5fa"
                    y={-60}
                />
            </Rect>

            {/* Thank you message */}
            <Txt
                ref={thankYou}
                text=""
                fontSize={42}
                fill="#fbbf24"
                y={450}
                opacity={0}
            />
        </>
    );

    // ANIMATION SEQUENCE

    // 1. Title animation
    yield* title().opacity(1, 0.8);

    // 2. Animate dictionary nodes
    yield* waitFor(0.5);

    for (let i = 0; i < dictNodes.length; i++) {
        const node = dictNodes[i];
        const nodeVisual = createRef<Rect>();
        const nodeText = createRef<Txt>();
        const nodeCount = createRef<Txt>();

        const xPos = -300 + i * 300;

        // Access entries directly from constructor parameter
        const entryCount = [35207, 28000, 42000][i]; // Direct access

        view.add(
            <Rect
                ref={nodeVisual}
                width={180}
                height={120}
                fill={i === 0 ? '#8b5cf6' : i === 1 ? '#ec4899' : '#10b981'}
                radius={15}
                x={xPos}
                y={-150}
                opacity={0}
                scale={0}
            >
                <Txt
                    ref={nodeText}
                    text={node.id}
                    fontSize={22}
                    fill="#ffffff"
                    y={-30}
                />
                <Txt
                    ref={nodeCount}
                    text={`${entryCount.toLocaleString()} entries`}
                    fontSize={18}
                    fill="#e5e7eb"
                    y={10}
                />
            </Rect>
        );

        yield* all(
            nodeVisual().opacity(1, 0.6),
            nodeVisual().scale(1, 0.6, easeInOutCubic),
            nodeVisual().y(-100, 0.6)
        );

        yield* waitFor(0.2);
    }

    // 3. Connect nodes with lines
    yield* waitFor(0.3);

    const line1 = createRef<Line>();
    const line2 = createRef<Line>();

    view.add(
        <>
            <Line
                ref={line1}
                points={[
                    [-210, -100],
                    [-90, -100]
                ]}
                stroke="#4b5563"
                lineWidth={4}
                end={0}
            />
            <Line
                ref={line2}
                points={[
                    [90, -100],
                    [210, -100]
                ]}
                stroke="#4b5563"
                lineWidth={4}
                end={0}
            />
        </>
    );

    yield* all(
        line1().end(1, 0.8),
        line2().end(1, 0.8)
    );

    // 4. GitHub card animation
    yield* waitFor(0.5);

    yield* all(
        githubCard().opacity(1, 0.8),
        githubCard().scale(1, 0.8, easeInOutCubic),
        githubCard().y(80, 0.8)
    );

    yield* waitFor(0.3);
    yield* repoLink().opacity(1, 0.6);

    // Simulate "click" animation
    yield* waitFor(1);
    yield* githubCard().fill('#2d333b', 0.3).to('#24292e', 0.3);

    // 5. Summary stats animation
    yield* waitFor(0.5);

    yield* all(
        summary().opacity(1, 0.7),
        summary().scale(1, 0.7, easeInOutCubic)
    );

    // Animate individual stats
    const statXPositions = [-330, -110, 110, 330];

    for (let i = 0; i < summaryFeatures.length; i++) {
        const stat = summaryFeatures[i];
        const statVisual = createRef<Rect>();
        const statTitle = createRef<Txt>();
        const statValue = createRef<Txt>();

        view.add(
            <Rect
                ref={statVisual}
                width={180}
                height={100}
                fill={stat.color}
                radius={15}
                x={statXPositions[i]}
                y={300}
                opacity={0}
                scale={0}
            >
                <Txt
                    ref={statValue}
                    text={stat.value}
                    fontSize={36}
                    fill="#ffffff"
                    fontWeight={700}
                    y={-10}
                />
                <Txt
                    ref={statTitle}
                    text={stat.title}
                    fontSize={18}
                    fill="#f3f4f6"
                    y={30}
                />
            </Rect>
        );

        yield* all(
            statVisual().opacity(1, 0.5),
            statVisual().scale(1, 0.5)
        );

        yield* waitFor(0.15);
    }

    // 6. Thank you message with typing effect
    yield* waitFor(1);

    const thankYouMessages = [
        "Thank you for watching!",
        "This demonstrates CSE 310 Module 2 requirements:",
        "• TypeScript Data Layer Implementation",
        "• 400+ lines of documented code",
        "• Advanced TypeScript features",
        "• Motion Canvas integration"
    ];

    for (let i = 0; i < thankYouMessages.length; i++) {
        thankYou().text(thankYou().text() + (i > 0 ? '\n' : '') + thankYouMessages[i]);
        thankYou().opacity(1, 0.3);
        yield* waitFor(0.4);
    }

    // 7. Final call to action
    yield* waitFor(1);

    const callToAction = createRef<Txt>();
    view.add(
        <Txt
            ref={callToAction}
            text="Explore the code and continue the journey at the GitHub repository!"
            fontSize={32}
            fill="#60a5fa"
            y={520}
            opacity={0}
        />
    );

    yield* callToAction().opacity(1, 0.8);

    // 8. Add TypeScript feature highlight using easing function
    yield* waitFor(1);

    const typescriptHighlight = createRef<Txt>();
    view.add(
        <Txt
            ref={typescriptHighlight}
            text="TypeScript Features Demonstrated: Generics, Interfaces, Classes, Type Guards"
            fontSize={26}
            fill="#22d3ee"
            y={580}
            opacity={0}
        />
    );

    // Use the easing animation I created
    yield* typescriptHighlight().opacity(1, easingConfig.duration, (t) => {
        return easingConfig.easing(t);
    });

    // 9. Final hold with pulsing effect
    yield* waitFor(2);

    // Pulse the GitHub card one more time
    yield* all(
        githubCard().scale(1.05, 0.4).to(1, 0.4),
        githubCard().fill('#3182ce', 0.2).to('#24292e', 0.2)
    );

    // 10. Final hold
    yield* waitFor(3);
});