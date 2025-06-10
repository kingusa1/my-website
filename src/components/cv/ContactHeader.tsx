
'use client';
import type { ContactInfo } from '@/lib/types';
import { Phone, Mail, Linkedin, MapPin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface ContactHeaderProps {
  contact: ContactInfo;
  name: string;
  title: string;
  profilePhotoUrl?: string;
}

const AnimatedContactItem: React.FC<{ icon: React.ReactNode; text: string; href?: string; ariaLabel: string; delay: number }> = ({ icon, text, href, ariaLabel, delay }) => {
  const { ref, isInView } = useScrollAnimation({ triggerOnce: true, rootMargin: '0px 0px -50px 0px' });
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500 ease-out",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Button
        variant="ghost"
        size="sm"
        asChild={!!href}
        className="text-foreground/80 hover:text-accent hover:bg-accent/10 px-3 py-2 justify-start transition-all duration-300 group w-full text-left rounded-md" 
      >
        {href ? (
          <Link href={href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') ? href : `https://${href}`} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className="flex items-center w-full">
            <span className="inline-block transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-3deg] text-accent/90">{icon}</span>
            <span className="ml-3 text-sm font-medium">{text}</span>
          </Link>
        ) : (
          <div className="flex items-center w-full" aria-label={ariaLabel}>
            <span className="inline-block transform transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-3deg] text-accent/90">{icon}</span>
            <span className="ml-3 text-sm font-medium">{text}</span>
          </div>
        )}
      </Button>
    </div>
  );
};

export function ContactHeader({ contact, name, title, profilePhotoUrl }: ContactHeaderProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;
  const photoRef = useScrollAnimation({ triggerOnce: true });
  const nameRef = useScrollAnimation({ triggerOnce: true });
  const titleRef = useScrollAnimation({ triggerOnce: true });

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-card via-muted/10 to-card rounded-xl shadow-xl mb-12 md:mb-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="md:flex md:items-start md:gap-8 lg:gap-12">
          {/* Left Column: Photo */}
          {profilePhotoUrl && (
            <div
              ref={photoRef.ref}
              className={cn(
                "mb-8 md:mb-0 md:w-auto md:pr-8 lg:pr-12 flex-shrink-0",
                "flex justify-center md:justify-start",
                "transition-all duration-700 ease-out",
                photoRef.isInView ? "opacity-100 scale-100" : "opacity-0 scale-90"
              )}
            >
              <Image
                src={profilePhotoUrl}
                alt={name}
                width={160}
                height={160}
                className="rounded-full ring-4 ring-offset-4 ring-offset-card ring-accent/70 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                priority
                data-ai-hint="portrait person"
              />
            </div>
          )}

          {/* Right Column: Name, Title, Contact Details */}
          <div className="flex-grow md:mt-2"> {/* Added flex-grow and md:mt-2 for alignment */}
            <h1
              ref={nameRef.ref}
              className={cn(
                "text-4xl sm:text-5xl font-bold font-headline text-accent tracking-tight text-center md:text-left",
                "transition-all duration-700 ease-out delay-100",
                nameRef.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              )}
            >
              {name}
            </h1>
            <p
              ref={titleRef.ref}
              className={cn(
                "text-xl sm:text-2xl text-foreground/80 font-headline mt-2 md:mt-3 mb-6 md:mb-8 tracking-wide opacity-90 text-center md:text-left",
                "transition-all duration-700 ease-out delay-200",
                titleRef.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              )}
            >
              {title}
            </p>

            <div className="space-y-2.5"> {/* Adjusted spacing for contact items */}
              <AnimatedContactItem
                icon={<Phone className="h-5 w-5" />} 
                text={contact.phone}
                href={`tel:${contact.phone}`}
                ariaLabel={`Call ${name}`}
                delay={300}
              />
              <AnimatedContactItem
                icon={<Mail className="h-5 w-5" />}
                text={contact.email}
                href={`mailto:${contact.email}`}
                ariaLabel={`Email ${name}`}
                delay={350}
              />
              <AnimatedContactItem
                icon={<Linkedin className="h-5 w-5" />}
                text="LinkedIn"
                href={contact.linkedin}
                ariaLabel={`${name}'s LinkedIn profile`}
                delay={400}
              />
              <AnimatedContactItem
                icon={<Github className="h-5 w-5" />}
                text="GitHub"
                href={contact.github}
                ariaLabel={`${name}'s GitHub profile`}
                delay={450}
              />
              <AnimatedContactItem
                icon={<MapPin className="h-5 w-5" />}
                text={contact.address}
                href={googleMapsUrl}
                ariaLabel={`${name}'s address on Google Maps`}
                delay={500}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
