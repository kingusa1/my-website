
'use client';

import type React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface SectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, icon, children, className }: SectionProps) {
  const { ref, isInView } = useScrollAnimation({ triggerOnce: true });

  return (
    <section className={`py-8 mb-8 ${className}`}>
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={cn(
            "flex items-center mb-6 transition-all duration-700 ease-out",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {icon && <span className="mr-3 text-accent">{icon}</span>}
          <h2 className="text-3xl font-bold font-headline text-accent">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
