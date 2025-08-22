'use client';

import React, { useMemo, useCallback, useState } from 'react';
import type { FormState } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { generateReadmeMarkdown } from '@/lib/readme-generator';
import { generateIconUrl, generateMultipleIconUrls, getBadgeDimensions } from '@/lib/icon-services';
import { isTechnologyAvailable } from '@/lib/tech-utils';
import { getContributionGraphTheme } from '@/lib/theme-utils';
import { ReadmeTechDisplay } from '@/components/professional-tech-display';

interface ReadmePreviewProps {
  formState: FormState;
}

export const ReadmePreview = React.memo(({ formState }: ReadmePreviewProps) => {
  const { toast } = useToast();
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});
  
  // Memoize expensive markdown generation
  const markdown = useMemo(() => generateReadmeMarkdown(formState), [formState]);

  // Memoize callback functions
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(markdown);
    toast({ title: 'Copied to clipboard!' });
  }, [markdown, toast]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [markdown]);
  
  // Memoize URL creation function
  const createImgUrl = useCallback((path: string, params: Record<string, string | boolean | undefined>) => {
    const url = new URL(path);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
    return url.toString();
  }, []);

  // Memoize image loading handlers
  const handleImageLoad = useCallback((url: string) => {
    setImageLoading(prev => ({ ...prev, [url]: false }));
  }, []);

  const handleImageError = useCallback((url: string) => {
    setImageLoading(prev => ({ ...prev, [url]: false }));
    console.warn(`Failed to load image: ${url}`);
  }, []);
  
  // Memoize about me rendering
  const renderAboutMe = useCallback(() => {
    let roleInfo = '';
    if (formState.role === 'student') {
      roleInfo = `🎓 I'm a student at **${formState.collegeName || 'my university'}**, studying **${formState.domain || 'my field'}**.`;
    } else if (formState.role === 'professional') {
      let companyInfo = `**${formState.companyName || 'my company'}**`;
      if (formState.companyUrl) {
        companyInfo = `[${companyInfo}](${formState.companyUrl})`;
      }
      roleInfo = `💻 I'm a **${formState.domain || 'professional'}** at ${companyInfo}.`;
    } else if (formState.role === 'freelancer') {
      roleInfo = `🚀 I'm a freelancer specializing in **${formState.domain || 'my field'}**.`;
    }

    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">👨‍💻 About Me</h2>
        <p className="mb-2">{formState.bio}</p>
        <ul className="list-disc list-inside space-y-1">
          {roleInfo && <li>{roleInfo.replace(/\*\*/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1')}</li>}
          <li>🚀 I'm passionate about building cool things with modern technologies.</li>
        </ul>
      </div>
    );
  }, [formState.role, formState.collegeName, formState.domain, formState.companyName, formState.companyUrl, formState.bio]);

  // Memoize socials rendering
  const renderSocials = useCallback(() => {
    const hasSocials = Object.values(formState.socials).some(s => s);
    if (!hasSocials) return null;

    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">📫 Let's Connect</h2>
        <div className="flex gap-2 flex-wrap">
          {formState.socials.linkedin && (
             <a href={`https://linkedin.com/in/${formState.socials.linkedin}`} target="_blank" rel="noopener noreferrer">
                <Image 
                  src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" 
                  alt="LinkedIn" 
                  width={90} 
                  height={28} 
                  unoptimized 
                  onLoad={() => handleImageLoad('linkedin')}
                  onError={() => handleImageError('linkedin')}
                />
             </a>
          )}
          {formState.socials.twitter && (
            <a href={`https://twitter.com/${formState.socials.twitter}`} target="_blank" rel="noopener noreferrer">
              <Image 
                src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" 
                alt="Twitter" 
                width={82} 
                height={28} 
                unoptimized 
                onLoad={() => handleImageLoad('twitter')}
                onError={() => handleImageError('twitter')}
              />
            </a>
          )}
          {formState.socials.website && (
            <a href={formState.socials.website} target="_blank" rel="noopener noreferrer">
              <Image 
                src="https://img.shields.io/badge/Website-_?style=for-the-badge&logo=rss&logoColor=white" 
                alt="Website" 
                width={82} 
                height={28} 
                unoptimized 
                onLoad={() => handleImageLoad('website')}
                onError={() => handleImageError('website')}
              />
            </a>
          )}
          {formState.socials.email && (
            <a href={`mailto:${formState.socials.email}`} target="_blank" rel="noopener noreferrer">
              <Image 
                src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" 
                alt="Email" 
                width={75} 
                height={28} 
                unoptimized 
                onLoad={() => handleImageLoad('email')}
                onError={() => handleImageError('email')}
              />
            </a>
          )}
        </div>
      </div>
    );
  }, [formState.socials, handleImageLoad, handleImageError]);

  // Memoize contribution graph theme
  const contributionTheme = useMemo(() => {
    return getContributionGraphTheme(formState.statsTheme);
  }, [formState.statsTheme]);

  // Memoize tech stack URLs
  const techStackUrls = useMemo(() => {
    const techNames = formState.techStack.split(',').filter(Boolean);
    if (formState.iconService === 'skillicons') {
      return techNames.map((n) => generateIconUrl(formState.iconService, [n], formState.techIconsStyle));
    } else {
      return generateMultipleIconUrls(formState.iconService, techNames, formState.techIconsStyle);
    }
  }, [formState.techStack, formState.iconService, formState.techIconsStyle]);

  return (
    <Card className="border-border/60">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>See your README take shape.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleCopy} aria-label="Copy Markdown">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleDownload} aria-label="Download README.md">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preview">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="markdown">Markdown</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="mt-4 p-4 border rounded-md min-h-[400px] space-y-6 bg-background/50">
            <div>
              <h1 className="text-3xl font-bold">Hi 👋, I'm {formState.name}</h1>
              <p className="text-lg italic text-muted-foreground">{formState.quote}</p>
            </div>

            {renderAboutMe()}
            
            {renderSocials()}

            <ReadmeTechDisplay formState={formState} />

            <h2 className="text-2xl font-bold mb-2">📊 My GitHub Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Image 
                src={createImgUrl('https://github-readme-stats.vercel.app/api', { 
                  username: formState.githubUsername,
                  theme: formState.statsTheme,
                  show_icons: 'true',
                })}
                alt="GitHub Stats"
                width={450}
                height={150}
                unoptimized
                onLoad={() => handleImageLoad('github-stats')}
                onError={() => handleImageError('github-stats')}
              />
              <Image 
                src={createImgUrl('https://github-readme-stats.vercel.app/api/top-langs/', { 
                  username: formState.githubUsername,
                  theme: formState.statsTheme,
                  layout: 'compact'
                })}
                alt="Top Languages"
                width={450}
                height={150}
                unoptimized
                onLoad={() => handleImageLoad('top-langs')}
                onError={() => handleImageError('top-langs')}
              />
            </div>

            {formState.showTrophies && (
              <div className="text-center">
                <Image 
                  src={createImgUrl('https://github-profile-trophy.vercel.app/', { 
                    username: formState.githubUsername,
                    theme: formState.statsTheme,
                  })}
                  alt="GitHub Trophies"
                  width={800}
                  height={150}
                  unoptimized
                  onLoad={() => handleImageLoad('trophies')}
                  onError={() => handleImageError('trophies')}
                />
              </div>
            )}
            
            {formState.showStreak && (
              <div className="text-center">
                 <Image 
                  src={createImgUrl('https://streak-stats.demolab.com/', { 
                    user: formState.githubUsername,
                    theme: formState.statsTheme,
                  })}
                  alt="GitHub Streak"
                  width={600}
                  height={150}
                  unoptimized
                  onLoad={() => handleImageLoad('streak')}
                  onError={() => handleImageError('streak')}
                />
              </div>
            )}

            {formState.showContribution && (
              <div>
                <h2 className="text-2xl font-bold mb-2 text-center">📈 Contribution Graph</h2>
                <div className="text-center">
                  <Image 
                    src={createImgUrl('https://github-readme-activity-graph.vercel.app/graph', { 
                      username: formState.githubUsername,
                      theme: contributionTheme,
                    })}
                    alt="Contribution Graph"
                    width={800}
                    height={300}
                    unoptimized
                    onLoad={() => handleImageLoad('contribution')}
                    onError={() => handleImageError('contribution')}
                  />
                </div>
              </div>
            )}

          </TabsContent>
          <TabsContent value="markdown" className="mt-4">
            <pre className="p-4 border rounded-md bg-background/50 max-h-[600px] overflow-auto">
              <code className="font-code text-sm text-foreground">{markdown}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
});

ReadmePreview.displayName = 'ReadmePreview';
