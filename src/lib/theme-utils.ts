// Theme mapping utilities to avoid code duplication

export const STATS_THEMES = [
  'dracula',
  'gruvbox',
  'dark',
  'radical',
  'merko',
  'tokyonight',
  'onedark',
  'cobalt',
  'synthwave',
  'highcontrast',
  'prussian',
  'monokai',
  'vue',
  'vue-dark',
  'shadownomicon',
  'graywhite',
  'vision-friendly-dark',
  'ayu-mirage',
  'midnight-purple',
  'calm',
  'flag-india',
  'omni',
  'react',
  'jolly',
  'maroongold',
  'yeblu',
  'blue-green',
  'amethyst',
  'buefy',
  'blue',
  'slateorange',
  'kacho_ga',
  'outrun',
  'chartreuse-dark',
  'github_dark',
  'github_light',
  'solarized-light',
  'solarized_dark',
  'gotham',
  'material-palenight',
  'algolia',
  'great-gatsby',
  'nord',
  'catppuccin',
  'bear',
  'swift',
  'aura',
  'aura-dark',
  'whatsapp-dark',
] as const;

export type StatsTheme = typeof STATS_THEMES[number];

// Contribution graph theme mapping
const CONTRIBUTION_THEME_MAP: Record<StatsTheme, string> = {
  dracula: 'dracula',
  gruvbox: 'gruvbox',
  dark: 'github_dark',
  radical: 'radical',
  merko: 'merko',
  tokyonight: 'tokyo_night',
  onedark: 'one_dark',
  cobalt: 'cobalt',
  synthwave: 'synthwave',
  highcontrast: 'highcontrast',
  prussian: 'prussian',
  monokai: 'monokai',
  vue: 'vue',
  'vue-dark': 'vue_dark',
  shadownomicon: 'shadownomicon',
  graywhite: 'graywhite',
  'vision-friendly-dark': 'vision-friendly-dark',
  'ayu-mirage': 'ayu-mirage',
  'midnight-purple': 'midnight-purple',
  calm: 'calm',
  'flag-india': 'flag_india',
  omni: 'omni',
  react: 'react',
  jolly: 'jolly',
  maroongold: 'maroongold',
  yeblu: 'yeblu',
  'blue-green': 'blue-green',
  amethyst: 'amethyst',
  buefy: 'buefy',
  blue: 'blueberry',
  slateorange: 'slateorange',
  kacho_ga: 'kacho_ga',
  outrun: 'outrun',
  'chartreuse-dark': 'chartreuse-dark',
  'github_dark': 'github_dark',
  'github_light': 'github',
  'solarized-light': 'solarized',
  'solarized_dark': 'solarized_dark',
  gotham: 'gotham',
  'material-palenight': 'material-palenight',
  algolia: 'algolia',
  'great-gatsby': 'great-gatsby',
  nord: 'nord',
  catppuccin: 'catppuccin_latte',
  bear: 'bear',
  swift: 'swift',
  aura: 'aura',
  'aura-dark': 'aura_dark',
  'whatsapp-dark': 'whatsapp-dark',
};

/**
 * Get contribution graph theme from stats theme
 */
export function getContributionGraphTheme(statsTheme: StatsTheme): string {
  return CONTRIBUTION_THEME_MAP[statsTheme] || 'github_dark';
}

/**
 * Validate if a theme is valid
 */
export function isValidStatsTheme(theme: string): theme is StatsTheme {
  return STATS_THEMES.includes(theme as StatsTheme);
}

/**
 * Get theme display name
 */
export function getThemeDisplayName(theme: StatsTheme): string {
  return theme
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get theme options for select components
 */
export function getThemeOptions() {
  return STATS_THEMES.map(theme => ({
    value: theme,
    label: getThemeDisplayName(theme),
  }));
}
