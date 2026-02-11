import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import frontMatter from 'front-matter';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Paths
const dataFilePath = path.join(__dirname, '../data.md');
const resumePath = path.join(__dirname, '../../resume/Sidd.pdf');

// Function to parse data.md
function getPageData() {
  try {
    const content = fs.readFileSync(dataFilePath, 'utf8');
    const { attributes, body } = frontMatter(content);
    return {
      config: attributes,
      content: body
    };
  } catch (error) {
    console.error('Error reading data.md:', error);
    return {
      config: { contactEmail: 'work.srivastav@gmail.com' },
      content: ''
    };
  }
}

// API Routes

// Get all content
app.get('/api/content', (req, res) => {
  const data = getPageData();
  res.json(data);
});

// Get specific section
app.get('/api/content/:section', (req, res) => {
  const data = getPageData();
  const { section } = req.params;
  
  // Parse the content to extract sections
  const sections = parseSections(data.content);
  
  if (sections[section]) {
    res.json({ content: sections[section] });
  } else {
    res.status(404).json({ error: 'Section not found' });
  }
});

// Update configuration (email, titles, etc)
app.put('/api/config', (req, res) => {
  try {
    const { contactEmail, heroTitle, heroSubtitle } = req.body;
    const data = getPageData();
    
    // Update config
    if (contactEmail) data.config.contactEmail = contactEmail;
    if (heroTitle) data.config.heroTitle = heroTitle;
    if (heroSubtitle) data.config.heroSubtitle = heroSubtitle;
    
    // Write back to file
    const frontMatterStr = Object.entries(data.config)
      .map(([key, value]) => `${key}: "${value}"`)
      .join('\n');
    
    const newContent = `---\n${frontMatterStr}\n---\n\n${data.content}`;
    fs.writeFileSync(dataFilePath, newContent, 'utf8');
    
    res.json({ success: true, config: data.config });
  } catch (error) {
    console.error('Error updating config:', error);
    res.status(500).json({ error: 'Failed to update config' });
  }
});

// Update section content
app.put('/api/content/:section', (req, res) => {
  try {
    const { section } = req.params;
    const { newContent } = req.body;
    const data = getPageData();
    
    // Update section in content
    const sections = parseSections(data.content);
    sections[section] = newContent;
    
    // Reconstruct content
    const reconstructedContent = Object.entries(sections)
      .map(([key, val]) => `# ${key}\n\n${val}`)
      .join('\n\n');
    
    const frontMatterStr = Object.entries(data.config)
      .map(([key, value]) => `${key}: "${value}"`)
      .join('\n');
    
    const newFile = `---\n${frontMatterStr}\n---\n\n${reconstructedContent}`;
    fs.writeFileSync(dataFilePath, newFile, 'utf8');
    
    res.json({ success: true, section, content: newContent });
  } catch (error) {
    console.error('Error updating section:', error);
    res.status(500).json({ error: 'Failed to update section' });
  }
});

// Send contact form email
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const data = getPageData();
    const recipientEmail = data.config.contactEmail || 'work.srivastav@gmail.com';
    
    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

// Download resume
app.get('/api/download-resume', (req, res) => {
  try {
    if (fs.existsSync(resumePath)) {
      res.download(resumePath, 'Siddharth_Resume.pdf');
    } else {
      res.status(404).json({ error: 'Resume not found' });
    }
  } catch (error) {
    console.error('Error downloading resume:', error);
    res.status(500).json({ error: 'Failed to download resume' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// Helper function to parse sections
function parseSections(content) {
  const sections = {};
  const sectionRegex = /^# (.+)$/gm;
  let match;
  let currentSection = null;
  let currentContent = '';
  
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const headerMatch = line.match(/^# (.+)$/);
    
    if (headerMatch) {
      if (currentSection) {
        sections[currentSection] = currentContent.trim();
      }
      currentSection = headerMatch[1].trim();
      currentContent = '';
    } else if (currentSection) {
      currentContent += line + '\n';
    }
  }
  
  if (currentSection) {
    sections[currentSection] = currentContent.trim();
  }
  
  return sections;
}

export default app;

//this is a test comment to check if the commit message is working