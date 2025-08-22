import type { FormState } from './types';
import { generateIconUrl, generateMultipleIconUrls, getBadgeDimensions } from './icon-services';
import { getContributionGraphTheme } from './theme-utils';

export function generateReadmeMarkdown(state: FormState): string {
  const {
    name,
    githubUsername,
    role,
    domain,
    companyName,
    companyUrl,
    collegeName,
    bio,
    techStack,
    socials,
    statsTheme,
    techIconsStyle,
    iconService,
    showTrophies,
    showStreak,
    showContribution,
    quote,
  } = state;

  const intro = `# Hi 👋, I'm ${name}\n\n*${quote}*\n\n`;

  let aboutMe = `## 👨‍💻 About Me\n\n${bio}\n\n`;
  if (role === 'student') {
    aboutMe += `- 🎓 I'm a student at **${collegeName || 'my university'}**, studying **${domain || 'my field'}**.\n`;
  } else if (role === 'professional') {
    let companyInfo = `**${companyName || 'my company'}**`;
    if (companyUrl) {
      companyInfo = `[${companyInfo}](${companyUrl})`;
    }
    aboutMe += `- 💻 I'm a **${domain || 'professional'}** at ${companyInfo}.\n`;
  } else if (role === 'freelancer') {
    aboutMe += `- 🚀 I'm a freelancer specializing in **${domain || 'my field'}**.\n`;
  }
  aboutMe += `- 🚀 I'm passionate about building cool things with modern technologies.\n`;

  // Generate tech stack section with professional sizing and spacing
  const techNames = techStack.split(',').filter(Boolean);
  let techSection = '## 🛠️ My Tech Stack  \n\n';
  
  // Individual badges with proper spacing
  const urls = generateMultipleIconUrls(iconService, techNames, techIconsStyle);
  const dimensions = getBadgeDimensions(iconService, techIconsStyle);
  
  techSection += `<div align="left">\n`;
  
  if (iconService === 'shields') {
    // Shields badges with proper spacing and alignment
    const spacing = dimensions.height > 20 ? '&nbsp;&nbsp;' : '&nbsp;';
    techSection += urls
      .map((u, i) => `  <img src="${u}" alt="${techNames[i] || 'Tech'}" height="${dimensions.height}"/>`)
      .join(spacing) + '\n';
  } else {
    // Devicon and TechIcons with standard spacing
    techSection += urls
      .map((u, i) => `  <img src="${u}" alt="${techNames[i] || 'Tech'}" width="${dimensions.width}" height="${dimensions.height}"/>`)
      .join(' ') + '\n';
  }
  
  techSection += `</div>\n\n`;

  const socialSection = "## 📫 Let's Connect\n\n" + 
    Object.entries(socials)
      .filter(([, value]) => value)
      .map(([key, value]) => {
        switch (key) {
          case 'linkedin':
            return `[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/${value}/)`;
          case 'twitter':
            return `[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${value})`;
          case 'website':
            return `[![Website](https://img.shields.io/badge/Website-_?style=for-the-badge&logo=rss&logoColor=white)](${value})`;
          case 'email':
            return `[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${value})`;
          default:
            return '';
        }
      })
      .join(' ')+'\n\n';

  const statsSection = `## 📊 My GitHub Stats\n\n`
    + `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${githubUsername}&theme=${statsTheme}&show_icons=true&count_private=true)\n`
    + `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&theme=${statsTheme}&layout=compact)\n\n`;

  const trophiesSection = showTrophies ? `![GitHub Trophies](https://github-profile-trophy.vercel.app/?username=${githubUsername}&theme=${statsTheme}&column=7)\n\n` : '';

  const streakSection = showStreak ? `![GitHub Streak](https://streak-stats.demolab.com/?user=${githubUsername}&theme=${statsTheme})\n\n` : '';

  const contributionSection = showContribution ? `## 📈 Contribution Graph\n\n![Contribution Graph](https://github-readme-activity-graph.vercel.app/graph?username=${githubUsername}&theme=${getContributionGraphTheme(statsTheme)})\n\n` : '';


  return [
    intro,
    aboutMe,
    socialSection.trim() === "## 📫 Let's Connect" ? '' : socialSection,
    techSection,
    statsSection,
    trophiesSection,
    streakSection,
    contributionSection
  ].join('');
}
