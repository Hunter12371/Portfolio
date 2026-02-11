import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useEffect, useState } from 'react';

const Education = () => {
    const { content, loading } = useContent();
    const [educationContent, setEducationContent] = useState('');

    useEffect(() => {
        if (content) {
            // Parse Education section from content
            const educationMatch = content.match(/# Education\s+([\s\S]*?)(?=\n# |$)/);
            if (educationMatch) {
                setEducationContent(educationMatch[1].trim());
            }
        }
    }, [content]);

    return (
        <section id="education" className="py-16 sm:py-20 md:py-24 bg-primary/30 backdrop-blur-lg text-text-primary relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4 flex justify-center items-center gap-2 sm:gap-3">
                        <GraduationCap className="text-purple-400" size={32} />
                        Education
                    </h2>
                    <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
                </motion.div>

                {loading ? (
                    <div className="text-center text-gray-400">Loading...</div>
                ) : (
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-secondary/90 p-6 sm:p-8 rounded-2xl border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all"
                        >
                            <div className="prose prose-invert max-w-none">
                                <div 
                                    className="text-gray-300 leading-relaxed"
                                    dangerouslySetInnerHTML={{ 
                                        __html: educationContent
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

export default Education;
