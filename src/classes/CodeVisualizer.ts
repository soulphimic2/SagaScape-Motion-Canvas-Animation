// src/classes/CodeVisualizer.ts
import { Txt } from '@motion-canvas/2d';
import { AppFeature } from '../types';

// Interface for code snippets
export interface ICodeSnippet {
    name: string;
    lines: number;
    language: 'typescript' | 'javascript' | 'python' | 'other';
    content?: string;
}

// CodeVisualizer class to manage and visualize code snippets and app features
export class CodeVisualizer {
    private readonly snippets: ICodeSnippet[] = [];

    // Initialize with optional snippets
    constructor(snippets: ICodeSnippet[] = []) {
        this.snippets = snippets;
    }

    // Add a snippet
    addSnippet(snippet: ICodeSnippet): void {
        this.snippets.push(snippet);
    }

    // Get all snippets
    getSnippets(): ICodeSnippet[] {
        return [...this.snippets];
    }

    // Get total lines of code
    getTotalLines(): number {
        return this.snippets.reduce((total, snippet) => total + snippet.lines, 0);
    }

    // Get TypeScript snippets count
    getTypeScriptCount(): number {
        return this.snippets.filter(s => s.language === 'typescript').length;
    }

    // Check if a snippet is TypeScript
    isTypeScript(snippet: ICodeSnippet): boolean {
        return snippet.language === 'typescript';
    }

    // Create feature visualization
    createFeatureVisualization(feature: AppFeature): Txt {
        const status = feature.status;
        let color: string;

        // Determine color based on feature status
        if (status === 'live') {
            color = '#10B981';
        } else if (status === 'development') {
            color = '#F59E0B';
        } else {
            color = '#6B7280';
        }

        // Txt constructor requires a config object
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

        // Pass config object to Txt constructor
        return new Txt({
            text: `${index + 1}. ${snippet.name} (${snippet.lines} lines)`,
            fill: languageColor,
            fontSize: 20
        });
    }

    // Create visualizations for all snippets
    createVisualizations(): Txt[] {
        return this.snippets.map((snippet, index) =>
            this.createSnippetVisualization(snippet, index)
        );
    }

    // Create a summary visualization
    createSummaryVisualization(): Txt {
        const totalLines = this.getTotalLines();
        const tsCount = this.getTypeScriptCount();

        // Pass config object to Txt constructor
        return new Txt({
            text: `Total: ${this.snippets.length} snippets, ${totalLines} lines (${tsCount} TypeScript)`,
            fill: '#60a5fa',
            fontSize: 28
        });
    }
}