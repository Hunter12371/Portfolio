import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, TorusKnot, Dodecahedron } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = ({ position, color, geometry }: { position: [number, number, number], color: string, geometry: 'torus' | 'dodeca' }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            {geometry === 'torus' ? (
                <TorusKnot ref={meshRef} position={position} args={[0.5, 0.15, 100, 16]} scale={1}>
                    <meshStandardMaterial color={color} wireframe attach="material" transparent opacity={0.3} />
                </TorusKnot>
            ) : (
                <Dodecahedron ref={meshRef} position={position} args={[1]} scale={1}>
                    <meshStandardMaterial color={color} wireframe attach="material" transparent opacity={0.3} />
                </Dodecahedron>
            )}
        </Float>
    );
};

const BackgroundCanvas = () => {
    return (
        <Canvas camera={{ position: [0, 0, 10] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Floating shapes customized for "Gamer" aesthetic */}
            <FloatingShape position={[-4, 2, -5]} color="#a855f7" geometry="dodeca" />
            <FloatingShape position={[4, -3, -5]} color="#38bdf8" geometry="torus" />
            <FloatingShape position={[-3, -4, -5]} color="#a855f7" geometry="torus" />
            <FloatingShape position={[5, 3, -10]} color="#38bdf8" geometry="dodeca" />
        </Canvas>
    );
};

const Background3D: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <BackgroundCanvas />
        </div>
    );
};

export default Background3D;
