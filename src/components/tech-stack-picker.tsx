'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { techCategories } from '@/lib/tech-stack-data';
import { cn } from '@/lib/utils';
import type { FormState } from '@/lib/types';
import { generateIconUrl, ICON_SERVICES } from '@/lib/icon-services';
import { getAvailableTechnologies, getTotalTechnologyCount } from '@/lib/tech-utils';
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
  const availableTechnologies = getAvailableTechnologies(formState.iconService);
  const totalCount = getTotalTechnologyCount(formState.iconService);

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
        <div className="text-sm text-muted-foreground">
          Using {ICON_SERVICES[formState.iconService].name} ({totalCount} technologies available)
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full" defaultValue={['languages', 'frontend']}>
          {techCategories.map((category) => {
            const categoryTechs = availableTechnologies.filter((tech) => tech.category === category.id);
            
            return (
              <AccordionItem value={category.id} key={category.id}>
                <AccordionTrigger>
                  {category.name} ({categoryTechs.length})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 pt-4">
                    {categoryTechs.map((tech) => {
                      const isShields = formState.iconService === 'shields';
                      return (
                        <button
                          key={tech.name}
                          type="button"
                          onClick={() => handleTechToggle(tech.name)}
                          className={cn(
                            'flex flex-col items-center justify-center gap-2 p-2 rounded-lg transition-all',
                            selectedTech.has(tech.name)
                              ? 'bg-accent/20 ring-2 ring-accent'
                              : 'hover:bg-muted/50'
                          )}
                          title={tech.name}
                        >
                          <div className={cn("flex items-center justify-center", isShields ? "h-8 w-full" : "h-10 w-10")}>
                            <Image
                              src={generateIconUrl(formState.iconService, [tech.name], formState.techIconsStyle)}
                              alt={`${tech.name} icon`}
                              width={isShields ? 100 : 40}
                              height={isShields ? 28 : 40}
                              className={cn(isShields ? "object-contain max-w-full max-h-full" : "h-10 w-10")}
                              unoptimized
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                target.style.visibility = 'hidden';
                              }}
                            />
                          </div>
                          {!isShields && (
                            <span className="text-xs text-center truncate w-full capitalize">{tech.name.replace(/js$/, 'JS')}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
