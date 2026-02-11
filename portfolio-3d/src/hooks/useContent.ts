import { useState, useEffect } from 'react';
import { contentAPI } from '../services/contentAPI';

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
  const [config, setConfig] = useState<Config | null>(null);
  const [sections, setSections] = useState<Sections | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const data = await contentAPI.getContent();
        setConfig(data.config);
        setSections(data.sections);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching content:', err);
        setError(err.message || 'Failed to fetch content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
    
    // Refresh content every 5 seconds for live updates
    const interval = setInterval(fetchContent, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return { config, sections, loading, error };
};
