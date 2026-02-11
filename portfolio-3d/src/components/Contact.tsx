import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { portfolioData } from '../data/content';

const Contact = () => {
    const { contactEmail, phone, location } = portfolioData.config;

    return (
        <section id="contact" className="py-16 sm:py-20 md:py-24 bg-secondary/30 backdrop-blur-lg text-text-primary relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4">Get In Touch</h2>
                    <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
                    <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
                        For business inquiries, collaboration opportunities, or just to say hi, feel free to reach out!
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-primary p-6 rounded-xl border border-white/5 hover:border-accent/50 transition-colors text-center"
                    >
                        <Mail className="text-accent mx-auto mb-4" size={32} />
                        <h3 className="text-lg font-bold mb-2">Email</h3>
                        <a href={`mailto:${contactEmail}`} className="text-gray-400 hover:text-accent transition-colors break-all">
                            {contactEmail}
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="bg-primary p-6 rounded-xl border border-white/5 hover:border-accent/50 transition-colors text-center"
                    >
                        <Phone className="text-accent mx-auto mb-4" size={32} />
                        <h3 className="text-lg font-bold mb-2">Phone</h3>
                        <a href={`tel:${phone}`} className="text-gray-400 hover:text-accent transition-colors">
                            {phone}
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-primary p-6 rounded-xl border border-white/5 hover:border-accent/50 transition-colors text-center"
                    >
                        <MapPin className="text-accent mx-auto mb-4" size={32} />
                        <h3 className="text-lg font-bold mb-2">Location</h3>
                        <p className="text-gray-400">{location}</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
