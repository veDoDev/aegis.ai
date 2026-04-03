import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const GlobalStarfield = (props) => {
    // Increased particle count and radius for extreme density
    const ref = useRef();
    const sphere = random.inSphere(new Float32Array(15000), { radius: 30 }); 

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 30;
        ref.current.rotation.y -= delta / 45;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial transparent color="#ffffff" size={0.07} sizeAttenuation={true} depthWrite={false} opacity={0.8} />
            </Points>
        </group>
    );
};

const BackgroundParticles = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0, 
            pointerEvents: 'none', 
            background: 'var(--bg-color)', 
        }}>
            <Canvas camera={{ position: [0, 0, 10] }}>
                <GlobalStarfield />
            </Canvas>
        </div>
    );
};

export default BackgroundParticles;
