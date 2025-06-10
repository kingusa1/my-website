
'use client'; 

import { cvData } from '@/lib/data';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { LayoutGrid } from 'lucide-react';
import { Section } from '@/components/cv/Section';
import { Separator } from '@/components/ui/separator';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

export default function ProjectsPage() {
  const { projects } = cvData;
  const pageTitleRef = useScrollAnimation({ triggerOnce: true });

  return (
    <div className="container mx-auto px-4 py-12">
      <div 
        ref={pageTitleRef.ref} 
        className={cn(
          "flex items-center mb-10 transition-all duration-700 ease-out",
          pageTitleRef.isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
        )}
      >
        <LayoutGrid size={32} className="mr-3 text-accent" />
        <h1 className="text-4xl font-bold font-headline text-accent">My Projects</h1>
      </div>
      
      {projects.length > 0 ? (
        <>
          <Separator className="my-8 bg-border/50" /> 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-lg text-foreground/70">No projects to display at the moment.</p>
      )}
    </div>
  );
}
