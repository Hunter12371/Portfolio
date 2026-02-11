import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experiences = [
    {
        company: "Intel Unnati",
        role: "AI/ML Trainee",
        period: "May 2025 – Jul 2025",
        description: [
            "Built ML models for network traffic analysis; improved prediction accuracy by 15%.",
            "Reduced simulated network latency by 20% through optimization techniques."
        ]
    },
    {
        company: "Faramond Technologies",
        role: "AI/ML Intern",
        period: "Apr 2025 – Jun 2025",
        description: [
            "Improved model interpretability by 25% and reduced preprocessing time by 30%.",
            "Deployed ML models for real-time prediction pipelines."
        ]
    },
    {
        company: "Acmegrade",
        role: "Machine Learning Intern",
        period: "Jun 2025 – Aug 2025",
        description: [
            "Built ML pipelines using Scikit-learn; improved accuracy by 18%.",
            "Automated preprocessing and evaluation, reducing workflow time by 40%."
        ]
    }
];

const Experience: React.FC = () => {
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

                <div className="max-w-4xl mx-auto">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="relative pl-6 sm:pl-8 pb-8 sm:pb-12 border-l-2 border-accent/30 last:pb-0"
                        >
                            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-accent shadow-[0_0_10px_#38bdf8]"></div>

                            <div className="bg-primary p-4 sm:p-6 rounded-xl border border-white/5 hover:border-accent/50 transition-colors shadow-lg">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                                            <Briefcase size={18} className="text-accent flex-shrink-0" />
                                            {exp.role}
                                        </h3>
                                        <p className="text-accent font-medium text-sm sm:text-base">{exp.company}</p>
                                    </div>
                                    <span className="text-gray-400 text-xs sm:text-sm font-mono bg-secondary px-3 py-1 rounded-full border border-white/10 whitespace-nowrap">{exp.period}</span>
                                </div>
                                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base">
                                    {exp.description.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
