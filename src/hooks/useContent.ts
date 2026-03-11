import { portfolioData } from '../data/content';

export const useContent = () => {
  const config = portfolioData.config;
  const sections = null;
  const error = null;

  return { config, sections, error };
};
