'use server'

import { readFile } from 'fs/promises';
import { join } from 'path';
import OpenAI from 'openai';
import z from "zod";

type ActionState = {
    errors?: { textSnippet?: string[] };
    values: { textSnippet: string };
    success?: boolean;
    result?: {
        analysis: {
            ai_likelihood: string;
            human_likelihood: string;
            reasoning: string;
        };
        annotated_text: string;
    };
} | null;

export async function analyzeText(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const schema = z.object({
        textSnippet: z.string()
            .min(1, 'Text snippet is required')
            .max(600, 'Text snippet must be 600 characters or less')
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

    try {
        // Read the prompt template
        const promptPath = join(process.cwd(), 'app', 'prompts', 'textAnalysis.txt');
        const promptTemplate = await readFile(promptPath, 'utf-8');

        // Replace the placeholder with the actual text
        const prompt = promptTemplate.replace('{{TEXT_TO_ANALYZE}}', data.textSnippet);

        // Get API key from environment variables
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return {
                errors: { textSnippet: ['OPENAI_API_KEY environment variable is not set'] },
                values: formValues,
            };
        }

        // Initialize OpenAI client
        const client = new OpenAI({
            apiKey: apiKey,
        });

        // Call ChatGPT API using the official client
        const completion = await client.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.2,
        });

        const content = completion.choices[0]?.message?.content;

        if (!content) {
            throw new Error('No response content from OpenAI API');
        }

        // Parse the JSON response
        const analysisResult = JSON.parse(content);

        return {
            success: true,
            values: formValues,
            result: analysisResult,
        };
    } catch (error) {
        console.error('Error analyzing text:', error);
        return {
            errors: {
                textSnippet: [
                    error instanceof Error
                        ? error.message
                        : 'An error occurred while analyzing the text'
                ],
            },
            values: formValues,
        };
    }
}