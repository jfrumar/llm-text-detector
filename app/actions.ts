'use server'

import z from "zod";

type ActionState = {
    errors?: { textSnippet?: string[] };
    values: { textSnippet: string };
    success?: boolean;
} | null;

export async function analyzeText(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const schema = z.object({
        textSnippet: z.string()
    });

    const formValues = {
        textSnippet: formData.get('textSnippet') as string,
    };

    const { success, error, data } = schema.safeParse({
        textSnippet: formData.get('textSnippet')
    });

    // Return early if the form data is invalid
    if (!success) {
        return {
            errors: z.flattenError(error).fieldErrors,
            values: formValues,
        };
    }

    // Process the text
    console.log(`Will process text: ${data.textSnippet}`);

    return {
        success: true,
        values: formValues,
    };
}