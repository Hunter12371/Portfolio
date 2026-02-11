import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { parseEducation } from '../utils/parseContent';

const Education = () => {
    const { sections, loading } = useContent();

    if (loading) {
        return (
            <section id="education" className="py-16 sm:py-20 md:py-24 bg-primary/30 backdrop-blur-lg text-text-primary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-400">Loading...</p>
                </div>
            </section>
        );
    }

    const educationContent = sections?.Education || '';
    const educationItems = parseEducation(educationContent);

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
                        Education Details
                    </h2>
                    <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {educationItems.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-secondary/90 p-6 sm:p-8 rounded-2xl border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all mb-6"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{edu.institution}</h3>
                                    <p className="text-accent text-base sm:text-lg font-medium">{edu.degree}</p>
                                </div>
                                <span className="px-3 sm:px-4 py-2 bg-primary rounded-full text-xs sm:text-sm font-mono text-purple-300 border border-purple-500/30 whitespace-nowrap">
                                    {edu.period}
                                </span>
                            </div>

                            {edu.cgpa && (
                                <div className="flex items-center gap-4 mt-6 p-4 bg-primary/50 rounded-xl border border-white/5">
                                    <Award className="text-yellow-400 flex-shrink-0" size={20} />
                                    <div>
                                        <span className="text-gray-400 text-xs sm:text-sm">CGPA</span>
                                        <p className="text-lg sm:text-xl font-bold text-white">{edu.cgpa}</p>
                                    </div>
                                </div>
                            )}

                            {edu.tags.length > 0 && (
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {edu.tags.map((tag, i) => (
                                        <span key={i} className="text-xs font-mono text-gray-500">{tag}</span>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
