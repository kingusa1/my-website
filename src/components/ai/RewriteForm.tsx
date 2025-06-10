
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// Removed: import { rewriteResumeItem, type RewriteResumeItemInput } from '@/ai/flows/rewrite-resume-item';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  resumeItem: z.string().min(10, 'Resume item must be at least 10 characters long.'),
  instructions: z.string().min(5, 'Instructions must be at least 5 characters long.'),
});

type RewriteFormData = z.infer<typeof formSchema>;

export function RewriteForm() {
  const [rewrittenItem, setRewrittenItem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RewriteFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<RewriteFormData> = async (data) => {
    setIsLoading(true);
    setRewrittenItem(null);
    
    // AI functionality removed. Provide a standard response.
    const unavailableMessage = "Sorry, the AI resume rewrite tool is currently unavailable.";
    setRewrittenItem(unavailableMessage);
    toast({
      title: 'AI Tool Unavailable',
      description: 'The AI resume rewrite functionality is not active.',
    });
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-accent">AI Resume Rewrite Tool</CardTitle>
          <CardDescription>
            This AI tool to enhance resume items is currently unavailable.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="resumeItem" className="text-foreground/90">Current Resume Item</Label>
              <Textarea
                id="resumeItem"
                {...register('resumeItem')}
                placeholder="e.g., Managed a team of developers."
                className="mt-1 min-h-[100px] bg-input text-input-foreground"
                aria-invalid={errors.resumeItem ? "true" : "false"}
                disabled // Disable textarea as AI is unavailable
              />
              {errors.resumeItem && <p className="text-sm text-destructive mt-1">{errors.resumeItem.message}</p>}
            </div>

            <div>
              <Label htmlFor="instructions" className="text-foreground/90">Rewrite Instructions</Label>
              <Textarea
                id="instructions"
                {...register('instructions')}
                placeholder="e.g., Make it sound more senior, rewrite to be more specific and detailed, or rewrite to be more brief."
                className="mt-1 min-h-[100px] bg-input text-input-foreground"
                aria-invalid={errors.instructions ? "true" : "false"}
                disabled // Disable textarea as AI is unavailable
              />
              {errors.instructions && <p className="text-sm text-destructive mt-1">{errors.instructions.message}</p>}
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isLoading || true} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Rewrite with AI
              </Button>
              <Button type="button" variant="outline" onClick={() => { reset(); setRewrittenItem(null); }} disabled={isLoading || true}>
                Clear
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {rewrittenItem && (
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-headline text-accent">Rewritten Item</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80 whitespace-pre-wrap">{rewrittenItem}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
