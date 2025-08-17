import { technologies } from './tech-stack-data';
import { extendedTechnologies } from './extended-tech-stack-data';
import type { IconService } from './icon-services';
import { mapToDevicon } from './icon-services';

export interface Technology {
  name: string;
  category: string;
}

/**
 * Get available technologies based on the selected icon service
 * Ensures no duplicates when combining base and extended technologies
 */
export function getAvailableTechnologies(iconService: IconService): Technology[] {
  if (iconService === 'skillicons') {
    return technologies;
  }
  
  // For Devicon and TechIcons, combine and deduplicate
  const baseTechNames = new Set(technologies.map(tech => tech.name));
  const uniqueExtendedTechs = extendedTechnologies.filter(
    tech => !baseTechNames.has(tech.name)
  );

  const combined = [...technologies, ...uniqueExtendedTechs];

  // Known unsupported tech names in Devicon/TechIcons (no official icon in devicons/devicon)
  const unsupported = new Set<string>([
    'tableau',
    'powerbi',
    'splunk',
    'openshift',
    'argocd',
  ]);

  // Keep only techs that map to a plausible Devicon slug and aren't on the unsupported list
  return combined.filter((t) => {
    if (unsupported.has(t.name)) return false;
    const { slug } = mapToDevicon(t.name);
    // heuristic: devicon slugs are lowercase alphanum with possible hyphens; if mapping produced something, allow it
    return /^[a-z0-9-]+$/.test(slug);
  });
}

/**
 * Get technologies by category
 */
export function getTechnologiesByCategory(iconService: IconService) {
  const allTechs = getAvailableTechnologies(iconService);
  const grouped: Record<string, Technology[]> = {};
  
  allTechs.forEach(tech => {
    if (!grouped[tech.category]) {
      grouped[tech.category] = [];
    }
    grouped[tech.category].push(tech);
  });
  
  return grouped;
}

/**
 * Get technology count by category
 */
export function getTechnologyCounts(iconService: IconService) {
  const grouped = getTechnologiesByCategory(iconService);
  const counts: Record<string, number> = {};
  
  Object.keys(grouped).forEach(category => {
    counts[category] = grouped[category].length;
  });
  
  return counts;
}

/**
 * Get total technology count for an icon service
 */
export function getTotalTechnologyCount(iconService: IconService): number {
  return getAvailableTechnologies(iconService).length;
}

/**
 * Check if a technology is available in the selected icon service
 */
export function isTechnologyAvailable(techName: string, iconService: IconService): boolean {
  const availableTechs = getAvailableTechnologies(iconService);
  return availableTechs.some(tech => tech.name === techName);
}
