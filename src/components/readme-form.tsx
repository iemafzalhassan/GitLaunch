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
import { Loader2, Sparkles, Linkedin, Twitter, Globe, Mail } from 'lucide-react';
import { TechStackPicker } from './tech-stack-picker';
import { ICON_SERVICES } from '@/lib/icon-services';
import type { IconService } from '@/lib/icon-services';
import { cn } from '@/lib/utils';

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
        <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formState.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              rows={3}
            />
        </div>
        <div className="space-y-2">
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
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="freelancer" id="freelancer" />
              <Label htmlFor="freelancer" className="font-normal">Freelancer</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label htmlFor="domain">Domain</Label>
          <Input id="domain" name="domain" value={formState.domain} onChange={handleChange} placeholder="e.g. Frontend Development, AI/ML" />
        </div>
        {formState.role === 'professional' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" name="companyName" value={formState.companyName} onChange={handleChange} placeholder="Your Company" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyUrl">Company Website</Label>
              <Input id="companyUrl" name="companyUrl" value={formState.companyUrl} onChange={handleChange} placeholder="https://your.company" />
            </div>
          </>
        )}
        {formState.role === 'student' && (
          <div className="space-y-2">
            <Label htmlFor="collegeName">College Name</Label>
            <Input id="collegeName" name="collegeName" value={formState.collegeName} onChange={handleChange} placeholder="Your College" />
          </div>
        )}
        
        <TechStackPicker formState={formState} setFormState={setFormState} />
        
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
                    <SelectItem value="gruvbox">Gruvbox</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="radical">Radical</SelectItem>
                    <SelectItem value="merko">Merko</SelectItem>
                    <SelectItem value="tokyonight">Tokyo Night</SelectItem>
                    <SelectItem value="onedark">One Dark</SelectItem>
                    <SelectItem value="cobalt">Cobalt</SelectItem>
                    <SelectItem value="synthwave">Synthwave</SelectItem>
                    <SelectItem value="highcontrast">High Contrast</SelectItem>
                    <SelectItem value="prussian">Prussian</SelectItem>
                    <SelectItem value="monokai">Monokai</SelectItem>
                    <SelectItem value="vue">Vue</SelectItem>
                    <SelectItem value="vue-dark">Vue Dark</SelectItem>
                    <SelectItem value="shadownomicon">Shadownomicon</SelectItem>
                    <SelectItem value="graywhite">Gray White</SelectItem>
                    <SelectItem value="vision-friendly-dark">Vision Friendly Dark</SelectItem>
                    <SelectItem value="ayu-mirage">Ayu Mirage</SelectItem>
                    <SelectItem value="midnight-purple">Midnight Purple</SelectItem>
                    <SelectItem value="calm">Calm</SelectItem>
                    <SelectItem value="flag-india">Flag India</SelectItem>
                    <SelectItem value="omni">Omni</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="jolly">Jolly</SelectItem>
                    <SelectItem value="maroongold">Maroon Gold</SelectItem>
                    <SelectItem value="yeblu">Yeblu</SelectItem>
                    <SelectItem value="blue-green">Blue Green</SelectItem>
                    <SelectItem value="amethyst">Amethyst</SelectItem>
                    <SelectItem value="buefy">Buefy</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="slateorange">Slate Orange</SelectItem>
                    <SelectItem value="kacho_ga">Kacho Ga</SelectItem>
                    <SelectItem value="outrun">Outrun</SelectItem>
                    <SelectItem value="chartreuse-dark">Chartreuse Dark</SelectItem>
                    <SelectItem value="github_dark">GitHub Dark</SelectItem>
                    <SelectItem value="github_light">GitHub Light</SelectItem>
                    <SelectItem value="solarized-light">Solarized Light</SelectItem>
                    <SelectItem value="solarized_dark">Solarized Dark</SelectItem>
                    <SelectItem value="gotham">Gotham</SelectItem>
                    <SelectItem value="material-palenight">Material Palenight</SelectItem>
                    <SelectItem value="algolia">Algolia</SelectItem>
                    <SelectItem value="great-gatsby">Great Gatsby</SelectItem>
                    <SelectItem value="nord">Nord</SelectItem>
                    <SelectItem value="catppuccin">Catppuccin</SelectItem>
                    <SelectItem value="bear">Bear</SelectItem>
                    <SelectItem value="swift">Swift</SelectItem>
                    <SelectItem value="aura">Aura</SelectItem>
                    <SelectItem value="aura-dark">Aura Dark</SelectItem>
                    <SelectItem value="whatsapp-dark">WhatsApp Dark</SelectItem>
                  </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="iconService">Icon Service</Label>
              <div
                role="radiogroup"
                aria-label="Icon Service"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr"
              >
                {Object.entries(ICON_SERVICES).map(([key, service]) => {
                  const selected = formState.iconService === (key as IconService);
                  return (
                    <button
                      key={key}
                      role="radio"
                      aria-checked={selected}
                      type="button"
                      title={service.name}
                      onClick={() =>
                        setFormState((prev) => ({ ...prev, iconService: key as IconService }))
                      }
                      className={cn(
                        'group relative w-full h-full rounded-xl border bg-background/60 p-4 text-left shadow-sm transition-colors',
                        selected
                          ? 'border-accent ring-2 ring-accent/30'
                          : 'border-border hover:border-accent/40'
                      )}
                    >
                      <div className="flex items-center gap-2 pr-10">
                        <span className="font-medium text-sm truncate">{service.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 h-10 overflow-hidden text-ellipsis">
                        {service.description}
                      </div>
                      <span
                        className={cn(
                          'absolute right-2 top-2 rounded px-1.5 py-0.5 text-[10px] bg-foreground/10',
                          selected && 'bg-accent text-background'
                        )}
                      >
                        {service.supportsThemes ? 'Themes' : 'SVG'}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                {formState.iconService === 'skillicons'
                  ? 'Dark/Light styles apply to SkillIcons.'
                  : 'This service does not support themes; icons are rendered as-is.'}
              </p>
            </div>
             <div className="space-y-2">
              <Label htmlFor="techIconsStyle">Icon Style</Label>
                <Select
                  name="techIconsStyle"
                  value={formState.techIconsStyle}
                  onValueChange={handleSelectChange('techIconsStyle')}
                  disabled={formState.iconService !== 'skillicons'}
                >
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
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground"/>
              <Input id="email" name="email" type="email" value={formState.socials.email} onChange={handleSocialChange} placeholder="your.email@example.com" />
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
