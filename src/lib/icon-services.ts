export type IconService = 'skillicons' | 'devicon' | 'techicons';

export interface IconServiceConfig {
  name: string;
  baseUrl: string;
  description: string;
  iconCount: number;
  supportsThemes: boolean;
  themes: string[];
  format: 'svg' | 'png' | 'font';
}

export const ICON_SERVICES: Record<IconService, IconServiceConfig> = {
  skillicons: {
    name: 'SkillIcons.dev',
    baseUrl: 'https://skillicons.dev/icons',
    description: 'High-quality tech stack icons with theme support',
    iconCount: 150,
    supportsThemes: true,
    themes: ['dark', 'light'],
    format: 'svg'
  },
  devicon: {
    name: 'Devicon',
    // Devicon icons are served from JSDelivr CDN
    baseUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons',
    description: 'Comprehensive programming language and tool icons',
    iconCount: 200,
    supportsThemes: false,
    themes: [],
    format: 'svg'
  },
  techicons: {
    name: 'TechIcons.dev',
    baseUrl: 'https://techicons.dev/icons',
    description: 'SVG and PNG tech icons for modern development',
    iconCount: 200,
    supportsThemes: false,
    themes: [],
    format: 'svg'
  }
};

// Minimal mapping from our internal tech names to Devicon slugs and preferred variants
// Extend this as needed when you see missing icons
export const DEVICON_SLUG_MAP: Record<string, { slug: string; variant: 'original' | 'plain' } | undefined> = {
  // Languages
  cs: { slug: 'csharp', variant: 'original' },
  cpp: { slug: 'cplusplus', variant: 'original' },
  golang: { slug: 'go', variant: 'original' },
  bash: { slug: 'bash', variant: 'original' },
  r: { slug: 'r', variant: 'original' },
  // Frontend
  tailwindcss: { slug: 'tailwindcss', variant: 'plain' },
  mui: { slug: 'materialui', variant: 'original' },
  nextjs: { slug: 'nextjs', variant: 'original' },
  nuxtjs: { slug: 'nuxtjs', variant: 'original' },
  threejs: { slug: 'threejs', variant: 'original' },
  jquery: { slug: 'jquery', variant: 'original' },
  alpinejs: { slug: 'alpinejs', variant: 'original' },
  blazor: { slug: 'blazor', variant: 'original' },
  bulma: { slug: 'bulma', variant: 'plain' },
  chakraui: { slug: 'chakraui', variant: 'original' },
  materialize: { slug: 'materialize', variant: 'plain' },
  quasar: { slug: 'quasar', variant: 'original' },
  svelte: { slug: 'svelte', variant: 'original' },
  // Backend / Others
  nginx: { slug: 'nginx', variant: 'original' },
  apache: { slug: 'apache', variant: 'original' },
  kafka: { slug: 'apachekafka', variant: 'original' },
  graphql: { slug: 'graphql', variant: 'plain' },
  elastic: { slug: 'elasticsearch', variant: 'original' },
  d3: { slug: 'd3js', variant: 'plain' },
  postgresql: { slug: 'postgresql', variant: 'original' },
  mysql: { slug: 'mysql', variant: 'original' },
  mongodb: { slug: 'mongodb', variant: 'original' },
  redis: { slug: 'redis', variant: 'original' },
  sqlite: { slug: 'sqlite', variant: 'original' },
  docker: { slug: 'docker', variant: 'original' },
  kubernetes: { slug: 'kubernetes', variant: 'original' },
  aws: { slug: 'amazonwebservices', variant: 'original' },
  azure: { slug: 'azure', variant: 'original' },
  gcp: { slug: 'googlecloud', variant: 'original' },
  heroku: { slug: 'heroku', variant: 'original' },
  vercel: { slug: 'vercel', variant: 'original' },
  netlify: { slug: 'netlify', variant: 'original' },
  digitalocean: { slug: 'digitalocean', variant: 'original' },
  terraform: { slug: 'terraform', variant: 'original' },
  ansible: { slug: 'ansible', variant: 'original' },
  github: { slug: 'github', variant: 'original' },
  git: { slug: 'git', variant: 'original' },
  vscode: { slug: 'vscode', variant: 'original' },
  idea: { slug: 'intellij', variant: 'original' },
  ps: { slug: 'photoshop', variant: 'original' },
  ai: { slug: 'illustrator', variant: 'original' },
  maven: { slug: 'apachemaven', variant: 'original' },
  arch: { slug: 'archlinux', variant: 'original' },
  jest: { slug: 'jest', variant: 'plain' },
  cypress: { slug: 'cypressio', variant: 'plain' },
  selenium: { slug: 'selenium', variant: 'original' },
  storybook: { slug: 'storybook', variant: 'original' },
};

export function mapToDevicon(name: string): { slug: string; variant: 'original' | 'plain' } {
  const lower = name.toLowerCase();
  if (DEVICON_SLUG_MAP[lower]) return DEVICON_SLUG_MAP[lower]!;
  // Default guess: use given name and original variant
  return { slug: lower, variant: 'original' };
}

export function generateIconUrl(
  service: IconService,
  techNames: string[],
  theme?: string
): string {
  const config = ICON_SERVICES[service];
  
  switch (service) {
    case 'skillicons':
      const techParam = techNames.join(',');
      return theme 
        ? `${config.baseUrl}?i=${techParam}&theme=${theme}`
        : `${config.baseUrl}?i=${techParam}`;
    
    case 'devicon':
      // Devicon uses individual icon URLs from JSDelivr CDN
      const techName = techNames[0] || 'javascript';
      const { slug, variant } = mapToDevicon(techName);
      return `${config.baseUrl}/${slug}/${slug}-${variant}.svg`;
    
    case 'techicons':
      // TechIcons uses the Devicon icon set under the hood; use Devicon CDN slugs for reliability
      {
        const tech = techNames[0] || 'javascript';
        const { slug, variant } = mapToDevicon(tech);
        return `${ICON_SERVICES.devicon.baseUrl}/${slug}/${slug}-${variant}.svg`;
      }
    
    default:
      return '';
  }
}

export function generateMultipleIconUrls(
  service: IconService,
  techNames: string[],
  theme?: string
): string[] {
  switch (service) {
    case 'skillicons':
      // Return per-tech SkillIcons URLs so each icon can be sized consistently in Markdown
      return techNames.map((n) => generateIconUrl('skillicons', [n], theme));
    case 'devicon':
      return techNames.map((n) => {
        const { slug, variant } = mapToDevicon(n);
        return `${ICON_SERVICES.devicon.baseUrl}/${slug}/${slug}-${variant}.svg`;
      });
    case 'techicons':
      return techNames.map((n) => {
        const { slug, variant } = mapToDevicon(n);
        return `${ICON_SERVICES.devicon.baseUrl}/${slug}/${slug}-${variant}.svg`;
      });
    default:
      return [];
  }
}
