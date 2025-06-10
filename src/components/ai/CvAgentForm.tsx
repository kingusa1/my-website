
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Import the new specific agent functions
import { askCvMainAgent, type AskCvMainAgentInput, type AskCvMainAgentOutput } from '@/ai/flows/ask-cv-main-flow';
import { askCvProjectsAgent, type AskCvProjectsAgentInput, type AskCvProjectsAgentOutput } from '@/ai/flows/ask-cv-projects-flow';
import { askCvContactAgent, type AskCvContactAgentInput, type AskCvContactAgentOutput } from '@/ai/flows/ask-cv-contact-flow';
import { askCvGeneralAgent, type AskCvGeneralAgentInput, type AskCvGeneralAgentOutput } from '@/ai/flows/ask-cv-general-flow';


const formSchema = z.object({
  question: z.string().min(5, 'Question must be at least 5 characters long.'),
});

type CvAgentFormData = z.infer<typeof formSchema>;

interface CvAgentFormProps {
  contextType?: 'cvPage' | 'projectsPage' | 'contactPage' | 'general';
}

export function CvAgentForm({ contextType = 'general' }: CvAgentFormProps) {
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CvAgentFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<CvAgentFormData> = async (data) => {
    setIsLoading(true);
    setAiResponse(null);
    try {
      let result: AskCvMainAgentOutput | AskCvProjectsAgentOutput | AskCvContactAgentOutput | AskCvGeneralAgentOutput;
      const agentInput = { question: data.question };

      switch (contextType) {
        case 'cvPage':
          result = await askCvMainAgent(agentInput as AskCvMainAgentInput);
          break;
        case 'projectsPage':
          result = await askCvProjectsAgent(agentInput as AskCvProjectsAgentInput);
          break;
        case 'contactPage':
          result = await askCvContactAgent(agentInput as AskCvContactAgentInput);
          break;
        case 'general':
        default:
          result = await askCvGeneralAgent(agentInput as AskCvGeneralAgentInput);
          break;
      }
      setAiResponse(result.answer);
    } catch (error) {
      console.error(`Error asking CV agent (context: ${contextType}):`, error);
      toast({
        title: 'Error',
        description: 'Failed to get an answer. Please try again.',
        variant: 'destructive',
      });
      setAiResponse(`An error occurred while trying to get an answer for context "${contextType}". Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  let descriptionText = "Have a question about my CV? Ask the AI assistant below. It uses my CV data (tailored to this section) as its knowledge base.";
  if (contextType === 'cvPage') {
    descriptionText = "Ask about my summary, experience, education, or skills. For projects or contact info, please use the AI on those specific pages.";
  } else if (contextType === 'projectsPage') {
    descriptionText = "Ask about my projects. For general CV details or contact info, please use the AI on those specific pages.";
  } else if (contextType === 'contactPage') {
    descriptionText = "Ask about how to contact me. For CV details or projects, please use the AI on those specific pages.";
  }


  return (
    <div className="space-y-8">
      <Card className="shadow-lg w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-accent flex items-center">
            <Sparkles className="mr-2 h-6 w-6" /> Ask AI About Me
          </CardTitle>
          <CardDescription>
            {descriptionText}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor={`question-${contextType}`} className="text-foreground/90">Your Question</Label>
              <Textarea
                id={`question-${contextType}`}
                {...register('question')}
                placeholder="e.g., What was Mohamed's role at Soft Innovation?"
                className="mt-1 min-h-[100px] bg-input text-input-foreground"
                aria-invalid={errors.question ? "true" : "false"}
              />
              {errors.question && <p className="text-sm text-destructive mt-1">{errors.question.message}</p>}
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Ask AI
              </Button>
              <Button type="button" variant="outline" onClick={() => { reset(); setAiResponse(null); }} disabled={isLoading}>
                Clear
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {aiResponse && (
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-headline text-accent">AI's Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-auto max-h-[200px] w-full rounded-md border p-4 bg-muted/20">
              <p className="text-foreground/80 whitespace-pre-wrap">{aiResponse}</p>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
