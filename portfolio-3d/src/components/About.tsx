import { motion } from 'framer-motion';
import { useContent } from '../hooks/useContent';
import { useEffect, useState } from 'react';

const About = () => {
    const { content, loading } = useContent();
    const [aboutContent, setAboutContent] = useState('');
    const [skills, setSkills] = useState<string[]>([]);

    useEffect(() => {
        if (content) {
            // Parse About section from content
            const aboutMatch = content.match(/# About\s+([\s\S]*?)(?=\n# |$)/);
            if (aboutMatch) {
                const aboutText = aboutMatch[1].trim();
                setAboutContent(aboutText);
                
                // Extract skills from ## Skills section
                const skillsMatch = aboutText.match(/## Skills\s+([\s\S]*?)$/);
                if (skillsMatch) {
                    const skillsText = skillsMatch[1].trim();
                    const extractedSkills = skillsText.split(',').map(s => s.trim()).filter(s => s);
                    setSkills(extractedSkills);
                }
            }
        }
    }, [content]);

    // Split about content into paragraphs (excluding skills section)
    const aboutParagraphs = aboutContent
        .replace(/## Skills[\s\S]*$/, '')
        .split('\n\n')
        .filter(p => p.trim());

    return (
        <section id="about" className="py-16 sm:py-20 md:py-24 bg-primary/30 backdrop-blur-lg text-text-primary relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4">About Me</h2>
                    <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
                </motion.div>

                {loading ? (
                    <div className="text-center text-gray-400">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {aboutParagraphs.map((paragraph, index) => (
                                <p key={index} className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="bg-secondary p-6 sm:p-8 rounded-2xl shadow-xl border border-white/5"
                        >
                            <h3 className="text-lg sm:text-xl font-bold mb-6 text-accent">Technical Skills</h3>
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-primary rounded-lg font-medium text-gray-300 border border-white/10 hover:border-accent hover:text-accent transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default About;
