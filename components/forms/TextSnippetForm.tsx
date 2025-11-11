'use client';

import { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Bot, ClipboardPaste } from "lucide-react";

import type { analyzeText } from '@/app/actions/analyzeText';
import { Spinner } from "@/components/ui/spinner";
import SampleTextOptions from "@/components/SampleTextOptions";

const MAX_LENGTH = 600;

type ActionState = Awaited<ReturnType<typeof analyzeText>>;

interface Props {
    formAction: (formData: FormData) => void;
    state: ActionState;
    pending: boolean;
}

export default function TextSnippetForm({ formAction, state, pending }: Props) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [characterCount, setCharacterCount] = useState(0);

    // Update character count when state changes (e.g., from sample selection or form errors)
    useEffect(() => {
        if (textareaRef.current) {
            setCharacterCount(textareaRef.current.value.length);
        }
    }, [state?.values.textSnippet]);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= MAX_LENGTH) {
            setCharacterCount(value.length);
        } else {
            // Prevent exceeding max length
            e.target.value = value.slice(0, MAX_LENGTH);
            setCharacterCount(MAX_LENGTH);
        }
    };

    const handleSampleSelect = (text: string) => {
        if (textareaRef.current) {
            const truncatedText = text.slice(0, MAX_LENGTH);
            textareaRef.current.value = truncatedText;
            setCharacterCount(truncatedText.length);
            // Trigger input event to ensure form state is updated
            textareaRef.current.dispatchEvent(new Event('input', { bubbles: true }));
        }
    };

    return (
        <div className="w-full">
            <form action={formAction} className="border w-full rounded-lg rounded-tl-none min-w-60">
                {state?.errors?.textSnippet && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                        {state.errors.textSnippet.map((error, index) => (
                            <p key={index} className="text-sm">{error}</p>
                        ))}
                    </div>
                )}
                <div className="py-3 px-4">
                    <div className="flex gap-2 items-center">
                        <ClipboardPaste className="size-4" />
                        <h2 className="font-semibold text-lg ">Paste Your Text</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Enter the text you want to analyze for AI generation patterns
                    </p>

                    <div className="mt-6">
                        <SampleTextOptions onSelectSample={handleSampleSelect} />
                    </div>
                </div>

                <FieldGroup className="p-4 py-0 gap-0">
                    <FieldSet>
                        <FieldGroup>
                            <Field className="gap-0">
                                <Textarea
                                    ref={textareaRef}
                                    name="textSnippet"
                                    placeholder="Paste your text here for AI detection analysis..."
                                    className="text-sm md:text-md resize-y min-h-24 max-h-60"
                                    defaultValue={state?.values.textSnippet}
                                    maxLength={MAX_LENGTH}
                                    onChange={handleInput}
                                />
                                <div className="mt-2 flex justify-end items-center gap-3">
                                    <span className={`text-xs ${characterCount >= MAX_LENGTH
                                        ? 'text-red-600 dark:text-red-400'
                                        : characterCount > MAX_LENGTH * 0.9
                                            ? 'text-orange-600 dark:text-orange-400'
                                            : 'text-muted-foreground'
                                        }`}>
                                        {characterCount} / {MAX_LENGTH} characters
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        type="button"
                                        onClick={() => {
                                            if (textareaRef.current) {
                                                textareaRef.current.value = '';
                                                setCharacterCount(0);
                                                // Trigger input event so any form state bound to the textarea updates
                                                textareaRef.current.dispatchEvent(new Event('input', { bubbles: true }));
                                            }
                                        }}
                                    >
                                        Clear
                                    </Button>
                                </div>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <Field orientation="horizontal" className="pb-4">
                        <Button type="submit" className="bg-linear-to-r from-violet-500 to-blue-500 hover:outline-violet-400 transition outline-solid outline-2 outline-offset-1 outline-violet-200 active:bg-violet-500 active:bg-none cursor-pointer dark:text-white dark:outline-white/30" disabled={pending}>
                            {pending ? <Spinner /> : <Bot />}
                            {pending ? 'Analyzing...' : 'Submit'}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
}