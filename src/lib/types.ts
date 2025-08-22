import type { IconService } from './icon-services';

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
    email: string;
  };
  statsTheme:
    | 'dracula'
    | 'gruvbox'
    | 'dark'
    | 'radical'
    | 'merko'
    | 'tokyonight'
    | 'onedark'
    | 'cobalt'
    | 'synthwave'
    | 'highcontrast'
    | 'prussian'
    | 'monokai'
    | 'vue'
    | 'vue-dark'
    | 'shadownomicon'
    | 'graywhite'
    | 'vision-friendly-dark'
    | 'ayu-mirage'
    | 'midnight-purple'
    | 'calm'
    | 'flag-india'
    | 'omni'
    | 'react'
    | 'jolly'
    | 'maroongold'
    | 'yeblu'
    | 'blue-green'
    | 'amethyst'
    | 'buefy'
    | 'blue'
    | 'slateorange'
    | 'kacho_ga'
    | 'outrun'
    | 'chartreuse-dark'
    | 'github_dark'
    | 'github_light'
    | 'solarized-light'
    | 'solarized_dark'
    | 'gotham'
    | 'material-palenight'
    | 'algolia'
    | 'great-gatsby'
    | 'nord'
    | 'catppuccin'
    | 'bear'
    | 'swift'
    | 'aura'
    | 'aura-dark'
    | 'whatsapp-dark';
  techIconsStyle: 'flat' | 'flat-square' | 'plastic' | 'for-the-badge' | 'social';
  iconService: IconService;
  showTrophies: boolean;
  showStreak: boolean;
  showContribution: boolean;
  quote: string;
}
