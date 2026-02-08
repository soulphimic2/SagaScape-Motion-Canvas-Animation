// src/classes/CodeVisualizer.ts - FINAL CORRECTED VERSION
import { Txt } from '@motion-canvas/2d';
import { AppFeature } from '../types';

// Interface for code snippets
export interface ICodeSnippet {
    name: string;
    lines: number;
    language: 'typescript' | 'javascript' | 'python' | 'other';
    content?: string;
}

export class CodeVisualizer {
    // Field can be readonly
    private readonly snippets: ICodeSnippet[] = [];

    constructor(snippets: ICodeSnippet[] = []) {
        this.snippets = snippets;
    }

    // Add a snippet
    addSnippet(snippet: ICodeSnippet): void {
        this.snippets.push(snippet);
    }

    // Get all snippets (FIXED: Now being used)
    getSnippets(): ICodeSnippet[] {
        return [...this.snippets];
    }

    // Get total lines of code
    getTotalLines(): number {
        return this.snippets.reduce((total, snippet) => total + snippet.lines, 0);
    }

    // Get TypeScript snippets count (FIXED: Now being used)
    getTypeScriptCount(): number {
        return this.snippets.filter(s => s.language === 'typescript').length;
    }

    // Check if a snippet is TypeScript
    isTypeScript(snippet: ICodeSnippet): boolean {
        return snippet.language === 'typescript';
    }

    // Create feature visualization (FIXED: Now being used)
    createFeatureVisualization(feature: AppFeature): Txt {
        const status = feature.status;
        let color: string;

        if (status === 'live') {
            color = '#10B981';
        } else if (status === 'development') {
            color = '#F59E0B';
        } else {
            color = '#6B7280';
        }

        // CORRECT: Txt constructor requires a config object
        return new Txt({
            text: `${feature.name}: ${status}`,
            fill: color,
            fontSize: 24
        });
    }

    // Create visualization for a single snippet
    createSnippetVisualization(snippet: ICodeSnippet, index: number): Txt {
        const languageColor = snippet.language === 'typescript' ? '#3178c6' :
            snippet.language === 'javascript' ? '#f1e05a' :
                snippet.language === 'python' ? '#3572A5' : '#6f42c1';

        // CORRECT: Pass config object to Txt constructor
        return new Txt({
            text: `${index + 1}. ${snippet.name} (${snippet.lines} lines)`,
            fill: languageColor,
            fontSize: 20
        });
    }

    // Create visualizations for all snippets (FIXED: Now being used)
    createVisualizations(): Txt[] {
        return this.snippets.map((snippet, index) =>
            this.createSnippetVisualization(snippet, index)
        );
    }

    // Create a summary visualization
    createSummaryVisualization(): Txt {
        const totalLines = this.getTotalLines();
        const tsCount = this.getTypeScriptCount();

        // CORRECT: Pass config object to Txt constructor
        return new Txt({
            text: `Total: ${this.snippets.length} snippets, ${totalLines} lines (${tsCount} TypeScript)`,
            fill: '#60a5fa',
            fontSize: 28
        });
    }
}