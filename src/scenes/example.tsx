// src/scenes/example.tsx - Updated version
import { Circle, Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { all, createRef, waitFor } from '@motion-canvas/core';
import { DictionaryNode } from '../classes/AnimatedDiagram';
import { DictionaryEntry, AppFeature } from '../types';
import { isDictionaryEntry } from '../utils/type-guards';

export default makeScene2D(function* (view) {
  // DEMONSTRATE TYPE ANNOTATIONS
  const title = createRef<Txt>();
  const dictionaryCircle = createRef<Circle>();
  const progressBar = createRef<Rect>();

  // USE OUR CUSTOM TYPES
  const sampleEntry: DictionaryEntry = {
    word: 'maðr',
    definitions: ['man', 'person', 'human being'],
    language: 'Old Norse',
    phonetic: 'maðr'
  };

  // USE TYPE GUARD
  if (isDictionaryEntry(sampleEntry)) {
    console.log('Valid dictionary entry:', sampleEntry.word);
  }

  // USE OUR CUSTOM CLASS
  const dictNode = new DictionaryNode('cleasby-vigfusson', [-300, 0], 35207);
  console.log(dictNode.render());

  // DEMONSTRATE ADVANCED TYPES
  const features: AppFeature[] = [
    {
      name: 'TypeScript Data Layer',
      description: 'Strongly-typed data structures',
      status: 'live',
      since: new Date('2024-01-15')
    },
    {
      name: 'Multi-Dictionary Search',
      description: 'Search across Cleasby & Zoëga',
      status: 'development',
      eta: new Date('2024-02-28')
    }
  ];

  // SCENE ELEMENTS
  view.add(
      <>
        <Txt
            ref={title}
            text="SagaScape: Old Norse Study App"
            fontSize={48}
            fill="#FFFFFF"
            y={-200}
        />

        <Circle
            ref={dictionaryCircle}
            x={-300}
            width={140}
            height={140}
            fill="#8B5CF6"  // Using our DictionaryNode color
        />

        <Txt
            text="Cleasby & Vigfusson"
            fontSize={24}
            fill="#FFFFFF"
            x={-300}
            y={100}
        />

        <Txt
            text={`${dictNode.getMetrics().toLocaleString()} entries`}
            fontSize={18}
            fill="#D1D5DB"
            x={-300}
            y={130}
        />

        <Rect
            ref={progressBar}
            width={0}
            height={40}
            fill="#10B981"
            y={50}
            radius={20}
        />
      </>
  );

  // ANIMATION SEQUENCE
  yield* title().opacity(0, 0).to(1, 1);
  yield* dictionaryCircle().scale(1.5, 0.5).to(1, 0.5);

  yield* all(
      progressBar().width(600, 2),
      dictionaryCircle().position.x(300, 2),
      dictionaryCircle().fill('#EC4899', 1).to('#8B5CF6', 1)
  );

  // Show features list
  yield* waitFor(1);

  // Animate features appearing
  for (let i = 0; i < features.length; i++) {
    const feature = features[i];
    const statusColor = feature.status === 'live' ? '#10B981' :
        feature.status === 'development' ? '#F59E0B' : '#6B7280';

    const featureText = (
        <Txt
            text={`${feature.name} - ${feature.status}`}
            fontSize={28}
            fill={statusColor}
            y={-50 + i * 60}
            opacity={0}
        />
    );

    view.add(featureText);
    yield* featureText.opacity(1, 0.5);
    yield* waitFor(0.3);
  }

  yield* waitFor(2);
});