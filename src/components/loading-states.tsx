'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Skeleton loading component
export function SkeletonLoader({ className = '' }: { className?: string }) {
  return <Skeleton className={`h-4 w-full rounded ${className}`} />;
}

// Form skeleton loading
export function FormSkeleton() {
  return (
    <Card className="border-border/60">
      <CardHeader>
        <SkeletonLoader className="h-6 w-32" />
        <SkeletonLoader className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <SkeletonLoader className="h-4 w-20" />
            <SkeletonLoader className="h-10 w-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// Preview skeleton loading
export function PreviewSkeleton() {
  return (
    <Card className="border-border/60">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <SkeletonLoader className="h-6 w-24" />
            <SkeletonLoader className="h-4 w-40 mt-1" />
          </div>
          <div className="flex gap-2">
            <SkeletonLoader className="h-9 w-9 rounded-md" />
            <SkeletonLoader className="h-9 w-9 rounded-md" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <SkeletonLoader className="h-8 w-48 mb-2" />
            <SkeletonLoader className="h-5 w-80" />
          </div>
          
          <div>
            <SkeletonLoader className="h-6 w-32 mb-2" />
            <SkeletonLoader className="h-4 w-full mb-1" />
            <SkeletonLoader className="h-4 w-3/4" />
          </div>
          
          <div>
            <SkeletonLoader className="h-6 w-32 mb-2" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonLoader key={i} className="h-7 w-20" />
              ))}
            </div>
          </div>
          
          <div>
            <SkeletonLoader className="h-6 w-32 mb-2" />
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonLoader key={i} className="h-10 w-10 rounded" />
              ))}
            </div>
          </div>
          
          <div>
            <SkeletonLoader className="h-6 w-32 mb-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SkeletonLoader className="h-36 w-full" />
              <SkeletonLoader className="h-36 w-full" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Loading spinner component
export function LoadingSpinner({ size = 'default', className = '' }: { size?: 'sm' | 'default' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]} ${className}`} />
  );
}

// Loading overlay component
export function LoadingOverlay({ 
  isLoading, 
  children, 
  message = 'Loading...' 
}: { 
  isLoading: boolean; 
  children: React.ReactNode; 
  message?: string; 
}) {
  if (!isLoading) return <>{children}</>;

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center z-50">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
        </div>
      </div>
    </div>
  );
}

// Button loading state
export function LoadingButton({ 
  loading, 
  children, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  loading?: boolean; 
  children: React.ReactNode; 
}) {
  return (
    <button 
      {...props} 
      disabled={loading || props.disabled}
      className={`inline-flex items-center justify-center gap-2 ${props.className || ''}`}
    >
      {loading && <LoadingSpinner size="sm" />}
      {children}
    </button>
  );
}

// Image loading skeleton
export function ImageSkeleton({ width, height, className = '' }: { 
  width: number; 
  height: number; 
  className?: string; 
}) {
  return (
    <div 
      className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded ${className}`}
      style={{ width, height }}
    />
  );
}

// Tech stack skeleton
export function TechStackSkeleton() {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <ImageSkeleton key={i} width={40} height={40} className="rounded" />
      ))}
    </div>
  );
}

// Stats skeleton
export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ImageSkeleton width={450} height={150} className="rounded" />
      <ImageSkeleton width={450} height={150} className="rounded" />
    </div>
  );
}
