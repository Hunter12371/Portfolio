import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { useContent } from '../hooks/useContent';
import { portfolioData } from '../data/content';
import { contentAPI } from '../services/contentAPI';

const Contact = () => {
    const { config } = useContent();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
        type: null,
        message: ''
    });

    const contactEmail = config?.contactEmail || portfolioData.config.contactEmail;
    const phone = config?.phone || portfolioData.config.phone;
    const location = config?.location || portfolioData.config.location;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setStatus({ type: null, message: '' });

        try {
            await contentAPI.sendEmail(formData);
            setStatus({
                type: 'success',
                message: 'Message sent successfully! I\'ll get back to you soon.'
            });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Failed to send message. Please email me directly at ' + contactEmail
            });
        } finally {
            setSending(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

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

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-primary p-6 sm:p-8 rounded-2xl border border-white/5"
                    >
                        <h3 className="text-xl sm:text-2xl font-bold mb-6 text-accent">Send Me a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-secondary border border-white/10 rounded-lg focus:outline-none focus:border-accent transition-colors text-white"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-secondary border border-white/10 rounded-lg focus:outline-none focus:border-accent transition-colors text-white"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 bg-secondary border border-white/10 rounded-lg focus:outline-none focus:border-accent transition-colors text-white resize-none"
                                    placeholder="Your message here..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={sending}
                                className="w-full px-6 py-3 bg-accent text-primary font-bold rounded-lg hover:bg-accent-glow transition-all shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:shadow-[0_0_30px_rgba(56,189,248,0.8)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <Send size={18} />
                                {sending ? 'Sending...' : 'Send Message'}
                            </button>
                            {status.type && (
                                <div
                                    className={`p-4 rounded-lg ${
                                        status.type === 'success'
                                            ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                                            : 'bg-red-500/10 border border-red-500/30 text-red-400'
                                    }`}
                                >
                                    {status.message}
                                </div>
                            )}
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="bg-primary p-6 rounded-xl border border-white/5 hover:border-accent/50 transition-colors">
                            <Mail className="text-accent mb-4" size={32} />
                            <h3 className="text-lg font-bold mb-2">Email</h3>
                            <a href={`mailto:${contactEmail}`} className="text-gray-400 hover:text-accent transition-colors break-all">
                                {contactEmail}
                            </a>
                        </div>

                        <div className="bg-primary p-6 rounded-xl border border-white/5 hover:border-accent/50 transition-colors">
                            <Phone className="text-accent mb-4" size={32} />
                            <h3 className="text-lg font-bold mb-2">Phone</h3>
                            <a href={`tel:${phone}`} className="text-gray-400 hover:text-accent transition-colors">
                                {phone}
                            </a>
                        </div>

                        <div className="bg-primary p-6 rounded-xl border border-white/5 hover:border-accent/50 transition-colors">
                            <MapPin className="text-accent mb-4" size={32} />
                            <h3 className="text-lg font-bold mb-2">Location</h3>
                            <p className="text-gray-400">{location}</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
