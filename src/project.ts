// src/project.ts - UPDATED
import { makeProject } from '@motion-canvas/core';
import introduction from './scenes/introduction?scene';
import example from './scenes/example?scene';
import techDeepDive from './scenes/tech-deep-dive?scene';
import conclusion from './scenes/conclusion?scene';

export default makeProject({
  scenes: [introduction, example, techDeepDive, conclusion],
});