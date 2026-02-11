import { useState, useEffect } from 'react';
import { contentAPI } from '../services/contentAPI';

interface Config {
  contactEmail?: string;
  heroTitle?: string;
  heroSubtitle?: string;
}

// Default fallback content
const DEFAULT_CONFIG: Config = {
  contactEmail: 'work.srivastav@gmail.com',
  heroTitle: "Hi, I'm Siddharth",
  heroSubtitle: 'AI Engineer | Level 99 Gamer | Tech Enthusast'
};

const DEFAULT_CONTENT = `# About

I am an AI & ML Engineering Student and IEEE AESS Vice Chair with experience building Machine Learning and computer vision systems.
My work focuses on developing scalable AI solutions, from real-time object detection assistants to traffic prediction models with high accuracy.

I have a strong foundation in Python and MLOps. When I'm not deploying models, I'm dominating in competitive gaming lobbies.
I bring the same strategic depth and reaction time from the arena to my engineering challenges.

## Skills

Python, C++, C, SQL, TensorFlow, PyTorch, OpenCV, Scikit-learn, Data Science, MLOps, Docker, Flutter, Figma, VSCode

# Education

## Bachelor of Technology in Computer Science
**Graphic Era Hill University** | Expected 2025
- CGPA: 7.8/10
- Relevant Coursework: Machine Learning, Data Science, Computer Vision, Deep Learning

# Experience

## AI/ML Intern
**Tech Company Name** | June 2024 - Present
- Developed and deployed machine learning models for real-time object detection
- Achieved 95% accuracy on custom datasets
- Built end-to-end ML pipeline with MLOps best practices

## Assistant Technical Director
**IEEE AESS** | January 2024 - Present
- Led technical initiatives and coordinated projects
- Mentored junior members in AI/ML technologies

# Projects

## Project 1: Real-time Object Detection System
Advanced computer vision system using YOLO and OpenCV for real-time object detection with 92% accuracy in diverse lighting conditions.
**Technologies:** Python, YOLOv8, OpenCV, TensorFlow

## Project 2: Traffic Prediction Model
Deep learning model predicting traffic patterns 30 minutes ahead with 89% accuracy using LSTM networks and historical traffic data.
**Technologies:** Python, PyTorch, LSTM, Scikit-learn

## Project 3: AI Gaming Assistant
Machine learning assistant that analyzes game footage and provides real-time strategic recommendations using computer vision.
**Technologies:** Python, OpenCV, TensorFlow, Flutter (Mobile UI)

# Contact

For business inquiries, collaboration opportunities, or just to say hi, feel free to reach out!

- **Email:** work.srivastav@gmail.com
- **Phone:** +91-9599692344
- **Location:** Bangalore, Karnataka`;

export const useContent = () => {
  const [content, setContent] = useState<string | null>(DEFAULT_CONTENT);
  const [config, setConfig] = useState<Config | null>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const data = await contentAPI.getContent();
        setContent(data.content);
        setConfig(data.config);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching content:', err);
        setError(err.message || 'Failed to fetch content');
        // Keep using default content on error
        console.log('Using default fallback content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, config, loading, error };
};

export const useContactEmail = () => {
  const [email, setEmail] = useState('work.srivastav@gmail.com');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const data = await contentAPI.getContent();
        setEmail(data.config?.contactEmail || 'work.srivastav@gmail.com');
      } catch (err) {
        console.error('Error fetching contact email:', err);
        setEmail('work.srivastav@gmail.com');
      } finally {
        setLoading(false);
      }
    };

    fetchEmail();
  }, []);

  return { email, loading };
};
