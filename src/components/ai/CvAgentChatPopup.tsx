
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MessageSquare, Send, User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { askCvGeneralAgent, type AskCvGeneralAgentInput, type AskCvGeneralAgentOutput } from '@/ai/flows/ask-cv-general-flow';


const chatFormSchema = z.object({
  question: z.string().min(1, 'Question cannot be empty.').max(500, 'Question too long.'),
});
type ChatFormData = z.infer<typeof chatFormSchema>;

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

interface CvAgentChatPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FAB_SIZE_NUMERIC = 64;
const FAB_MARGIN_NUMERIC = 24;

export function CvAgentChatPopup({ open, onOpenChange }: CvAgentChatPopupProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  const [dialogPosition, setDialogPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [isDraggingDialog, setIsDraggingDialog] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; initialTop: number; initialLeft: number } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    watch,
  } = useForm<ChatFormData>({
    resolver: zodResolver(chatFormSchema),
    defaultValues: {
      question: '',
    },
  });

  const currentQuestionValue = watch('question');

  const calculateInitialPosition = useCallback(() => {
    if (typeof window !== 'undefined' && dialogContentRef.current) {
      const dialogWidth = dialogContentRef.current.offsetWidth || 380;
      const dialogHeight = dialogContentRef.current.offsetHeight || 500;

      const initialTop = window.innerHeight - dialogHeight - FAB_SIZE_NUMERIC - FAB_MARGIN_NUMERIC - 20;
      const initialLeft = window.innerWidth - dialogWidth - FAB_MARGIN_NUMERIC;

      return {
        top: Math.max(0, initialTop > 0 ? initialTop : (window.innerHeight - dialogHeight) / 2 ),
        left: Math.max(0, initialLeft > 0 ? initialLeft: (window.innerWidth - dialogWidth) / 2)
      };
    }
    return { top: 100, left: typeof window !== 'undefined' ? Math.max(0, window.innerWidth - 400) : 100 };
  }, []);


  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setDialogPosition(calculateInitialPosition());
      }, 0);
      clearErrors("question");
      reset({ question: '' });
      const timer = setTimeout(() => {
        if (textAreaRef.current) {
          textAreaRef.current.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setMessages([]); // Clear messages when dialog is fully closed
        clearErrors("question");
        reset({ question: '' });
      }, 300); // Wait for animation
      return () => clearTimeout(timer);
    }
  }, [open, reset, clearErrors, calculateInitialPosition]);


  const handleDialogMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetElement = e.target as HTMLElement;
    const headerElement = e.currentTarget;
    const titleElement = headerElement.querySelector('[class*="DialogTitle"]');
    
    const isHeaderOrTitle = targetElement === headerElement || (titleElement && titleElement.contains(targetElement));
    
    // Check if the click is on an interactive element within the header, but not the header/title itself
    const isInteractiveWithinHeader = targetElement.closest('button, textarea, a, input, select');
    if (isInteractiveWithinHeader && targetElement !== titleElement && targetElement !== headerElement && headerElement.contains(isInteractiveWithinHeader)) {
      return; // Do not start drag if clicking an interactive element (like a close button inside header)
    }

    if (!isHeaderOrTitle || targetElement.closest('button:not([aria-label="Close"]), textarea, input, select')) return;
    
    setIsDraggingDialog(true);
    if (dialogContentRef.current) { 
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        initialTop: dialogContentRef.current.offsetTop,
        initialLeft: dialogContentRef.current.offsetLeft,
      };
    }
    document.addEventListener('mousemove', handleDialogMouseMove);
    document.addEventListener('mouseup', handleDialogMouseUp);
  };

  const handleDialogMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingDialog || !dragStartRef.current || !dialogContentRef.current) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    let newTop = dragStartRef.current.initialTop + dy;
    let newLeft = dragStartRef.current.initialLeft + dx;

    // Boundary checks
    const dialogWidth = dialogContentRef.current.offsetWidth;
    const dialogHeight = dialogContentRef.current.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Prevent dragging outside viewport
    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (newLeft + dialogWidth > windowWidth) newLeft = windowWidth - dialogWidth;
    if (newTop + dialogHeight > windowHeight) newTop = windowHeight - dialogHeight;

    setDialogPosition({ top: newTop, left: newLeft });
  }, [isDraggingDialog]);

  const handleDialogMouseUp = useCallback(() => {
    setIsDraggingDialog(false);
    document.removeEventListener('mousemove', handleDialogMouseMove);
    document.removeEventListener('mouseup', handleDialogMouseUp);
  }, [handleDialogMouseMove]);

  useEffect(() => {
    // Cleanup global event listeners when component unmounts
    return () => {
      document.removeEventListener('mousemove', handleDialogMouseMove);
      document.removeEventListener('mouseup', handleDialogMouseUp);
    };
  }, [handleDialogMouseMove, handleDialogMouseUp]);


  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit: SubmitHandler<ChatFormData> = async (data) => {
    setIsLoading(true);
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: data.question,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const input: AskCvGeneralAgentInput = { question: data.question }; // Use the general agent
      const result: AskCvGeneralAgentOutput = await askCvGeneralAgent(input);
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: result.answer || "Sorry, I couldn't get a response at this moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error asking CV general agent:', error);
      toast({
        title: 'Error',
        description: 'Failed to get an answer. Please try again.',
        variant: 'destructive',
      });
      const errorMessageText = error instanceof Error ? error.message : 'An unexpected error occurred.';
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: `Sorry, I encountered an error: ${errorMessageText}. Please try again later.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        clearErrors("question"); 
        reset({ question: '' });    
        clearErrors("question"); 
        if (textAreaRef.current) {
          textAreaRef.current.focus();
        }
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const questionText = currentQuestionValue || '';
      if (!isLoading && questionText.trim() !== '') {
         handleSubmit(onSubmit)();
      }
    }
  };

  const questionTextForButton = currentQuestionValue || '';
  const isSubmitDisabled = isLoading || questionTextForButton.trim() === '';


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ref={dialogContentRef}
        className={cn(
          "w-full max-w-[380px] h-[70vh] max-h-[580px]", // Default size if not dragged
          "flex flex-col p-0 shadow-xl fixed z-50 rounded-lg border bg-card text-card-foreground", // Base styles
          // Animation styles
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        )}
        style={dialogPosition.top !== 0 || dialogPosition.left !== 0 ? {
          top: `${dialogPosition.top}px`,
          left: `${dialogPosition.left}px`,
          bottom: 'auto', 
          right: 'auto',  
          transform: 'none', // Override centering transform when position is set
        } : {
           opacity: 0, // Initially hidden until position is calculated
        }}
        onOpenAutoFocus={(e) => e.preventDefault()} // Prevent auto-focus on first element
        onPointerDownOutside={(e) => { 
          // Prevent closing if click is on the FAB
          const fab = document.querySelector('button[aria-label^="Open AI chat"], button[aria-label^="Close chat"]');
          if (fab && fab.contains(e.target as Node)) {
            e.preventDefault();
          }
        }}
        >
        <DialogHeader
          className="p-4 sm:p-5 pb-2 border-b shrink-0 relative cursor-grab active:cursor-grabbing"
          onMouseDown={handleDialogMouseDown}
        >
          <DialogTitle className="flex items-center text-lg sm:text-xl font-semibold text-foreground pointer-events-none"> {/* Make title non-interactive for drag */}
            <Bot className="mr-2 h-6 w-6 text-accent" />
            AI Chat Assistant
          </DialogTitle>
          {/* Close button is part of DialogContent by default, no need to add another here if using standard DialogClose */}
        </DialogHeader>

        <ScrollArea className="flex-grow p-4 sm:p-5" ref={scrollAreaRef}>
          <div className="space-y-4 pb-4">
            {messages.length === 0 && !isLoading && (
              <div className="text-center text-muted-foreground py-10 flex flex-col items-center justify-center h-full">
                <MessageSquare size={40} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm">Ask a question about Mohamed's CV to get started.</p>
                <p className="text-xs text-muted-foreground/80 mt-1">e.g., "What was his role at Soft Innovation?"</p>
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'flex items-start space-x-2.5',
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {msg.sender === 'ai' && (
                  <div className="flex-shrink-0 self-start p-1.5 bg-accent/10 rounded-full">
                    <Bot className="h-5 w-5 text-accent" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[75%] md:max-w-[80%] rounded-lg p-3 text-sm shadow-sm break-words',
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-card border text-foreground rounded-bl-none'
                  )}
                >
                  <p className="whitespace-pre-wrap">{msg.text || "..."}</p>
                   <p className={cn("text-xs mt-1.5 opacity-70", msg.sender === 'user' ? 'text-right' : 'text-left')}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                 {msg.sender === 'user' && (
                  <div className="flex-shrink-0 self-start p-1.5 bg-primary/10 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                )}
              </div>
            ))}
             {isLoading && messages.length > 0 && messages[messages.length-1].sender === 'user' && ( // Show loader only if last message was user
              <div className="flex items-start space-x-2.5 justify-start">
                 <div className="flex-shrink-0 self-start p-1.5 bg-accent/10 rounded-full"> {/* AI icon for loader */}
                   <Bot className="h-5 w-5 text-accent" />
                </div>
                <div className="max-w-[75%] rounded-lg p-3 text-sm shadow-sm bg-card border text-foreground rounded-bl-none">
                  <Loader2 className="h-5 w-5 animate-spin text-accent" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 sm:p-5 pt-2 sm:pt-4 border-t bg-background shrink-0">
          <form onSubmit={handleSubmit(onSubmit)} className="flex items-start space-x-2 sm:space-x-3">
            <div className="flex-grow">
              <Textarea
                id="question"
                {...register('question')}
                ref={textAreaRef}
                placeholder="Type your question..."
                className="min-h-[50px] sm:min-h-[56px] resize-none bg-input text-input-foreground focus:ring-accent focus:border-accent text-sm sm:text-base pr-12" // Added pr for potential inline button space if needed
                rows={1}
                onKeyDown={handleKeyDown}
                disabled={isLoading} 
              />
              {errors.question && (
                <p className="text-sm text-destructive mt-1 px-1">{errors.question.message}</p>
              )}
            </div>
            <Button type="submit" disabled={isSubmitDisabled} size="icon" className="h-[50px] w-[50px] sm:h-[56px] sm:w-[56px] flex-shrink-0 bg-primary hover:bg-primary/90">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
