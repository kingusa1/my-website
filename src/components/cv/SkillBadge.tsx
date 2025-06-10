
'use client';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface SkillBadgeProps {
  name: string;
  index: number;
}

export function SkillBadge({ name, index }: SkillBadgeProps) {
  const { ref, isInView } = useScrollAnimation({ triggerOnce: true, rootMargin: '0px 0px -20px 0px' });
  return (
    <Badge
      ref={ref}
      variant="secondary"
      className={cn(
        "text-sm py-1 px-3 m-1 bg-secondary hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-out hover:scale-105 transform",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {name}
    </Badge>
  );
}
