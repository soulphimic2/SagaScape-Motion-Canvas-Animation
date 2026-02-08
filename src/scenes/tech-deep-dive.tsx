// src/scenes/tech-deep-dive.ts - COMPLETE UPDATED VERSION
import { Txt, Rect, Node, makeScene2D, Layout, Line } from '@motion-canvas/2d';
import { all, createRef, waitFor, linear, easeInOutCubic } from '@motion-canvas/core';
import { CodeVisualizer, ICodeSnippet } from '../classes/CodeVisualizer';
import { AppFeature, AnimationType, DictionaryEntry } from '../types';
import { createAnimation, withLogging } from '../utils/animation-helpers';

export default makeScene2D(function* (view) {
    // Refs for scene elements
    const title = createRef<Txt>();
    const codePanel = createRef<Rect>();
    const featurePanel = createRef<Rect>();
    const animationDemo = createRef<Txt>();
    const typeStats = createRef<Txt>();

    // Create and configure CodeVisualizer
    const codeVisualizer = new CodeVisualizer();

    // Add code snippets using our interface
    const snippets: ICodeSnippet[] = [
        { name: 'Dictionary Interface', lines: 25, language: 'typescript' },
        { name: 'AnimatedDiagram Class', lines: 85, language: 'typescript' },
        { name: 'Type Guards', lines: 35, language: 'typescript' },
        { name: 'Animation Helpers', lines: 42, language: 'typescript' }
    ];

    // Add all snippets to visualizer
    snippets.forEach(snippet => codeVisualizer.addSnippet(snippet));

    // Get data from visualizer (using the methods)
    const allSnippets = codeVisualizer.getSnippets();
    const tsCount = codeVisualizer.getTypeScriptCount();
    const totalLines = codeVisualizer.getTotalLines();

    // App features using our CONDITIONAL TYPE
    const features: AppFeature[] = [
        {
            name: 'TypeScript Interfaces',
            description: 'Strongly-typed data structures',
            status: 'live',
            since: new Date('2024-01-15')
        },
        {
            name: 'Generic Classes',
            description: 'Reusable components with type parameters',
            status: 'live',
            since: new Date('2024-01-16')
        },
        {
            name: 'Discriminated Unions',
            description: 'Type-safe animation configurations',
            status: 'development',
            eta: new Date('2024-01-25')
        },
        {
            name: 'Type Guards',
            description: 'Runtime type validation',
            status: 'live',
            since: new Date('2024-01-17')
        }
    ];

    // Create scene elements
    view.add(
        <>
            {/* Title */}
            <Txt
                ref={title}
                text="Technical Architecture"
                fontSize={64}
                fill="#ffffff"
                y={-350}
                opacity={0}
            />

            {/* Code Panel */}
            <Rect
                ref={codePanel}
                width={800}
                height={500}
                fill="#1f2937"
                radius={20}
                x={-400}
                y={0}
                opacity={0}
                scale={0.9}
                shadowColor="#000000"
                shadowBlur={30}
            >
                <Txt
                    text="TypeScript Implementation"
                    fontSize={32}
                    fill="#60a5fa"
                    y={-200}
                />
            </Rect>

            {/* Features Panel */}
            <Rect
                ref={featurePanel}
                width={800}
                height={500}
                fill="#1f2937"
                radius={20}
                x={400}
                y={0}
                opacity={0}
                scale={0.9}
                shadowColor="#000000"
                shadowBlur={30}
            >
                <Txt
                    text="Key Features"
                    fontSize={32}
                    fill="#60a5fa"
                    y={-200}
                />
            </Rect>

            {/* Animation Demo Text */}
            <Txt
                ref={animationDemo}
                text=""
                fontSize={36}
                fill="#f472b6"
                y={280}
                opacity={0}
            />

            {/* Type Stats Text */}
            <Txt
                ref={typeStats}
                text=""
                fontSize={28}
                fill="#34d399"
                y={400}
                opacity={0}
            />
        </>
    );

    // ANIMATION SEQUENCE

    // 1. Title animation
    yield* title().opacity(1, 0.8);
    yield* title().y(-300, 0.6, easeInOutCubic);

    // 2. Panels animation
    yield* all(
        codePanel().opacity(1, 1),
        codePanel().scale(1, 0.8, easeInOutCubic),
        featurePanel().opacity(1, 1),
        featurePanel().scale(1, 0.8, easeInOutCubic)
    );

    // 3. Show code snippets using CodeVisualizer
    yield* waitFor(0.5);

    // Create visualizations for all snippets
    const snippetVisuals = codeVisualizer.createVisualizations();
    const snippetYPositions = [-120, -40, 40, 120];

    // Position and add snippet visualizations
    snippetVisuals.forEach((visual, index) => {
        visual.position.y(snippetYPositions[index]);
        visual.position.x(-400);
        visual.opacity(0);
        view.add(visual);
    });

    // Animate snippets with delay
    for (let i = 0; i < snippetVisuals.length; i++) {
        yield* all(
            snippetVisuals[i].opacity(1, 0.5),
            snippetVisuals[i].position.x(-250, 0.6, easeInOutCubic)
        );
        yield* waitFor(0.2);
    }

    // 4. Show language badges
    yield* waitFor(0.5);

    const badgeRefs = snippets.map((snippet, index) => {
        const badge = createRef<Rect>();
        const badgeText = createRef<Txt>();

        view.add(
            <Rect
                ref={badge}
                width={140}
                height={40}
                fill={snippet.language === 'typescript' ? '#3178c6' : '#f1f5f9'}
                radius={20}
                x={-400}
                y={snippetYPositions[index]}
                opacity={0}
                scale={0}
            >
                <Txt
                    ref={badgeText}
                    text={snippet.language}
                    fontSize={20}
                    fill="#ffffff"
                />
            </Rect>
        );

        return { badge, badgeText };
    });

    // Animate badges
    for (let i = 0; i < badgeRefs.length; i++) {
        yield* all(
            badgeRefs[i].badge().opacity(1, 0.4),
            badgeRefs[i].badge().scale(1, 0.4),
            badgeRefs[i].badge().x(-100, 0.4, easeInOutCubic)
        );
        yield* waitFor(0.15);
    }

    // 5. Show features using createFeatureVisualization method
    yield* waitFor(0.8);

    const featureYPositions = [-120, -40, 40, 120];
    const featureVisuals: Txt[] = [];

    // Create visualizations for each feature
    features.forEach((feature, index) => {
        const featureVisual = codeVisualizer.createFeatureVisualization(feature);
        featureVisual.position.y(featureYPositions[index]);
        featureVisual.position.x(400);
        featureVisual.opacity(0);
        view.add(featureVisual);
        featureVisuals.push(featureVisual);
    });

    // Add feature descriptions
    const featureDescRefs = features.map((feature, index) => {
        const desc = createRef<Txt>();
        view.add(
            <Txt
                ref={desc}
                text={feature.description}
                fontSize={18}
                fill="#d1d5db"
                x={400}
                y={featureYPositions[index] + 35}
                opacity={0}
            />
        );
        return desc;
    });

    // Animate features and descriptions
    for (let i = 0; i < featureVisuals.length; i++) {
        yield* all(
            featureVisuals[i].opacity(1, 0.5),
            featureVisuals[i].position.x(250, 0.6, easeInOutCubic),
            featureDescRefs[i]().opacity(1, 0.5),
            featureDescRefs[i]().x(250, 0.6, easeInOutCubic)
        );
        yield* waitFor(0.25);
    }

    // 6. Demonstrate animation types
    yield* waitFor(1);

    // Update animation demo text
    animationDemo().text("Animation Types: Fade | Slide | Scale | Rotate");
    yield* animationDemo().opacity(1, 0.6);

    // Create animation type indicators
    const animationTypes = ['Fade', 'Slide', 'Scale', 'Rotate'];
    const animationColors = ['#f472b6', '#c084fc', '#60a5fa', '#34d399'];

    const animationIndicators = animationTypes.map((type, index) => {
        const indicator = createRef<Rect>();
        const indicatorText = createRef<Txt>();

        view.add(
            <>
                <Rect
                    ref={indicator}
                    width={120}
                    height={50}
                    fill={animationColors[index]}
                    radius={10}
                    x={-300 + index * 200}
                    y={340}
                    opacity={0}
                    scale={0}
                />
                <Txt
                    ref={indicatorText}
                    text={type}
                    fontSize={22}
                    fill="#ffffff"
                    x={-300 + index * 200}
                    y={340}
                    opacity={0}
                />
            </>
        );

        return { indicator, indicatorText };
    });

    // Animate indicators
    for (let i = 0; i < animationIndicators.length; i++) {
        yield* all(
            animationIndicators[i].indicator().opacity(1, 0.4),
            animationIndicators[i].indicator().scale(1, 0.4),
            animationIndicators[i].indicatorText().opacity(1, 0.4)
        );
        yield* waitFor(0.15);
    }

    // 7. Show statistics using CodeVisualizer methods
    yield* waitFor(1);

    // Create summary visualization
    const summaryVisual = codeVisualizer.createSummaryVisualization();
    summaryVisual.position.y(400);
    summaryVisual.opacity(0);
    view.add(summaryVisual);

    // Update type stats text
    typeStats().text(`TypeScript Features: ${features.length} types, ${snippets.length} interfaces`);
    yield* all(
        typeStats().opacity(1, 0.6),
        summaryVisual.opacity(1, 0.6)
    );

    // 8. Add connecting lines between concepts
    yield* waitFor(0.5);

    const connectionLines = [
        createRef<Line>(),
        createRef<Line>(),
        createRef<Line>()
    ];

    // Lines connecting code panel to features
    view.add(
        <>
            <Line
                ref={connectionLines[0]}
                points={[
                    [-150, -120],
                    [150, -120]
                ]}
                stroke="#4b5563"
                lineWidth={3}
                lineDash={[20, 10]}
                end={0}
            />
            <Line
                ref={connectionLines[1]}
                points={[
                    [-150, 40],
                    [150, 40]
                ]}
                stroke="#4b5563"
                lineWidth={3}
                lineDash={[20, 10]}
                end={0}
            />
            <Line
                ref={connectionLines[2]}
                points={[
                    [-100, 200],
                    [100, 280]
                ]}
                stroke="#4b5563"
                lineWidth={3}
                lineDash={[20, 10]}
                end={0}
            />
        </>
    );

    // Animate lines drawing
    yield* all(
        connectionLines[0]().end(1, 0.8),
        connectionLines[1]().end(1, 0.8),
        connectionLines[2]().end(1, 0.8)
    );

    // 9. Final emphasis on TypeScript usage
    yield* waitFor(1);

    const typescriptEmphasis = createRef<Txt>();
    view.add(
        <Txt
            ref={typescriptEmphasis}
            text={`✓ ${tsCount}/${snippets.length} snippets are TypeScript`}
            fontSize={32}
            fill="#22d3ee"
            y={450}
            opacity={0}
        />
    );

    yield* typescriptEmphasis().opacity(1, 0.6);

    // 10. Pulse animation on panels
    yield* waitFor(1);

    yield* all(
        codePanel().fill('#2d3748', 0.3).to('#1f2937', 0.3),
        featurePanel().fill('#2d3748', 0.3).to('#1f2937', 0.3)
    );

    // Hold scene for viewing
    yield* waitFor(4);
});