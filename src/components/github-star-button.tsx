'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Github, Star } from "lucide-react";

interface GitHubStarButtonProps {
  repo: string; // Format: "username/repo"
  className?: string;
}

export function GitHubStarButton({ repo, className }: GitHubStarButtonProps) {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`);
        if (response.ok) {
          const data = await response.json();
          setStars(data.stargazers_count);
        }
      } catch (error) {
        console.error('Failed to fetch GitHub stars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStars();
  }, [repo]);

  const formatStars = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <Button variant="outline" size="sm" className="gap-2">
        <Github className="h-4 w-4" />
        <span className="hidden md:inline">Star on GitHub</span>
        <span className="sm:inline md:hidden">Star</span>
        <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs min-w-[2rem] justify-center">
          <Star className="h-3 w-3 fill-current" />
          {loading ? (
            <div className="w-4 h-3 bg-muted-foreground/20 rounded animate-pulse" />
          ) : (
            <span>{stars !== null ? formatStars(stars) : '★'}</span>
          )}
        </div>
      </Button>
    </a>
  );
}

export function GitHubStarButtonMobile({ repo }: { repo: string }) {
  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button variant="outline" size="sm">
        <Github className="h-4 w-4" />
      </Button>
    </a>
  );
}