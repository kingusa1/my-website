
'use client';
import { cvData } from '@/lib/data';
import { ContactHeader } from '@/components/cv/ContactHeader';
import { Section } from '@/components/cv/Section';
import { TimelineItem } from '@/components/cv/TimelineItem';
import { SkillBadge } from '@/components/cv/SkillBadge';
import { Separator } from '@/components/ui/separator';
import { Briefcase, GraduationCap, Lightbulb, User, Languages } from 'lucide-react';
import type { LanguageSkill } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const LanguageLevelDisplay: React.FC<{ level?: string; label: string }> = ({ level, label }) => {
  if (!level) return null;
  return (
    <div className="flex justify-between text-sm">
      <span className="text-foreground/80">{label}:</span>
      <span className="font-medium text-foreground/90">{level}</span>
    </div>
  );
};

const LanguageCard: React.FC<{ lang: LanguageSkill; index: number }> = ({ lang, index }) => {
  const { ref, isInView } = useScrollAnimation({ triggerOnce: true, rootMargin: '0px 0px -100px 0px' });
  return (
    <Card
      ref={ref}
      className={cn(
        "w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.66rem)] shadow-lg hover:shadow-xl transition-all duration-700 ease-out hover:scale-[1.02] transform",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-headline text-accent">
          {lang.name} {lang.motherTongue && <span className="text-sm font-normal text-foreground/70">(Mother Tongue)</span>}
        </CardTitle>
      </CardHeader>
      {!lang.motherTongue && (
        <CardContent className="space-y-1 text-sm">
          <LanguageLevelDisplay level={lang.listening} label="Listening" />
          <LanguageLevelDisplay level={lang.reading} label="Reading" />
          <LanguageLevelDisplay level={lang.spokenInteraction} label="Spoken Interaction" />
          <LanguageLevelDisplay level={lang.spokenProduction} label="Spoken Production" />
          <LanguageLevelDisplay level={lang.writing} label="Writing" />
        </CardContent>
      )}
    </Card>
  );
};


export default function HomePage() {
  const { name, title, contact, summary, experience, education, skills, languageSkills, projects, profilePhotoUrl } = cvData;
  const aboutMeRef = useScrollAnimation({ triggerOnce: true });

  const categorizedSkills: { [key: string]: typeof skills } = skills.reduce((acc, skill) => {
    acc[skill.category] = [...(acc[skill.category] || []), skill];
    return acc;
  }, {} as { [key: string]: typeof skills });

  return (
    <div className="min-h-screen">
      <ContactHeader contact={contact} name={name} title={title} profilePhotoUrl={profilePhotoUrl} />
      
      <div className="container mx-auto px-4 pb-12">
        <Section title="About Me" icon={<User size={28} />}>
          <p 
            ref={aboutMeRef.ref}
            className={cn(
              "text-lg text-foreground/80 leading-relaxed transition-all duration-700 ease-out",
              aboutMeRef.isInView ? "opacity-100 translate-y-0 delay-150" : "opacity-0 translate-y-8"
            )}
          >
            {summary}
          </p>
        </Section>

        <Separator className="my-8 bg-border/50" />

        <Section title="Work Experience" icon={<Briefcase size={28} />}>
          <div className="space-y-8">
            {experience.map((item) => (
              <TimelineItem key={item.id} item={item} />
            ))}
          </div>
        </Section>

        <Separator className="my-8 bg-border/50" />

        <Section title="Education & Training" icon={<GraduationCap size={28} />}>
          <div className="space-y-8">
            {education.map((item) => (
              <TimelineItem key={item.id} item={item} />
            ))}
          </div>
        </Section>

        <Separator className="my-8 bg-border/50" />

        <Section title="Digital Skills" icon={<Lightbulb size={28} />}>
          {Object.entries(categorizedSkills).map(([category, skillList]) => (
            <div key={category} className="mb-6">
              <h3 className="text-xl font-semibold font-headline text-foreground/90 mb-3">{category}</h3>
              <div className="flex flex-wrap">
                {skillList.map((skill, index) => (
                  <SkillBadge key={skill.id} name={skill.name} index={index} />
                ))}
              </div>
            </div>
          ))}
        </Section>
        
        <Separator className="my-8 bg-border/50" />

        <Section title="Language Skills" icon={<Languages size={28} />}>
          <div className="flex flex-wrap gap-4">
            {languageSkills.map((lang, index) => (
              <LanguageCard key={lang.id} lang={lang} index={index} />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
