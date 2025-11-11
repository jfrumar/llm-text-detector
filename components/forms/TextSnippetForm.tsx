'use client'

import { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Bot, ClipboardPaste } from "lucide-react";

import type { analyzeText } from '@/app/actions/analyzeText';
import { Spinner } from "@/components/ui/spinner";
import SampleTextOptions from "@/components/SampleTextOptions";

type ActionState = Awaited<ReturnType<typeof analyzeText>>;

interface Props {
    formAction: (formData: FormData) => void;
    state: ActionState;
    pending: boolean;
}

export default function TextSnippetForm({ formAction, state, pending }: Props) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSampleSelect = (text: string) => {
        if (textareaRef.current) {
            textareaRef.current.value = text;
            // Trigger input event to ensure form state is updated
            textareaRef.current.dispatchEvent(new Event('input', { bubbles: true }));
        }
    };

    return (
        <div className="w-full">
            <form action={formAction} className="border w-full rounded-lg min-w-48">
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

                <FieldGroup className="p-4 py-0">
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <Textarea
                                    ref={textareaRef}
                                    name="textSnippet"
                                    placeholder="Paste your text here for AI detection analysis..."
                                    className="resize-y min-h-24 max-h-60"
                                    defaultValue={state?.values.textSnippet}
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <Field orientation="horizontal" className="pb-4">
                        <Button type="submit" className="bg-linear-to-r from-violet-500 to-blue-500 hover:outline-violet-400 transition outline-solid outline-2 outline-offset-1 outline-violet-200 active:bg-violet-500 active:bg-none cursor-pointer" disabled={pending}>
                            {pending ? <Spinner /> : <Bot />}
                            {pending ? 'Submitting...' : 'Submit'}
                        </Button>
                        <Button variant="outline" type="button">
                            Cancel
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    )
}