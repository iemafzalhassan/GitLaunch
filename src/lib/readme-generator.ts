import type { FormState } from './types';

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

  const techSection = `## 🛠️ My Tech Stack\n\n![My Tech Stack](https://skillicons.dev/icons?i=${techStack}&theme=${techIconsStyle})\n\n`;

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

  const getContributionGraphTheme = () => {
    const themeMap: { [key: string]: string } = {
      dracula: 'dracula',
      gruvbox: 'gruvbox',
      dark: 'github-dark',
      radical: 'radical',
      merko: 'merko',
      tokyonight: 'tokyo-night',
      onedark: 'one_dark',
      cobalt: 'cobalt',
      synthwave: 'synthwave',
      highcontrast: 'high-contrast',
      prussian: 'prussian',
      monokai: 'monokai',
      vue: 'vue',
      'vue-dark': 'vue-dark',
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
      'github_light': 'github-light',
      'solarized-light': 'solarized_light',
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
      'aura-dark': 'aura-dark',
      'whatsapp-dark': 'whatsapp-dark',
    };
    return themeMap[statsTheme as keyof typeof themeMap] || 'github-dark';
  }

  const contributionSection = showContribution ? `## 📈 Contribution Graph\n\n![Contribution Graph](https://github-readme-activity-graph.vercel.app/graph?username=${githubUsername}&theme=${getContributionGraphTheme()})\n\n` : '';


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
