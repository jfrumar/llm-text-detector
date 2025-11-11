'use client'

import { Sparkles } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

interface Props {
    onSelectSample: (text: string) => void;
}

const truncateText = (text: string, maxLength: number = 80): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
};

const SAMPLE_TEXTS = [
    {
        label: 'Generic Inspiration (Overly Polished, Vague)',
        text: 'Success is not defined by what we achieve, but by how we respond to the challenges along the way. Every obstacle is an opportunity to grow, and every failure is simply a lesson in disguise.',
    },
    {
        label: 'Corporate Tone (Fluent but Hollow)',
        text: 'Our organization remains committed to driving innovation through strategic alignment and cross-functional collaboration. By leveraging emerging technologies, we aim to enhance stakeholder value and deliver sustainable growth.',
    },
    {
        label: 'Fake Personal Reflection',
        text: 'I remember when I first realized the importance of self-discipline. It wasn’t easy, but through consistent effort and a positive mindset, I learned that success comes to those who stay focused.',
    },
    {
        label: 'AI Chat Style',
        text: 'As an AI language model, I don’t have feelings, but I can understand why someone might experience joy when they accomplish a difficult task. Emotions like pride and satisfaction are integral to human motivation.',
    },
];

export default function SampleTextOptions({ onSelectSample }: Props) {
    return (
        <div className="w-full mb-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="samples" className="border-none">
                    <AccordionTrigger className="cursor-pointer px-3 py-3 hover:no-underline hover:bg-slate-100 dark:hover:bg-slate-800/50">
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4 text-violet-800 dark:text-violet-300" />
                            <h3 className="text-sm font-semibold text-violet-800 dark:text-violet-300">
                                Try a sample:
                            </h3>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-4 p-3 pb-0 pt-0 gap-3">
                            {SAMPLE_TEXTS.map((sample, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => onSelectSample(sample.text)}
                                    className="flex flex-col text-left p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-violet-300 dark:hover:border-violet-700 transition-all cursor-pointer group"
                                >
                                    <div className="font-semibold text-xs text-violet-800 dark:text-violet-300 mb-1.5">
                                        {sample.label}
                                    </div>
                                    <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
                                        {truncateText(sample.text)}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

