
'use client';

import { cvData } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Linkedin, Github, UserCircle, Send } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator'; 
import { Section } from '@/components/cv/Section';


const ContactItem: React.FC<{ icon: React.ReactNode; text: string; href?: string; ariaLabel: string, value?: string }> = ({ icon, text, href, ariaLabel, value }) => (
  <div className="flex items-center space-x-3 py-2">
    <span className="text-accent">{icon}</span>
    <div className="text-foreground/90">
      <span className="font-medium">{text}: </span>
      {href ? (
        <Button variant="link" asChild className="p-0 h-auto text-foreground/90 hover:text-accent">
          <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
            {value || text}
          </Link>
        </Button>
      ) : (
        <span aria-label={ariaLabel}>{value || text}</span>
      )}
    </div>
  </div>
);

const emailFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long.'),
  senderEmail: z.string().email('Please enter a valid email address.'),
  subject: z.string().min(5, 'Subject must be at least 5 characters long.'),
  message: z.string().min(10, 'Message must be at least 10 characters long.'),
});

type EmailFormData = z.infer<typeof emailFormSchema>;

export default function ContactPage() {
  const { contact } = cvData;
  const { toast } = useToast();
  const formCardRef = useScrollAnimation({ triggerOnce: true });
  const directContactCardRef = useScrollAnimation({ triggerOnce: true });
  const pageTitleRef = useScrollAnimation({ triggerOnce: true }); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
  });

  const onEmailSubmit: SubmitHandler<EmailFormData> = (data) => {
    const mailtoSubject = encodeURIComponent(data.subject);
    const mailtoBody = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.senderEmail}\n\nMessage:\n${data.message}`
    );
    const mailtoLink = `mailto:${contact.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    
    try {
      window.location.href = mailtoLink;
      toast({
        title: 'Email Client Opened',
        description: 'Your email client should now be open with the message pre-filled.',
      });
      reset();
    } catch (error) {
      console.error("Failed to open mailto link", error);
      toast({
        title: 'Error',
        description: 'Could not open your email client. Please try copying the email address.',
        variant: 'destructive',
      });
    }
  };


  return (
    <div className="container mx-auto px-4 py-12">
      <div 
        ref={pageTitleRef.ref}
        className={cn(
          "flex items-center mb-10 transition-all duration-700 ease-out",
          pageTitleRef.isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
        )}
      >
        <UserCircle size={32} className="mr-3 text-accent" />
        <h1 className="text-4xl font-bold font-headline text-accent">Contact Me</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card 
          ref={formCardRef.ref}
          className={cn(
            "shadow-lg transition-all duration-700 ease-out",
            formCardRef.isInView ? "opacity-100 translate-y-0 delay-150" : "opacity-0 translate-y-10"
          )}
        >
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-center text-accent">Send Me a Message</CardTitle>
            <CardDescription className="text-center text-foreground/70">
              Fill out the form below to open a pre-filled email in your mail client.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-foreground/90">Your Name</Label>
                <Input id="name" {...register('name')} placeholder="John Doe" className="mt-1 bg-input text-input-foreground" />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="senderEmail" className="text-foreground/90">Your Email</Label>
                <Input id="senderEmail" type="email" {...register('senderEmail')} placeholder="you@example.com" className="mt-1 bg-input text-input-foreground" />
                {errors.senderEmail && <p className="text-sm text-destructive mt-1">{errors.senderEmail.message}</p>}
              </div>
              <div>
                <Label htmlFor="subject" className="text-foreground/90">Subject</Label>
                <Input id="subject" {...register('subject')} placeholder="Regarding your profile" className="mt-1 bg-input text-input-foreground" />
                {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>}
              </div>
              <div>
                <Label htmlFor="message" className="text-foreground/90">Message</Label>
                <Textarea id="message" {...register('message')} placeholder="Your message here..." className="mt-1 min-h-[120px] bg-input text-input-foreground" />
                {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send className="mr-2 h-4 w-4" /> Open Email Client
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card 
          ref={directContactCardRef.ref}
          className={cn(
            "shadow-lg transition-all duration-700 ease-out",
            directContactCardRef.isInView ? "opacity-100 translate-y-0 delay-250" : "opacity-0 translate-y-10"
          )}
        >
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-center text-accent">Get in Touch Directly</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ContactItem 
              icon={<Mail size={20} />} 
              text="Email" 
              value={contact.email}
              href={`mailto:${contact.email}`} 
              ariaLabel={`Email ${cvData.name}`} 
            />
            <ContactItem 
              icon={<Phone size={20} />} 
              text="Phone" 
              value={contact.phone}
              href={`tel:${contact.phone}`} 
              ariaLabel={`Call ${cvData.name}`} 
            />
            <ContactItem 
              icon={<Linkedin size={20} />} 
              text="LinkedIn" 
              value={contact.linkedin}
              href={contact.linkedin.startsWith('http') ? contact.linkedin : `https://${contact.linkedin}`}
              ariaLabel={`${cvData.name}'s LinkedIn profile`} 
            />
            <ContactItem 
              icon={<Github size={20} />} 
              text="GitHub" 
              value={contact.github}
              href={contact.github.startsWith('http') ? contact.github : `https://${contact.github}`}
              ariaLabel={`${cvData.name}'s GitHub profile`} 
            />
          </CardContent>
        </Card>
      </div>

      <Separator className="my-12 bg-border/50" />
      {/* AI Form Section Removed */}
    </div>
  );
}
