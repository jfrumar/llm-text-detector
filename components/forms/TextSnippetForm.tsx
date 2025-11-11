'use client'

import { useActionState } from "react";
import { ClipboardPaste, Bot } from "lucide-react";
import { Button } from "../ui/button";
import { FieldGroup, FieldSet, Field } from "../ui/field";
import { Textarea } from "../ui/textarea";

import type { analyzeText } from '@/app/actions';

interface Props {
    action: typeof analyzeText;
}

export default function TextSnippetForm({ action }: Props) {
    const [state, formAction, pending] = useActionState(action, null);

    return (
        <form action={formAction} className="w-full border rounded-lg min-w-48">
            <div className="mb-5 border-b py-3 px-4">
                <div className="flex gap-2 items-center">
                    <ClipboardPaste className="size-4" />
                    <h2 className="font-semibold text-lg ">Paste Your Text</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                    Enter the text you want to analyze for AI generation patterns
                </p>
            </div>

            <FieldGroup className="p-4 py-0">
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <Textarea
                                id="checkout-7j9-optional-comments"
                                name="textSnippet"
                                placeholder="Paste your text here for AI detection analysis..."
                                className="h-64"
                                defaultValue={state?.values.textSnippet}
                            />
                        </Field>
                    </FieldGroup>
                </FieldSet>
                <Field orientation="horizontal" className="pb-4">
                    <Button type="submit" className="bg-linear-to-r from-violet-500 to-blue-500 hover:outline-violet-400 transition outline-solid outline-2 outline-offset-1 outline-violet-200 active:bg-violet-500 active:bg-none cursor-pointer" disabled={pending}>
                        <Bot />
                        {pending ? 'Submitting...' : 'Submit'}
                    </Button>
                    <Button variant="outline" type="button">
                        Cancel
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )
}