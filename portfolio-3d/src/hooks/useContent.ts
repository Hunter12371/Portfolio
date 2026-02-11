import { useState, useEffect } from 'react';
import { contentAPI } from '../services/contentAPI';

export const useContent = () => {
  const [content, setContent] = useState(null);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const data = await contentAPI.getContent();
        setContent(data.content);
        setConfig(data.config);
        setError(null);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError(err.message || 'Failed to fetch content');
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
