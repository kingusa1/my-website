
'use server';
/**
 * @fileOverview An AI agent that answers questions about Mohamed Ismail's CV using Pollinations.ai.
 * It tailors the CV data sent based on the page context to minimize request length
 * and guides users to the correct page for out-of-context questions.
 *
 * - askCvAgent - A function that handles questions about the CV.
 * - AskCvAgentInput - The input type for the askCvAgent function.
 * - AskCvAgentOutput - The return type for the askCvAgent function.
 */

import {cvData} from '@/lib/data';
import {z} from 'zod';

const AskCvAgentInputSchema = z.object({
  question: z.string().describe('The question asked by the user about the CV.'),
  contextType: z.enum(['cvPage', 'projectsPage', 'contactPage', 'general']).optional().default('general')
    .describe('The context from which the question is asked, to tailor the AI knowledge base.'),
});
export type AskCvAgentInput = z.infer<typeof AskCvAgentInputSchema>;

const AskCvAgentOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer based on the CV data.'),
});
export type AskCvAgentOutput = z.infer<typeof AskCvAgentOutputSchema>;


const getCvContextString = (contextType: 'cvPage' | 'projectsPage' | 'contactPage' | 'general' = 'general'): string => {
  const contextLines: string[] = [];

  contextLines.push(`Name: ${cvData.name}`);
  contextLines.push(`Title: ${cvData.title}`);

  if (contextType === 'cvPage') {
    contextLines.push(`Summary: ${cvData.summary.substring(0, 100)}${cvData.summary.length > 100 ? '...' : ''}`);
    contextLines.push(`Experience:\n${cvData.experience
      .map(exp => `- ${exp.title}, ${exp.subtitle} (${exp.date}).`)
      .join('\n')}`);
    contextLines.push(`Education:\n${cvData.education
      .map(edu => `- ${edu.title}, ${edu.subtitle} (${edu.date}).`)
      .join('\n')}`);
    
    const categorizedSkills: { [key: string]: string[] } = cvData.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill.name);
      return acc;
    }, {} as { [key: string]: string[] });

    contextLines.push(`Skills:\n${Object.entries(categorizedSkills)
      .map(([category, skills]) => `  - ${category}: ${skills.slice(0, 3).join(', ')}${skills.length > 3 ? ', etc.' : ''}`)
      .join('\n')}`);
    
    contextLines.push(`Language Skills:\n${cvData.languageSkills
      .map(lang => `  - ${lang.name}${lang.motherTongue ? ' (Native)' : ` (Proficiency: ${lang.listening || 'Competent'})`}`)
      .join('\n')}`);
    contextLines.push(`\nNote: This CV summary focuses on experience, education, and skills. For project details or full contact information, please navigate to the 'Projects' or 'Contact Me' pages and use the AI assistant there.`);

  } else if (contextType === 'projectsPage') {
    contextLines.push(`Brief Summary: ${cvData.summary.substring(0, 80)}${cvData.summary.length > 80 ? '...' : ''}`);
    contextLines.push(`Projects:\n${cvData.projects
      .map(proj => {
        const keyPoint = proj.summaryBullets && proj.summaryBullets.length > 0
          ? proj.summaryBullets[0].substring(0, 70) + (proj.summaryBullets[0].length > 70 ? "..." : "")
          : proj.description.substring(0, 70) + (proj.description.length > 70 ? "..." : "");
        return `- Project: ${proj.name} - Highlights: ${keyPoint}. Tech: ${proj.technologies.slice(0,2).join(', ')}${proj.technologies.length > 2 ? ', etc.' : ''}`;
      })
      .join('\n')}`);
    contextLines.push(`\nNote: This page focuses on project summaries. For detailed work history, education, or general skills, please navigate to the main 'CV' page and use the AI assistant there.`);
  
  } else if (contextType === 'contactPage') {
    contextLines.push(`Brief Summary: ${cvData.summary.substring(0, 80)}${cvData.summary.length > 80 ? '...' : ''}`);
    contextLines.push(`Contact Information:
Email: ${cvData.contact.email}
Phone: ${cvData.contact.phone}
LinkedIn: ${cvData.contact.linkedin}
GitHub: ${cvData.contact.github}
Address: ${cvData.contact.address}
Website: ${cvData.contact.website}`);
    contextLines.push(`\nNote: This page focuses on contact information. For work experience, project details, or skills, please navigate to the 'CV' or 'Projects' pages and use the AI assistant there.`);

  } else { // 'general' context - ultra-aggressive summarization
    contextLines.push(`Summary: ${cvData.summary.substring(0, 80)}${cvData.summary.length > 80 ? '...' : ''}`);
    contextLines.push(`Contact (Overview): Email: ${cvData.contact.email}, LinkedIn: ${cvData.contact.linkedin}`);
    contextLines.push(`Experience:\n${cvData.experience
      .map(exp => `- ${exp.title} (${exp.date}).`)
      .join('\n')}`);
    contextLines.push(`Education:\n${cvData.education
      .map(edu => `- ${edu.title} (${edu.date}).`)
      .join('\n')}`);
    
    const categorizedSkills: { [key: string]: string[] } = cvData.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill.name);
      return acc;
    }, {} as { [key: string]: string[] });
    contextLines.push(`Skills:\n${Object.entries(categorizedSkills)
      .map(([category, skills]) => `  - ${category}: ${skills.slice(0, 2).join(', ')}${skills.length > 2 ? ', etc.' : ''}`)
      .join('\n')}`);
      
    contextLines.push(`Projects:\n${cvData.projects
      .map(proj => {
        const keyPoint = proj.summaryBullets && proj.summaryBullets.length > 0
          ? proj.summaryBullets[0].substring(0, 50) + (proj.summaryBullets[0].length > 50 ? "..." : "")
          : proj.description.substring(0, 50) + (proj.description.length > 50 ? "..." : "");
        return `- Project: ${proj.name} - Key Point: ${keyPoint}`;
      })
      .join('\n')}`);
    contextLines.push(`Language Skills:\n${cvData.languageSkills
      .map(lang => `  - ${lang.name}${lang.motherTongue ? ' (Native)' : ''}`)
      .join('\n')}`);
  }
  return contextLines.join('\n\n');
};

