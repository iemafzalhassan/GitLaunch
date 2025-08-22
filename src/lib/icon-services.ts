export type IconService = 'devicon' | 'techicons' | 'shields';

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
  },
  shields: {
    name: 'Shields.io',
    baseUrl: 'https://img.shields.io/badge',
    description: 'Customizable badges with logos, colors, and styles',
    iconCount: 500,
    supportsThemes: true,
    themes: ['flat', 'flat-square', 'plastic', 'for-the-badge', 'social'],
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

// Badge style configurations with standardized dimensions for professional appearance
export const BADGE_STYLES: Record<string, { 
  width: number; 
  height: number; 
  spacing: string;
  className: string;
}> = {
  'flat': { width: 85, height: 20, spacing: 'gap-1.5', className: 'rounded-sm' },
  'flat-square': { width: 85, height: 20, spacing: 'gap-1.5', className: 'rounded-none' },
  'plastic': { width: 85, height: 20, spacing: 'gap-1.5', className: 'rounded-sm' },
  'for-the-badge': { width: 130, height: 28, spacing: 'gap-2', className: 'rounded-md' },
  'social': { width: 95, height: 20, spacing: 'gap-1.5', className: 'rounded-sm' },
};

// Shields.io configuration for tech stack badges
export const SHIELDS_CONFIG: Record<string, { 
  label: string; 
  logo: string; 
  color: string; 
  logoColor?: string;
}> = {
  // Languages
  javascript: { label: 'JavaScript', logo: 'javascript', color: 'F7DF1E', logoColor: 'black' },
  typescript: { label: 'TypeScript', logo: 'typescript', color: '3178C6' },
  python: { label: 'Python', logo: 'python', color: '3776AB' },
  java: { label: 'Java', logo: 'openjdk', color: 'ED8B00' },
  cs: { label: 'C%23', logo: 'csharp', color: '239120' },
  golang: { label: 'Go', logo: 'go', color: '00ADD8' },
  rust: { label: 'Rust', logo: 'rust', color: '000000' },
  ruby: { label: 'Ruby', logo: 'ruby', color: 'CC342D' },
  php: { label: 'PHP', logo: 'php', color: '777BB4' },
  c: { label: 'C', logo: 'c', color: 'A8B9CC' },
  cpp: { label: 'C%2B%2B', logo: 'cplusplus', color: '00599C' },
  swift: { label: 'Swift', logo: 'swift', color: 'FA7343' },
  kotlin: { label: 'Kotlin', logo: 'kotlin', color: '7F52FF' },
  dart: { label: 'Dart', logo: 'dart', color: '0175C2' },
  
  // Frontend
  react: { label: 'React', logo: 'react', color: '61DAFB', logoColor: 'black' },
  angular: { label: 'Angular', logo: 'angular', color: 'DD0031' },
  vue: { label: 'Vue.js', logo: 'vuedotjs', color: '4FC08D' },
  svelte: { label: 'Svelte', logo: 'svelte', color: 'FF3E00' },
  nextjs: { label: 'Next.js', logo: 'nextdotjs', color: '000000' },
  nuxtjs: { label: 'Nuxt.js', logo: 'nuxtdotjs', color: '00DC82' },
  gatsby: { label: 'Gatsby', logo: 'gatsby', color: '663399' },
  tailwindcss: { label: 'Tailwind CSS', logo: 'tailwindcss', color: '06B6D4' },
  bootstrap: { label: 'Bootstrap', logo: 'bootstrap', color: '7952B3' },
  sass: { label: 'Sass', logo: 'sass', color: 'CC6699' },
  
  // Backend
  nodejs: { label: 'Node.js', logo: 'nodedotjs', color: '339933' },
  express: { label: 'Express.js', logo: 'express', color: '000000' },
  nestjs: { label: 'NestJS', logo: 'nestjs', color: 'E0234E' },
  django: { label: 'Django', logo: 'django', color: '092E20' },
  flask: { label: 'Flask', logo: 'flask', color: '000000' },
  fastapi: { label: 'FastAPI', logo: 'fastapi', color: '009688' },
  rails: { label: 'Ruby on Rails', logo: 'rubyonrails', color: 'CC0000' },
  spring: { label: 'Spring', logo: 'spring', color: '6DB33F' },
  laravel: { label: 'Laravel', logo: 'laravel', color: 'FF2D20' },
  
  // Databases
  mongodb: { label: 'MongoDB', logo: 'mongodb', color: '47A248' },
  mysql: { label: 'MySQL', logo: 'mysql', color: '4479A1' },
  postgresql: { label: 'PostgreSQL', logo: 'postgresql', color: '4169E1' },
  redis: { label: 'Redis', logo: 'redis', color: 'DC382D' },
  sqlite: { label: 'SQLite', logo: 'sqlite', color: '003B57' },
  firebase: { label: 'Firebase', logo: 'firebase', color: 'FFCA28', logoColor: 'black' },
  supabase: { label: 'Supabase', logo: 'supabase', color: '3ECF8E' },
  
  // DevOps & Cloud
  docker: { label: 'Docker', logo: 'docker', color: '2496ED' },
  kubernetes: { label: 'Kubernetes', logo: 'kubernetes', color: '326CE5' },
  aws: { label: 'AWS', logo: 'amazonwebservices', color: '232F3E' },
  azure: { label: 'Azure', logo: 'microsoftazure', color: '0078D4' },
  gcp: { label: 'Google Cloud', logo: 'googlecloud', color: '4285F4' },
  heroku: { label: 'Heroku', logo: 'heroku', color: '430098' },
  vercel: { label: 'Vercel', logo: 'vercel', color: '000000' },
  netlify: { label: 'Netlify', logo: 'netlify', color: '00C7B7' },
  
  // Tools
  git: { label: 'Git', logo: 'git', color: 'F05032' },
  github: { label: 'GitHub', logo: 'github', color: '181717' },
  vscode: { label: 'VS Code', logo: 'visualstudiocode', color: '007ACC' },
  figma: { label: 'Figma', logo: 'figma', color: 'F24E1E' },
  
  // Testing
  jest: { label: 'Jest', logo: 'jest', color: 'C21325' },
  cypress: { label: 'Cypress', logo: 'cypress', color: '17202C' },
  selenium: { label: 'Selenium', logo: 'selenium', color: '43B02A' },
  
  // Additional popular technologies
  bash: { label: 'Bash', logo: 'gnubash', color: '4EAA25' },
  r: { label: 'R', logo: 'r', color: '276DC3' },
  perl: { label: 'Perl', logo: 'perl', color: '39457E' },
  android: { label: 'Android', logo: 'android', color: '3DDC84' },
  flutter: { label: 'Flutter', logo: 'flutter', color: '02569B' },
  ionic: { label: 'Ionic', logo: 'ionic', color: '3880FF' },
  xamarin: { label: 'Xamarin', logo: 'xamarin', color: '3498DB' },
  cassandra: { label: 'Cassandra', logo: 'apachecassandra', color: '1287B1' },
  couchdb: { label: 'CouchDB', logo: 'couchdb', color: 'E42528' },
  dynamodb: { label: 'DynamoDB', logo: 'amazondynamodb', color: '4053D6' },
  mariadb: { label: 'MariaDB', logo: 'mariadb', color: '003545' },
  neo4j: { label: 'Neo4j', logo: 'neo4j', color: '008CC1' },
  influxdb: { label: 'InfluxDB', logo: 'influxdb', color: '22ADF6' },
  rabbitmq: { label: 'RabbitMQ', logo: 'rabbitmq', color: 'FF6600' },
  apache: { label: 'Apache', logo: 'apache', color: 'D22128' },
  nginx: { label: 'Nginx', logo: 'nginx', color: '009639' },
  jenkins: { label: 'Jenkins', logo: 'jenkins', color: 'D24939' },
  githubactions: { label: 'GitHub Actions', logo: 'githubactions', color: '2088FF' },
  gitlab: { label: 'GitLab', logo: 'gitlab', color: 'FC6D26' },
  circleci: { label: 'CircleCI', logo: 'circleci', color: '343434' },
  travisci: { label: 'Travis CI', logo: 'travisci', color: '3EAAAF' },
  prometheus: { label: 'Prometheus', logo: 'prometheus', color: 'E6522C' },
  grafana: { label: 'Grafana', logo: 'grafana', color: 'F46800' },
  elastic: { label: 'Elasticsearch', logo: 'elasticsearch', color: '005571' },
  kibana: { label: 'Kibana', logo: 'kibana', color: '005571' },
  logstash: { label: 'Logstash', logo: 'logstash', color: '005571' },
  d3: { label: 'D3.js', logo: 'd3dotjs', color: 'F9A03C' },
  threejs: { label: 'Three.js', logo: 'threedotjs', color: '000000' },
  jquery: { label: 'jQuery', logo: 'jquery', color: '0769AD' },
  webpack: { label: 'Webpack', logo: 'webpack', color: '8DD6F9' },
  vite: { label: 'Vite', logo: 'vite', color: '646CFF' },
  rollup: { label: 'Rollup', logo: 'rollupdotjs', color: 'EC4A3F' },
  parcel: { label: 'Parcel', logo: 'parcel', color: 'E7A93F' },
  storybook: { label: 'Storybook', logo: 'storybook', color: 'FF4785' },
  prisma: { label: 'Prisma', logo: 'prisma', color: '2D3748' },
  graphql: { label: 'GraphQL', logo: 'graphql', color: 'E10098' },
  apollo: { label: 'Apollo GraphQL', logo: 'apollographql', color: '311C87' },
  postman: { label: 'Postman', logo: 'postman', color: 'FF6C37' },
  insomnia: { label: 'Insomnia', logo: 'insomnia', color: '4000BF' },
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
    
    case 'shields':
      // Shields.io uses badge format with customizable styles
      const tech = techNames[0] || 'javascript';
      const shieldConfig = SHIELDS_CONFIG[tech.toLowerCase()];
      if (!shieldConfig) {
        // Fallback for unknown technologies
        return `${config.baseUrl}/${encodeURIComponent(tech)}-blue?style=${theme || 'flat'}&logo=${tech.toLowerCase()}`;
      }
      
      const style = theme || 'flat';
      const logoColor = shieldConfig.logoColor ? `&logoColor=${shieldConfig.logoColor}` : '';
      return `${config.baseUrl}/${encodeURIComponent(shieldConfig.label)}-${shieldConfig.color}?style=${style}&logo=${shieldConfig.logo}${logoColor}`;
    
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
    case 'shields':
      return techNames.map((n) => generateIconUrl('shields', [n], theme));
    default:
      return [];
  }
}

// Get standardized dimensions for different services and styles
export function getBadgeDimensions(service: IconService, style?: string) {
  if (service === 'shields' && style && BADGE_STYLES[style]) {
    return BADGE_STYLES[style];
  }
  
  // Default dimensions for other services (Devicon, TechIcons)
  return {
    width: 40,
    height: 40,
    spacing: 'gap-2',
    className: 'rounded'
  };
}
