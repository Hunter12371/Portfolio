import { motion } from 'framer-motion';
import { useContent } from '../hooks/useContent';
import { useEffect, useState } from 'react';

const Projects = () => {
    const { content, loading } = useContent();
    const [projectsContent, setProjectsContent] = useState('');

    useEffect(() => {
        if (content) {
            // Parse Projects section from content
            const projectsMatch = content.match(/# Projects\s+([\s\S]*?)(?=\n# |$)/);
            if (projectsMatch) {
                setProjectsContent(projectsMatch[1].trim());
            }
        }
    }, [content]);

    return (
        <section id="projects" className="py-16 sm:py-20 md:py-24 bg-primary/30 backdrop-blur-lg text-text-primary relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4">Projects</h2>
                    <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
                </motion.div>

                {loading ? (
                    <div className="text-center text-gray-400">Loading...</div>
                ) : (
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-secondary rounded-2xl overflow-hidden border border-white/5 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
                        >
                            <div className="p-6 sm:p-8">
                                <div 
                                    className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
                                    dangerouslySetInnerHTML={{ 
                                        __html: projectsContent
                                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                                            .replace(/\n/g, '<br />')
                                    }} 
                                />
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
