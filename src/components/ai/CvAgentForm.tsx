
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

// AI Flow imports removed as the functionality is no longer used.

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
    
    // AI functionality removed. Provide a standard response.
    const unavailableMessage = "Sorry, the AI assistant for this section is currently unavailable.";
    setAiResponse(unavailableMessage);
    toast({
      title: 'AI Assistant Unavailable',
      description: `The AI assistant for context "${contextType}" is not active.`,
      variant: 'default', // Or 'destructive' if preferred for errors
    });
    
    setIsLoading(false);
  };

  let descriptionText = "Have a question about my CV? Ask the AI assistant below. It uses my CV data (tailored to this section) as its knowledge base.";
  if (contextType === 'cvPage') {
    descriptionText = "The AI assistant for this page is currently unavailable.";
  } else if (contextType === 'projectsPage') {
    descriptionText = "The AI assistant for this page is currently unavailable.";
  } else if (contextType === 'contactPage') {
    descriptionText = "The AI assistant for this page is currently unavailable.";
  } else {
    descriptionText = "The AI assistant is currently unavailable.";
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
                disabled={true} // Disable textarea since AI is unavailable
              />
              {errors.question && <p className="text-sm text-destructive mt-1">{errors.question.message}</p>}
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isLoading || true} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Ask AI
              </Button>
              <Button type="button" variant="outline" onClick={() => { reset(); setAiResponse(null); }} disabled={isLoading || true}>
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
