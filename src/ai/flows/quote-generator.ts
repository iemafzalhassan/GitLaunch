'use server';

/**
 * @fileOverview Generates personalized quotes for a README based on user details.
 *
 * - generateQuote - A function that generates a quote based on user input.
 * - QuoteGeneratorInput - The input type for the generateQuote function.
 * - QuoteGeneratorOutput - The return type for the generateQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuoteGeneratorInputSchema = z.object({
  name: z.string().describe('The name of the user.'),
  role: z
    .string()
    .describe(
      'The role of the user (e.g., student, working professional).'
    ),
  domain: z.string().describe('The domain of expertise (e.g., software engineering, data science).'),
  companyName: z.string().optional().describe('The name of the company (if applicable).'),
  collegeName: z.string().optional().describe('The name of the college (if applicable).'),
  techStack: z.string().describe('A comma-separated list of technologies the user is proficient in.'),
});
export type QuoteGeneratorInput = z.infer<typeof QuoteGeneratorInputSchema>;

const QuoteGeneratorOutputSchema = z.object({
  quote: z.string().describe('A personalized quote for the README.'),
});
export type QuoteGeneratorOutput = z.infer<typeof QuoteGeneratorOutputSchema>;

export async function generateQuote(input: QuoteGeneratorInput): Promise<QuoteGeneratorOutput> {
  return quoteGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'quoteGeneratorPrompt',
  input: {schema: QuoteGeneratorInputSchema},
  output: {schema: QuoteGeneratorOutputSchema},
  prompt: `You are an AI assistant specialized in generating personalized quotes for GitHub READMEs.

  Based on the following information about the user, generate a unique and inspiring quote that reflects their profile and expertise.

  Name: {{{name}}}
  Role: {{{role}}}
  Domain: {{{domain}}}
  Company: {{#if companyName}}{{{companyName}}}{{else}}N/A{{/if}}
  College: {{#if collegeName}}{{{collegeName}}}{{else}}N/A{{/if}}
  Tech Stack: {{{techStack}}}

  The quote should be concise, engaging, and suitable for display on a professional GitHub README.
  Focus on making the quote sound modern and inspirational, but make sure to include the tech stack as part of the quote.
  Also be sure to use the domain in the quote.
  Keep the quote to a maximum of 25 words.
  If the tech stack contains the word "AI" then the generated quote should be related to AI. If the tech stack contains words like "backend" or "frontend", the quote should relate to this area.
  If the user is a student or recent graduate, incorporate that aspect into the quote.
  DO NOT MENTION THAT YOU ARE AI.
`,
});

const quoteGeneratorFlow = ai.defineFlow(
  {
    name: 'quoteGeneratorFlow',
    inputSchema: QuoteGeneratorInputSchema,
    outputSchema: QuoteGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
