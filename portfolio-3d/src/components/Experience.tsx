import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useEffect, useState } from 'react';

const Experience = () => {
    const { content, loading } = useContent();
    const [experienceContent, setExperienceContent] = useState('');

    useEffect(() => {
        if (content) {
            // Parse Experience section from content
            const experienceMatch = content.match(/# Experience\s+([\s\S]*?)(?=\n# |$)/);
            if (experienceMatch) {
                setExperienceContent(experienceMatch[1].trim());
            }
        }
    }, [content]);

    return (
        <section id="experience" className="py-16 sm:py-20 md:py-24 bg-secondary/30 backdrop-blur-lg text-text-primary relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4">Experience</h2>
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
                            className="relative pl-6 sm:pl-8 border-l-2 border-accent/30"
                        >
                            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-accent shadow-[0_0_10px_#38bdf8]"></div>

                            <div className="bg-primary p-4 sm:p-6 rounded-xl border border-white/5 hover:border-accent/50 transition-colors shadow-lg">
                                <div className="flex items-center gap-2 mb-4">
                                    <Briefcase size={18} className="text-accent flex-shrink-0" />
                                    <h3 className="text-lg sm:text-xl font-bold text-white">Work Experience</h3>
                                </div>
                                <div 
                                    className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
                                    dangerouslySetInnerHTML={{ 
                                        __html: experienceContent
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

export default Experience;
