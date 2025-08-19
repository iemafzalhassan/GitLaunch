'use client';

import React, { useState, Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { ReadmeForm } from '@/components/readme-form';
import { ReadmePreview } from '@/components/readme-preview';
import { ErrorBoundary } from '@/components/error-boundary';
import { FormSkeleton, PreviewSkeleton } from '@/components/loading-states';
import type { FormState } from '@/lib/types';

export default function Home() {
  const [formState, setFormState] = useState<FormState>({
    name: 'Your Name',
    githubUsername: 'your-username',
    role: 'professional',
    domain: 'Software Engineering',
    companyName: '',
    companyUrl: '',
    collegeName: '',
    bio: 'I am a passionate developer who loves to build amazing things.',
    techStack: 'react,nextjs,nodejs,tailwindcss,typescript',
    socials: {
      linkedin: '',
      twitter: '',
      website: '',
      email: '',
    },
    statsTheme: 'dracula',
    techIconsStyle: 'dark',
    iconService: 'skillicons',
    showTrophies: true,
    showStreak: true,
    showContribution: true,
    quote: 'Building the future, one line of code at a time.',
  });

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto p-4 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-full">
              <Suspense fallback={<FormSkeleton />}>
                <ErrorBoundary>
                  <ReadmeForm formState={formState} setFormState={setFormState} />
                </ErrorBoundary>
              </Suspense>
            </div>
            <div className="w-full lg:sticky lg:top-8 lg:self-start">
              <Suspense fallback={<PreviewSkeleton />}>
                <ErrorBoundary>
                  <ReadmePreview formState={formState} />
                </ErrorBoundary>
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}
