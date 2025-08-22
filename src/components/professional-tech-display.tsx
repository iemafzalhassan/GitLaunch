'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FormState } from '@/lib/types';
import { generateMultipleIconUrls, getBadgeDimensions, BADGE_STYLES } from '@/lib/icon-services';
import { cn } from '@/lib/utils';

interface ProfessionalTechDisplayProps {
  formState: FormState;
  showTitle?: boolean;
  compact?: boolean;
}

export function ProfessionalTechDisplay({ 
  formState, 
  showTitle = true, 
  compact = false 
}: ProfessionalTechDisplayProps) {
  const techNames = formState.techStack.split(',').filter(Boolean);
  const urls = generateMultipleIconUrls(formState.iconService, techNames, formState.techIconsStyle);
  const dimensions = getBadgeDimensions(formState.iconService, formState.techIconsStyle);

  if (techNames.length === 0) {
    return null;
  }

  const renderTechBadges = () => {
    if (formState.iconService === 'shields') {
      // Special handling for Shields.io badges with proper alignment
      return (
        <div className={cn(
          "flex flex-wrap items-center",
          dimensions.spacing,
          compact ? "justify-start" : "justify-center md:justify-start"
        )}>
          {urls.map((url, index) => (
            <div 
              key={index}
              className="flex-shrink-0"
              style={{ 
                minWidth: dimensions.width,
                height: dimensions.height 
              }}
            >
              <Image 
                src={url} 
                alt={techNames[index]} 
                width={dimensions.width} 
                height={dimensions.height} 
                unoptimized 
                className={cn(
                  dimensions.className,
                  "object-contain",
                  "transition-transform hover:scale-105"
                )}
                style={{
                  width: 'auto',
                  height: dimensions.height,
                  maxWidth: dimensions.width
                }}
              />
            </div>
          ))}
        </div>
      );
    }

    // Standard handling for Devicon and TechIcons
    return (
      <div className={cn(
        "flex flex-wrap items-center",
        dimensions.spacing,
        compact ? "justify-start" : "justify-center md:justify-start"
      )}>
        {urls.map((url, index) => (
          <div 
            key={index}
            className="flex-shrink-0"
          >
            <Image 
              src={url} 
              alt={techNames[index]} 
              width={dimensions.width} 
              height={dimensions.height} 
              unoptimized 
              className={cn(
                dimensions.className,
                "transition-transform hover:scale-110"
              )}
            />
          </div>
        ))}
      </div>
    );
  };

  if (compact) {
    return (
      <div className="space-y-2">
        {showTitle && (
          <h4 className="text-sm font-medium text-muted-foreground">
            Tech Stack ({techNames.length})
          </h4>
        )}
        {renderTechBadges()}
      </div>
    );
  }

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          🛠️ My Tech Stack
          <span className="text-sm font-normal text-muted-foreground">
            ({techNames.length} technologies)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {renderTechBadges()}
          
          {/* Service info */}
          <div className="text-xs text-muted-foreground pt-2 border-t">
            Using {formState.iconService === 'shields' ? 'Shields.io' :
                   formState.iconService === 'devicon' ? 'Devicon' : 'TechIcons.dev'}
            {formState.iconService === 'shields' && ` • ${formState.techIconsStyle} style`}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Specialized component for README preview
export function ReadmeTechDisplay({ formState }: { formState: FormState }) {
  const techNames = formState.techStack.split(',').filter(Boolean);
  const urls = generateMultipleIconUrls(formState.iconService, techNames, formState.techIconsStyle);
  const dimensions = getBadgeDimensions(formState.iconService, formState.techIconsStyle);

  if (techNames.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🛠️ My Tech Stack</h2>
      
      {/* Individual badges with proper spacing for README */}
      <div className={cn(
        "flex flex-wrap items-center gap-2",
        formState.iconService === 'shields' && dimensions.height > 20 ? "gap-3" : "gap-2"
      )}>
        {urls.map((url, index) => (
          <Image 
            key={index}
            src={url} 
            alt={techNames[index]} 
            width={dimensions.width} 
            height={dimensions.height} 
            unoptimized 
            className={dimensions.className}
            style={{
              width: 'auto',
              height: dimensions.height,
              maxWidth: dimensions.width
            }}
          />
        ))}
      </div>
    </div>
  );
}