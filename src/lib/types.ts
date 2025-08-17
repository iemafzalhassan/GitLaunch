export interface FormState {
  name: string;
  githubUsername: string;
  role: 'student' | 'professional' | 'freelancer';
  domain: string;
  companyName: string;
  companyUrl: string;
  collegeName: string;
  bio: string;
  techStack: string;
  socials: {
    linkedin: string;
    twitter: string;
    website: string;
  };
  statsTheme: 'dracula' | 'github_dark' | 'tokyonight' | 'gruvbox';
  techIconsStyle: 'dark' | 'light';
  showTrophies: boolean;
  showStreak: boolean;
  showContribution: boolean;
  quote: string;
}
