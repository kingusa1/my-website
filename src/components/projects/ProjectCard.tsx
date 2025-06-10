
'use client';

import type { Project } from '@/lib/types';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, Youtube, ExternalLink, Eye } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';

interface ParsedDescriptionProps {
  description: string;
}

const ParsedDescription: React.FC<ParsedDescriptionProps> = ({ description }) => {
  const lines = description.split('\n').filter(line => line.trim() !== '');
  const headingKeywords = [
    "Overview:",
    "Key Steps & Challenges:",
    "Results / Impact:",
    "Solution & Key Steps:",
    "Outcome & Benefits:",
    "Tech Stack:",
    "Tech Stack & Integrations:",
    "Overview & Business Need:"
  ];

  return (
    <div className="space-y-4 text-sm leading-relaxed">
      {lines.map((line, idx) => {
        const trimmedLine = line.trim();
        let isHeading = false;
        let headingText = '';

        for (const keyword of headingKeywords) {
          if (trimmedLine.startsWith(keyword)) {
            isHeading = true;
            headingText = trimmedLine;
            break;
          }
        }

        if (isHeading) {
          return (
            <h5 key={idx} className="text-md font-semibold text-foreground mt-4 mb-2 first:mt-0">
              {headingText}
            </h5>
          );
        } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('• ') || trimmedLine.startsWith('* ') || /^\d+\.\s/.test(trimmedLine)) {
          return (
            <p key={idx} className="text-foreground/80 pl-5 mb-1">
              {trimmedLine}
            </p>
          );
        } else {
          return (
            <p key={idx} className="text-foreground/80 mb-2">
              {trimmedLine}
            </p>
          );
        }
      })}
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const { ref, isInView } = useScrollAnimation({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displaySummary = project.summaryBullets && project.summaryBullets.length > 0
    ? project.summaryBullets
    : [project.description.substring(0, 150) + (project.description.length > 150 ? "..." : "")];

  const hasSummaryBullets = project.summaryBullets && project.summaryBullets.length > 0;

  return (
    <>
      <Card
        ref={ref}
        className={cn(
          "flex flex-col h-full shadow-lg hover:shadow-xl transition-all duration-700 ease-out hover:scale-[1.02] transform cursor-pointer",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
        style={{ transitionDelay: `${index * 100}ms` }}
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsModalOpen(true); }}
        aria-label={`View details for ${project.name}`}
      >
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-accent">{project.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col p-6 space-y-4">
          <div className="flex-grow space-y-2">
            {hasSummaryBullets && <h4 className="text-sm font-semibold text-foreground/70 mb-1">Key Highlights:</h4>}
            <ul className={cn("list-disc pl-5 space-y-1 text-sm text-foreground/80", !hasSummaryBullets && "list-none pl-0")}>
              {displaySummary.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
          
          <div className="flex-shrink-0 pt-4 border-t border-border/30 mt-auto">
            <h4 className="text-sm font-semibold text-foreground/70 mb-2">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-shrink-0 flex items-center justify-between pt-4 border-t border-border/30">
          <div className="flex flex-wrap gap-2">
            {project.githubUrl && (
              <Button variant="outline" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Link>
              </Button>
            )}
            {project.youtubeUrl && (
              <Button variant="outline" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                <Link href={project.youtubeUrl} target="_blank" rel="noopener noreferrer">
                  <Youtube className="mr-2 h-4 w-4" /> YouTube
                </Link>
              </Button>
            )}
            {project.liveUrl && (
              <Button variant="outline" size="sm" asChild onClick={(e) => e.stopPropagation()}>
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </Link>
              </Button>
            )}
          </div>
          <div className="text-xs text-muted-foreground flex items-center">
            <Eye className="mr-1 h-3 w-3" /> Click to see more
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-screen h-screen max-w-full max-h-full top-0 left-0 !translate-x-0 !translate-y-0 rounded-none flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline text-accent">{project.name}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-grow min-h-0">
            <div className="p-4"> 
              <ParsedDescription description={project.description} />
              
              <div className="pt-4 mt-4 border-t border-border/30"> 
                <h4 className="text-md font-semibold text-foreground/80 mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="mt-auto pt-4 p-6 border-t sm:justify-start"> {/* Added p-6 to DialogFooter */}
            <div className="flex flex-wrap gap-2">
                {project.githubUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </Link>
                  </Button>
                )}
                {project.youtubeUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={project.youtubeUrl} target="_blank" rel="noopener noreferrer">
                      <Youtube className="mr-2 h-4 w-4" /> YouTube
                    </Link>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Link>
                  </Button>
                )}
                 <Button variant="outline" onClick={() => setIsModalOpen(false)}>Close</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
