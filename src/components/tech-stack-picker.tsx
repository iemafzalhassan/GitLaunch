'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { techCategories, technologies } from '@/lib/tech-stack-data';
import { cn } from '@/lib/utils';
import type { FormState } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface TechStackPickerProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}

export function TechStackPicker({ formState, setFormState }: TechStackPickerProps) {
  const selectedTech = new Set(formState.techStack.split(',').filter(Boolean));

  const handleTechToggle = (techName: string) => {
    const newSelectedTech = new Set(selectedTech);
    if (newSelectedTech.has(techName)) {
      newSelectedTech.delete(techName);
    } else {
      newSelectedTech.add(techName);
    }
    setFormState((prev) => ({
      ...prev,
      techStack: Array.from(newSelectedTech).join(','),
    }));
  };

  return (
    <Card className="bg-background/50">
      <CardHeader>
        <CardTitle className="text-lg">Tech Stack</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" collapsible className="w-full" defaultValue={['languages', 'frontend']}>
          {techCategories.map((category) => (
            <AccordionItem value={category.id} key={category.id}>
              <AccordionTrigger>{category.name}</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 pt-4">
                  {technologies
                    .filter((tech) => tech.category === category.id)
                    .map((tech) => (
                      <button
                        key={tech.name}
                        type="button"
                        onClick={() => handleTechToggle(tech.name)}
                        className={cn(
                          'flex flex-col items-center gap-2 p-2 rounded-lg transition-all',
                          selectedTech.has(tech.name)
                            ? 'bg-accent/20 ring-2 ring-accent'
                            : 'hover:bg-muted/50'
                        )}
                        title={tech.name}
                      >
                        <Image
                          src={`https://skillicons.dev/icons?i=${tech.name}&theme=${formState.techIconsStyle}`}
                          alt={`${tech.name} icon`}
                          width={40}
                          height={40}
                          className="h-10 w-10"
                          unoptimized
                        />
                        <span className="text-xs text-center truncate w-full">{tech.name}</span>
                      </button>
                    ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
