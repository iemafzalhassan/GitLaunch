'use client';

import React from 'react';
import type { FormState } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { generateReadmeMarkdown } from '@/lib/readme-generator';


interface ReadmePreviewProps {
  formState: FormState;
}

export function ReadmePreview({ formState }: ReadmePreviewProps) {
  const { toast } = useToast();
  const markdown = generateReadmeMarkdown(formState);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    toast({ title: 'Copied to clipboard!' });
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const createImgUrl = (path: string, params: Record<string, string | boolean | undefined>) => {
    const url = new URL(path);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
    return url.toString();
  };
  
  const renderAboutMe = () => {
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
  };

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
            <h1 className="text-3xl font-bold">Hi 👋, I'm {formState.name}</h1>
            <p className="text-lg italic text-muted-foreground">{formState.quote}</p>
            
            {renderAboutMe()}

            <div>
              <h2 className="text-2xl font-bold mb-2">🛠️ My Tech Stack</h2>
              <Image 
                src={`https://skillicons.dev/icons?i=${formState.techStack}&theme=${formState.techIconsStyle}`}
                alt="Tech Stack"
                width={800}
                height={50}
                unoptimized
              />
            </div>

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
                />
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
}
