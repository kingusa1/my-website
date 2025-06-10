
'use client';

import type { TimelineEvent } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface TimelineItemProps {
  item: TimelineEvent;
}

export function TimelineItem({ item }: TimelineItemProps) {
  const { ref, isInView } = useScrollAnimation({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });

  const renderDescriptionItem = (desc: string, index: number) => {
    const lowerDesc = desc.toLowerCase();
    if (lowerDesc.startsWith('website:')) {
      let url = desc.substring('website:'.length).trim();
      if (url) {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = `https://${url}`;
        }
        return (
          <li key={index} className="flex items-start">
            <ChevronRight className="h-5 w-5 mr-2 mt-0.5 text-accent flex-shrink-0" />
            <span>
              Website:{" "}
              <Button variant="link" asChild className="p-0 h-auto text-foreground/90 hover:text-accent hover:underline">
                <Link href={url} target="_blank" rel="noopener noreferrer">
                  {url.replace(/^https?:\/\//, '')}
                </Link>
              </Button>
            </span>
          </li>
        );
      }
    }
    return (
      <li key={index} className="flex items-start">
        <ChevronRight className="h-5 w-5 mr-2 mt-0.5 text-accent flex-shrink-0" />
        <span>{desc}</span>
      </li>
    );
  };

  return (
    <Card
      ref={ref}
      className={cn(
        "mb-6 shadow-lg hover:shadow-xl transition-all duration-700 ease-out border-l-4 border-accent hover:scale-[1.02] transform",
        isInView ? "opacity-100 translate-y-0 delay-150" : "opacity-0 translate-y-10"
      )}
    >
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-1">
          <CardTitle className="text-xl font-headline text-accent">{item.title}</CardTitle>
          <p className="text-sm text-foreground/70 mt-1 sm:mt-0">{item.date}</p>
        </div>
        <CardDescription className="text-md text-foreground/90">
          {item.subtitle}
          {item.location && <span className="text-foreground/70">, {item.location}</span>}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-foreground/80">
          {item.description.map((desc, index) => renderDescriptionItem(desc, index))}
        </ul>
      </CardContent>
    </Card>
  );
}
