import { useState, useEffect } from 'react';
import { contentAPI } from '../services/contentAPI';
import { portfolioData } from '../data/content';

interface Config {
  contactEmail?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  phone?: string;
  location?: string;
}

interface Sections {
  [key: string]: string;
}

export const useContent = () => {
  const [config, setConfig] = useState<Config>(portfolioData.config);
  const [sections, setSections] = useState<Sections | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await contentAPI.getContent();
        if (data && data.config) {
          setConfig(data.config);
          setSections(data.sections);
          setError(null);
        }
      } catch (err: any) {
        console.error('Error fetching content from API, using fallback data:', err);
        setError(err.message || 'Using fallback data');
        // Keep using fallback data from portfolioData
      }
    };

    fetchContent();
    
    // Refresh content every 5 seconds for live updates
    const interval = setInterval(fetchContent, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return { config, sections, error };
};
