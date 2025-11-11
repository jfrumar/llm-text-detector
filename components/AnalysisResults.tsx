'use client'

import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { JSX } from "react";

interface AnalysisResult {
    analysis: {
        ai_likelihood: string;
        human_likelihood: string;
        reasoning: string;
    };
    annotated_text: string;
}

interface Props {
    result: AnalysisResult;
}

export default function AnalysisResults({ result }: Props) {
    const { analysis, annotated_text } = result;

    // Function to render annotated text with tags
    const renderAnnotatedText = (text: string) => {
        const parts: (string | JSX.Element)[] = [];
        let currentIndex = 0;

        // Combine both regex patterns - find all matches
        const allMatches: Array<{ start: number; end: number; type: 'ai' | 'human'; text: string }> = [];

        // Find all AI matches
        const aiMatches = Array.from(text.matchAll(/<ai>(.*?)<\/ai>/g));
        aiMatches.forEach(match => {
            if (match.index !== undefined) {
                allMatches.push({
                    start: match.index,
                    end: match.index + match[0].length,
                    type: 'ai',
                    text: match[1],
                });
            }
        });

        // Find all human matches
        const humanMatches = Array.from(text.matchAll(/<human>(.*?)<\/human>/g));
        humanMatches.forEach(match => {
            if (match.index !== undefined) {
                allMatches.push({
                    start: match.index,
                    end: match.index + match[0].length,
                    type: 'human',
                    text: match[1],
                });
            }
        });

        // Sort matches by start position
        allMatches.sort((a, b) => a.start - b.start);

        // Build parts array
        allMatches.forEach((match, index) => {
            // Add text before match
            if (match.start > currentIndex) {
                parts.push(text.substring(currentIndex, match.start));
            }

            // Add matched text with styling
            const key = `${match.type}-${index}`;
            if (match.type === 'ai') {
                parts.push(
                    <mark key={key} className="bg-red-200 dark:bg-red-900/30 px-1 rounded">
                        {match.text}
                    </mark>
                );
            } else {
                parts.push(
                    <mark key={key} className="bg-green-200 dark:bg-green-900/30 px-1 rounded">
                        {match.text}
                    </mark>
                );
            }

            currentIndex = match.end;
        });

        // Add remaining text
        if (currentIndex < text.length) {
            parts.push(text.substring(currentIndex));
        }

        return parts.length > 0 ? parts : text;
    };

    return (
        <div className="w-full border rounded-lg p-6 bg-white dark:bg-black space-y-6">
            <div className="border-b pb-4">
                <h2 className="font-semibold text-xl mb-4">Analysis Results</h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 rounded-lg border-2 border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20">
                        <div className="flex items-center gap-2 mb-2">
                            <XCircle className="size-5 text-red-600 dark:text-red-400" />
                            <h3 className="font-semibold text-red-900 dark:text-red-300">AI Likelihood</h3>
                        </div>
                        <p className="text-2xl font-bold text-red-700 dark:text-red-400">{analysis.ai_likelihood}</p>
                    </div>

                    <div className="p-4 rounded-lg border-2 border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-950/20">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="size-5 text-green-600 dark:text-green-400" />
                            <h3 className="font-semibold text-green-900 dark:text-green-300">Human Likelihood</h3>
                        </div>
                        <p className="text-2xl font-bold text-green-700 dark:text-green-400">{analysis.human_likelihood}</p>
                    </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-start gap-2">
                        <AlertCircle className="size-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-sm mb-1 text-slate-900 dark:text-slate-100">Reasoning</h4>
                            <p className="text-sm text-slate-700 dark:text-slate-300">{analysis.reasoning}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-lg mb-3">Annotated Text</h3>
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {renderAnnotatedText(annotated_text)}
                    </p>
                    <div className="mt-4 flex gap-4 text-xs text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                            <span className="inline-block w-3 h-3 bg-red-200 dark:bg-red-900/30 rounded"></span>
                            <span>AI-generated patterns</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="inline-block w-3 h-3 bg-green-200 dark:bg-green-900/30 rounded"></span>
                            <span>Human-written patterns</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

