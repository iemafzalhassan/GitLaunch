'use server';

import { generateQuote, QuoteGeneratorInput, QuoteGeneratorOutput } from '@/ai/flows/quote-generator';

export async function generateQuoteAction(input: QuoteGeneratorInput): Promise<QuoteGeneratorOutput> {
  try {
    const output = await generateQuote(input);
    return output;
  } catch (error) {
    console.error('Error generating quote:', error);
    return { quote: '' };
  }
}
