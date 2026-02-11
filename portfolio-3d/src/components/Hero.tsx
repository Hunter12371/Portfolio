import { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Icosahedron, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import * as THREE from 'three';
import { contentAPI } from '../services/contentAPI';
import { useContent } from '../hooks/useContent';

const AnimatedSphere = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.getElapsedTime();

            // Base movement (faster rotation for gamer vibe)
            meshRef.current.rotation.z = t * 0.2;
            meshRef.current.rotation.y = t * 0.2;

            // Mouse interaction
            const x = state.mouse.x * 0.5;
            const y = state.mouse.y * 0.5;

            meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y, 0.1);
            meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x + t * 0.2, 0.1);

            meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 0.5, 0.1);
            meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * 0.5, 0.1);
        }
    });

    return (
        <Icosahedron ref={meshRef} args={[1, 1]} scale={2.4}>
            <MeshDistortMaterial
                color="#a855f7"
                attach="material"
                distort={0.6}
                speed={3}
                wireframe
            />
        </Icosahedron>
    );
};

const HeroCanvas = () => {
    return (
        <Canvas className="h-full w-full">
            <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[3, 2, 1]} />
                <Sparkles count={150} scale={5} size={4} speed={0.4} opacity={1} color="#a855f7" />
                {/* Second layer of sparkles for depth */}
                <Sparkles count={100} scale={10} size={2} speed={0.2} opacity={0.5} color="#38bdf8" />
                <AnimatedSphere />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Suspense>
        </Canvas>
    );
};

const Hero = () => {
    const [downloadingResume, setDownloadingResume] = useState(false);
    const { config, loading } = useContent();

    const handleDownloadResume = async () => {
        try {
            setDownloadingResume(true);
            const blob = await contentAPI.downloadResume();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Siddharth_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading resume:', error);
            alert('Failed to download resume. Please try again.');
        } finally {
            setDownloadingResume(false);
        }
    };

    // Default values while loading
    const heroTitle = config?.heroTitle || "Hi, I'm Siddharth";
    const heroSubtitle = config?.heroSubtitle || "AI Engineer | Level 99 Gamer | Tech Enthusast";

    return (
        <section id="home" className="min-h-screen w-full relative flex items-center justify-center bg-primary overflow-hidden pt-14 sm:pt-16">
            {/* Background 3D Scene */}
            <div className="absolute inset-0 z-0">
                <HeroCanvas />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pointer-events-none">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tight pointer-events-auto"
                >
                    {heroTitle.split("I'm ")[0]}
                    {heroTitle.includes("I'm ") && (
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
                            {heroTitle.split("I'm ")[1]}
                        </span>
                    )}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary mb-6 sm:mb-8 max-w-2xl mx-auto pointer-events-auto font-mono"
                >
                    {heroSubtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex justify-center gap-2 sm:gap-4 pointer-events-auto flex-wrap"
                >
                    <a
                        href="#projects"
                        className="px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-accent text-primary font-bold rounded-full hover:bg-accent-glow transition-all shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:shadow-[0_0_30px_rgba(56,189,248,0.8)]"
                    >
                        View Projects
                    </a>
                    <a
                        href="#contact"
                        className="px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base border border-purple-500 text-purple-400 font-bold rounded-full hover:bg-purple-500/10 transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                    >
                        Contact Me
                    </a>
                    <button
                        onClick={handleDownloadResume}
                        disabled={downloadingResume}
                        className="px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base border border-accent text-accent font-bold rounded-full hover:bg-accent/10 transition-all hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download size={18} />
                        {downloadingResume ? 'Downloading...' : 'Resume'}
                    </button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
