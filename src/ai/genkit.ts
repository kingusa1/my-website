
import {genkit} from 'genkit';
// import {googleAI} from '@genkit-ai/googleai'; // Removed Google AI plugin import

export const ai = genkit({
  plugins: [
    // googleAI(), // Removed Google AI plugin
  ],
  // You can set a default model here if desired, e.g.:
  // model: 'googleai/gemini-1.5-flash-latest',
  // Or specify it in each ai.definePrompt or ai.generate call.
});
