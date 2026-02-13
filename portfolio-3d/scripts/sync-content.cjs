#!/usr/bin/env node
/**
 * This script reads backend/data.md and generates portfolio-3d/src/data/content.ts
 * Run this before building to sync content from data.md
 */

const fs = require('fs');
const path = require('path');

// Read data.md
const dataPath = path.join(__dirname, '../../backend/data.md');
const dataContent = fs.readFileSync(dataPath, 'utf-8');

// Parse YAML frontmatter
const frontmatterMatch = dataContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
const config = {};

if (frontmatterMatch) {
  const yamlContent = frontmatterMatch[1];
  yamlContent.split(/\r?\n/).forEach(line => {
    const match = line.match(/^(\w+):\s*"?([^"\r\n]+)"?$/);
    if (match) {
      const key = match[1];
      let value = match[2].trim();
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      config[key] = value;
    }
  });
} else {
  console.error('❌ Could not parse YAML frontmatter');
}

// Parse markdown sections
const contentAfterFrontmatter = dataContent.replace(/^---\n[\s\S]*?\n---\n/, '');
const sections = {};
let currentSection = null;
let currentContent = [];

contentAfterFrontmatter.split('\n').forEach(line => {
  if (line.startsWith('# ') && !line.startsWith('## ')) {
    if (currentSection) {
      sections[currentSection] = currentContent.join('\n').trim();
    }
    currentSection = line.replace('# ', '').trim();
    currentContent = [];
  } else if (currentSection) {
    currentContent.push(line);
  }
});

if (currentSection) {
  sections[currentSection] = currentContent.join('\n').trim();
}

// Parse About section
const aboutContent = sections.About || '';
const paragraphs = [];
let skillsText = '';

// Split by double newlines to get blocks
const blocks = aboutContent.split(/\r?\n\r?\n/).filter(b => b.trim());

let skipNext = false;
for (let i = 0; i < blocks.length; i++) {
  if (skipNext) {
    skipNext = false;
    continue;
  }
  
  const block = blocks[i].trim();
  
  if (block.startsWith('## Skills')) {
    // Skills are in the next block
    if (i + 1 < blocks.length) {
      skillsText = blocks[i + 1].trim();
      skipNext = true; // Skip the next block since we just used it
    }
  } else if (!block.startsWith('##')) {
    paragraphs.push(block);
  }
}

const skills = skillsText ? skillsText.split(',').map(s => s.trim()) : [];

// Parse Education
const educationItems = [];
if (sections.Education) {
  const eduLines = sections.Education.split('\n');
  let currentEdu = null;
  
  eduLines.forEach(line => {
    if (line.startsWith('## ')) {
      if (currentEdu) educationItems.push(currentEdu);
      currentEdu = { institution: line.replace('## ', '').trim(), degree: '', period: '', proficientIn: '' };
    } else if (currentEdu) {
      if (line.startsWith('**Degree:**')) currentEdu.degree = line.replace('**Degree:**', '').trim();
      if (line.startsWith('**Period:**')) currentEdu.period = line.replace('**Period:**', '').trim();
      if (line.startsWith('**Proficient In:**')) currentEdu.proficientIn = line.replace('**Proficient In:**', '').trim();
    }
  });
  if (currentEdu) educationItems.push(currentEdu);
}

// Parse Experience
const experienceItems = [];
if (sections.Experience) {
  const expLines = sections.Experience.split('\n');
  let currentExp = null;
  
  expLines.forEach(line => {
    if (line.startsWith('## ')) {
      if (currentExp) experienceItems.push(currentExp);
      const parts = line.replace('## ', '').split('|').map(p => p.trim());
      currentExp = { company: parts[0], role: parts[1] || '', period: '', description: [] };
    } else if (currentExp) {
      if (line.startsWith('**Period:**')) currentExp.period = line.replace('**Period:**', '').trim();
      if (line.startsWith('- ')) currentExp.description.push(line.replace('- ', '').trim());
    }
  });
  if (currentExp) experienceItems.push(currentExp);
}

// Parse Projects
const projectItems = [];
if (sections.Projects) {
  const projLines = sections.Projects.split('\n');
  let currentProj = null;
  
  projLines.forEach(line => {
    if (line.startsWith('## ')) {
      if (currentProj) projectItems.push(currentProj);
      currentProj = { title: line.replace('## ', '').trim(), tech: [], description: '', github: '#', live: '#' };
    } else if (currentProj) {
      if (line.startsWith('**Tech:**')) {
        const techStr = line.replace('**Tech:**', '').trim();
        currentProj.tech = techStr.split(',').map(t => t.trim());
      }
      if (line.startsWith('**Description:**')) currentProj.description = line.replace('**Description:**', '').trim();
      if (line.startsWith('**GitHub:**')) currentProj.github = line.replace('**GitHub:**', '').trim();
      if (line.startsWith('**Live:**')) currentProj.live = line.replace('**Live:**', '').trim();
    }
  });
  if (currentProj) projectItems.push(currentProj);
}

// Generate TypeScript file
const tsContent = `// This file is AUTO-GENERATED from backend/data.md
// DO NOT EDIT THIS FILE DIRECTLY - Edit backend/data.md instead
// Run 'npm run sync-content' to regenerate this file

export const portfolioData = {
  config: ${JSON.stringify(config, null, 4)},
  
  about: {
    paragraphs: ${JSON.stringify(paragraphs, null, 6)},
    skills: ${JSON.stringify(skills, null, 6)}
  },
  
  education: ${JSON.stringify(educationItems, null, 4)},
  
  experience: ${JSON.stringify(experienceItems, null, 4)},
  
  projects: ${JSON.stringify(projectItems, null, 4)}
};
`;

// Write to content.ts
const outputPath = path.join(__dirname, '../src/data/content.ts');
fs.writeFileSync(outputPath, tsContent);

console.log('✅ Content synced from backend/data.md to portfolio-3d/src/data/content.ts');
