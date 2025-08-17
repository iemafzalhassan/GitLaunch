'use client';

import React from 'react';
import type { FormState } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { generateQuoteAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Loader2, Sparkles, Linkedin, Twitter, Globe } from 'lucide-react';

interface ReadmeFormProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}

export function ReadmeForm({ formState, setFormState }: ReadmeFormProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [name]: value
      }
    }));
  };

  const handleRadioChange = (name: string) => (value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string) => (checked: boolean) => {
    setFormState((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateQuote = async () => {
    setIsGenerating(true);
    try {
      const result = await generateQuoteAction({
        name: formState.name,
        role: formState.role,
        domain: formState.domain,
        companyName: formState.companyName,
        collegeName: formState.collegeName,
        techStack: formState.techStack,
      });
      if (result.quote) {
        setFormState((prev) => ({ ...prev, quote: result.quote }));
        toast({ title: 'Quote generated successfully!' });
      } else {
        throw new Error('Failed to generate quote.');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate a new quote. Please try again.',
      });
    }
    setIsGenerating(false);
  };

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle>Profile Input</CardTitle>
        <CardDescription>Fill in your details to generate your README.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={formState.name} onChange={handleChange} placeholder="Your Name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="githubUsername">GitHub Username</Label>
          <Input id="githubUsername" name="githubUsername" value={formState.githubUsername} onChange={handleChange} placeholder="your-username" />
        </div>
        <div className="space-y-3">
          <Label>Role</Label>
          <RadioGroup name="role" value={formState.role} onValueChange={handleRadioChange('role')} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="student" id="student" />
              <Label htmlFor="student" className="font-normal">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="professional" id="professional" />
              <Label htmlFor="professional" className="font-normal">Working Professional</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label htmlFor="domain">Domain</Label>
          <Input id="domain" name="domain" value={formState.domain} onChange={handleChange} placeholder="e.g. Frontend Development, AI/ML" />
        </div>
        {formState.role === 'professional' && (
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" name="companyName" value={formState.companyName} onChange={handleChange} placeholder="Your Company" />
          </div>
        )}
        {formState.role === 'student' && (
          <div className="space-y-2">
            <Label htmlFor="collegeName">College Name</Label>
            <Input id="collegeName" name="collegeName" value={formState.collegeName} onChange={handleChange} placeholder="Your College" />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="techStack">Tech Stack</Label>
          <Textarea id="techStack" name="techStack" value={formState.techStack} onChange={handleChange} placeholder="e.g. javascript,python,react" />
          <p className="text-xs text-muted-foreground">Comma-separated list of tech. No spaces.</p>
        </div>

        <Card className="bg-background/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Customization</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
              <Label htmlFor="statsTheme">Stats Theme</Label>
                <Select name="statsTheme" value={formState.statsTheme} onValueChange={handleSelectChange('statsTheme')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dracula">Dracula</SelectItem>
                    <SelectItem value="github_dark">GitHub Dark</SelectItem>
                    <SelectItem value="tokyonight">Tokyo Night</SelectItem>
                    <SelectItem value="gruvbox">Gruvbox</SelectItem>
                  </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
              <Label htmlFor="techIconsStyle">Icon Style</Label>
                <Select name="techIconsStyle" value={formState.techIconsStyle} onValueChange={handleSelectChange('techIconsStyle')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                  </SelectContent>
                </Select>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="showTrophies">Show Trophies</Label>
              <Switch id="showTrophies" checked={formState.showTrophies} onCheckedChange={handleSwitchChange('showTrophies')} />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="showStreak">Show Streak</Label>
              <Switch id="showStreak" checked={formState.showStreak} onCheckedChange={handleSwitchChange('showStreak')} />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="showContribution">Show Contribution Graph</Label>
              <Switch id="showContribution" checked={formState.showContribution} onCheckedChange={handleSwitchChange('showContribution')} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-background/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Socials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Linkedin className="h-5 w-5 text-muted-foreground"/>
              <Input id="linkedin" name="linkedin" value={formState.socials.linkedin} onChange={handleSocialChange} placeholder="linkedin-username" />
            </div>
            <div className="flex items-center gap-3">
              <Twitter className="h-5 w-5 text-muted-foreground"/>
              <Input id="twitter" name="twitter" value={formState.socials.twitter} onChange={handleSocialChange} placeholder="twitter-handle" />
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground"/>
              <Input id="website" name="website" value={formState.socials.website} onChange={handleSocialChange} placeholder="https://your-website.com" />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="quote">Quote</Label>
            <Button variant="ghost" size="sm" onClick={handleGenerateQuote} disabled={isGenerating}>
              {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 text-accent" />}
              Generate with AI
            </Button>
          </div>
          <Textarea id="quote" name="quote" value={formState.quote} onChange={handleChange} placeholder="A cool quote for your profile" />
        </div>
      </CardContent>
    </Card>
  );
}
