// Helper functions to parse data.md content

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  proficientIn: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface ProjectItem {
  title: string;
  tech: string[];
  description: string;
  github: string;
  live: string;
}

export const parseEducation = (content: string): EducationItem[] => {
  const items: EducationItem[] = [];
  const lines = content.split('\n');
  
  let currentItem: Partial<EducationItem> | null = null;
  
  for (const line of lines) {
    if (line.startsWith('## ') && !line.includes('Skills')) {
      if (currentItem && currentItem.institution) {
        items.push(currentItem as EducationItem);
      }
      currentItem = {
        institution: line.replace('## ', '').trim(),
        degree: '',
        period: '',
        proficientIn: ''
      };
    } else if (currentItem) {
      if (line.startsWith('**Degree:**')) {
        currentItem.degree = line.replace('**Degree:**', '').trim();
      } else if (line.startsWith('**Period:**')) {
        currentItem.period = line.replace('**Period:**', '').trim();
      } else if (line.startsWith('**Proficient In:**')) {
        currentItem.proficientIn = line.replace('**Proficient In:**', '').trim();
      }
    }
  }
  
  if (currentItem && currentItem.institution) {
    items.push(currentItem as EducationItem);
  }
  
  return items;
};

export const parseExperience = (content: string): ExperienceItem[] => {
  const items: ExperienceItem[] = [];
  const lines = content.split('\n');
  
  let currentItem: Partial<ExperienceItem> | null = null;
  
  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (currentItem && currentItem.company) {
        items.push(currentItem as ExperienceItem);
      }
      const parts = line.replace('## ', '').split('|').map(p => p.trim());
      currentItem = {
        company: parts[0] || '',
        role: parts[1] || '',
        period: '',
        description: []
      };
    } else if (currentItem) {
      if (line.startsWith('**Period:**')) {
        currentItem.period = line.replace('**Period:**', '').trim();
      } else if (line.startsWith('- ')) {
        currentItem.description = currentItem.description || [];
        currentItem.description.push(line.replace('- ', '').trim());
      }
    }
  }
  
  if (currentItem && currentItem.company) {
    items.push(currentItem as ExperienceItem);
  }
  
  return items;
};

export const parseProjects = (content: string): ProjectItem[] => {
  const items: ProjectItem[] = [];
  const lines = content.split('\n');
  
  let currentItem: Partial<ProjectItem> | null = null;
  
  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (currentItem && currentItem.title) {
        items.push(currentItem as ProjectItem);
      }
      currentItem = {
        title: line.replace('## ', '').trim(),
        tech: [],
        description: '',
        github: '#',
        live: '#'
      };
    } else if (currentItem) {
      if (line.startsWith('**Tech:**')) {
        const techStr = line.replace('**Tech:**', '').trim();
        currentItem.tech = techStr.split(',').map(t => t.trim());
      } else if (line.startsWith('**Description:**')) {
        currentItem.description = line.replace('**Description:**', '').trim();
      } else if (line.startsWith('**GitHub:**')) {
        currentItem.github = line.replace('**GitHub:**', '').trim();
      } else if (line.startsWith('**Live:**')) {
        currentItem.live = line.replace('**Live:**', '').trim();
      }
    }
  }
  
  if (currentItem && currentItem.title) {
    items.push(currentItem as ProjectItem);
  }
  
  return items;
};