export async function askCvAgent(input: AskCvAgentInput): Promise<AskCvAgentOutput> {
  const cvContextString = getCvContextString(input.contextType);
  
  let specificGuidance = "";
  const baseInstruction = `You are Mohamed Ismail's AI assistant. Answer questions using ONLY the CV data provided for the current page context: ${input.contextType}. Be concise. If information isn't in the provided data for this page, clearly state that.`;

  if (input.contextType === 'cvPage') {
      specificGuidance = "This page covers Experience, Education, and Skills. If asked about specific Project details or direct Contact methods, please tell the user to visit the 'Projects' or 'Contact Me' pages respectively and use the AI assistant available there.";
  } else if (input.contextType === 'projectsPage') {
      specificGuidance = "This page covers Projects. If asked about detailed Work Experience, Education, or general Skills, please tell the user to visit the main 'CV' page and use the AI assistant there.";
  } else if (input.contextType === 'contactPage') {
      specificGuidance = "This page covers Contact Information. If asked about Work Experience, Project details, or Skills, please tell the user to visit the 'CV' or 'Projects' pages and use the AI assistant there.";
  }
  
  const finalSystemPrompt = `${baseInstruction} ${specificGuidance}`;
  
  const fullPromptForAI = `${finalSystemPrompt}\n\nCV Information (Context: ${input.contextType}):\n${cvContextString}\n\nUser Question: ${input.question}\n\nAI Answer:`;

  const encodedPrompt = encodeURIComponent(fullPromptForAI);
  const POLLINATIONS_API_URL = `https://pollinations.ai/p/${encodedPrompt}`;

  const MAX_URL_LENGTH = 1800; // A bit more conservative to allow for question length
  if (POLLINATIONS_API_URL.length > MAX_URL_LENGTH) {
      console.error(`Pollinations API URL length is ${POLLINATIONS_API_URL.length} (Max approx ${MAX_URL_LENGTH}). This EXCEEDS typical limits for context '${input.contextType}'. The CV data cannot be simplified much further for this AI service. Consider a different AI backend.`);
      return { answer: "I'm sorry, but the request to the AI assistant was too long, even after maximum simplification of the CV data for this section. This AI service has strict limitations. A different AI approach might be needed if this issue continues." };
  } else if (POLLINATIONS_API_URL.length > 1500) {
       console.warn(`Pollinations API URL length is ${POLLINATIONS_API_URL.length} (Max approx ${MAX_URL_LENGTH}). This is very close to limits for context '${input.contextType}'.`);
  }

  try {
    const fetchResponse = await fetch(POLLINATIONS_API_URL, {
      method: 'GET', 
    });

    const responseText = await fetchResponse.text();
    // console.log('Raw response from Pollinations.ai:', responseText);

    if (!fetchResponse.ok) {
      console.error(`Pollinations API error: ${fetchResponse.status} ${fetchResponse.statusText}`, responseText);
      if (fetchResponse.status === 431 || fetchResponse.status === 414) { 
        return { answer: "I'm sorry, but the request to the AI assistant was too long, even after maximum simplification of the CV data for this section. This AI service has strict limitations. A different AI approach might be needed if this issue continues." };
      }
      return { answer: `Sorry, there was an error contacting the AI assistant (Status: ${fetchResponse.status}). Please try again.` };
    }

    try {
      const fluxAsciiMatch = responseText.match(/fluxASCII(\{.*\})/s);
      if (fluxAsciiMatch && fluxAsciiMatch[1]) {
        const jsonData = JSON.parse(fluxAsciiMatch[1]);
        if (jsonData && jsonData.prompt) {
          let aiTextResponse = jsonData.prompt;
          const originalPromptStartMarker = "You are Mohamed Ismail's AI assistant."; // Match our new base instruction
          const originalPromptIndex = aiTextResponse.indexOf(originalPromptStartMarker);
          
          if (originalPromptIndex > 0) {
            return { answer: aiTextResponse.substring(0, originalPromptIndex).trim() };
          } else if (originalPromptIndex === 0) {
            const answerMarker = "AI Answer:";
            const answerIndex = aiTextResponse.lastIndexOf(answerMarker);
            if (answerIndex !== -1) {
                const potentialAnswer = aiTextResponse.substring(answerIndex + answerMarker.length).trim();
                if (potentialAnswer && !potentialAnswer.startsWith(originalPromptStartMarker)) return { answer: potentialAnswer };
            }
            return { answer: "The AI assistant returned the input prompt or an unparseable response. Please try rephrasing your question." };
          }
          return { answer: aiTextResponse.trim() || "Received a structured response, but couldn't isolate a clear answer." };
        }
      }
    } catch (parseError) {
      // console.warn('Failed to parse fluxASCII JSON from Pollinations, falling back to raw text:', parseError);
      const cleanText = responseText.replace(/[^\x20-\x7E\s]+/g, "").trim();
      if (cleanText) {
        if (cleanText.includes("You are Mohamed Ismail's AI assistant.") && cleanText.includes(`User Question: ${input.question}`)) {
            const answerMarker = "AI Answer:";
            const answerIndex = cleanText.lastIndexOf(answerMarker);
            if (answerIndex !== -1) {
                const potentialAnswer = cleanText.substring(answerIndex + answerMarker.length).trim();
                if (potentialAnswer && !potentialAnswer.startsWith("You are Mohamed Ismail's AI assistant.")) {
                    return { answer: potentialAnswer };
                }
            }
             return { answer: "The AI's response seems to be an echo of the input, or contained unparseable characters. Please try rephrasing."};
        }
        return { answer: cleanText };
      }
    }
    
    const trimmedResponse = responseText.trim().replace(/[^\x20-\x7E\s]+/g, "");
    if (trimmedResponse) {
        if (trimmedResponse.includes("You are Mohamed Ismail's AI assistant.") && trimmedResponse.includes(`User Question: ${input.question}`)) {
            const answerMarker = "AI Answer:";
            const answerIndex = trimmedResponse.lastIndexOf(answerMarker); 
            if (answerIndex !== -1) {
                const potentialAnswer = trimmedResponse.substring(answerIndex + answerMarker.length).trim();
                if (potentialAnswer && !potentialAnswer.startsWith("You are Mohamed Ismail's AI assistant.")) {
                    return { answer: potentialAnswer };
                }
            }
             return { answer: "The AI's response seems to be an echo of the input. Please try rephrasing."};
        }
        return { answer: trimmedResponse };
    }

    return { answer: "Sorry, I couldn't get a clear answer from the AI. The response was empty or unparseable." };

  } catch (error: any) {
    console.error('Error calling Pollinations AI for CV agent:', error);
    let errorMessage = 'An unexpected error occurred while contacting the AI assistant.';
    if (error.message) {
      errorMessage = `An error occurred: ${error.message}`;
    }
    if (error.message && (error.message.includes('fetch failed') || error.message.includes('NetworkError'))) {
        errorMessage = "A network error occurred while trying to reach the AI assistant. Please check your internet connection and try again.";
    }
    return { answer: errorMessage };
  }
}
