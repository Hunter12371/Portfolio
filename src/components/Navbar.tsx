import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Education', href: '#education' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-primary/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 sm:h-16">
                    <div className="flex-shrink-0">
                        <a href="#" className="text-xl sm:text-2xl font-bold text-accent font-mono">
                            &lt;Siddharth /&gt;
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-300 hover:text-accent transition-colors duration-300 text-xs sm:text-sm font-medium"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-white/10">
                                <a href="https://github.com/Hunter12371" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                    <Github size={18} />
                                </a>
                                <a href="https://www.linkedin.com/in/siddharth-srivastav-766b652b4/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                    <Linkedin size={18} />
                                </a>
                                <a href="mailto:work.srivastav@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                                    <Mail size={18} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-primary/95 backdrop-blur-md border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-300 hover:text-accent block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="flex space-x-6 px-3 py-4 border-t border-white/10 mt-2">
                                <a href="https://github.com/Hunter12371" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                    <Github size={24} />
                                </a>
                                <a href="https://www.linkedin.com/in/siddharth-srivastav-766b652b4/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                    <Linkedin size={24} />
                                </a>
                                <a href="mailto:work.srivastav@gmail.com" className="text-gray-400 hover:text-white">
                                    <Mail size={24} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
