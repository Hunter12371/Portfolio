import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
    {
        title: "Ambulance Traffic Predictor",
        tech: ["Python", "Pandas", "Scikit-learn"],
        description: "Built traffic prediction system achieving 94% accuracy and reducing response time by 22%.Analyzed traffic patterns to optimize ambulance routing.",
        links: { github: "#", live: "#" }
    },
    {
        title: "Automated MLOps Pipeline",
        tech: ["Python", "Docker", "GitHub Actions"],
        description: "Designed CI/CD pipeline improving deployment speed by 35%. Automated model training, testing, and deployment workflows.",
        links: { github: "#", live: "#" }
    },
    {
        title: "AI Personal Assistant with Object Detection",
        tech: ["Python", "YOLO", "OpenCV"],
        description: "Developed real-time object detection assistant with 95% accuracy and reduced latency by 60ms. Integrated voice commands for hands-free operation.",
        links: { github: "#", live: "#" }
    }
];

const Projects: React.FC = () => {
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
                    <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                    <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="group relative bg-secondary rounded-2xl overflow-hidden border border-white/5 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
                        >
                            <div className="p-4 sm:p-6 h-full flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-accent transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="flex gap-3">
                                        <a href={project.links.github} className="text-gray-400 hover:text-white transition-colors">
                                            <Github size={20} />
                                        </a>
                                        <a href={project.links.live} className="text-gray-400 hover:text-white transition-colors">
                                            <ExternalLink size={20} />
                                        </a>
                                    </div>
                                </div>

                                <p className="text-gray-400 mb-6 flex-grow leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tech.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded-full border border-accent/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Hover effect overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
