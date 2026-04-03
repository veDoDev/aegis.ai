import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const DynamicGlobe = () => {
    const shieldRef = useRef();
    
    useFrame((state, delta) => {
        // Boosted passive rotation speed for a higher-energy "Active Defense" look
        shieldRef.current.rotation.y += delta * 0.8;
        shieldRef.current.rotation.z += delta * 0.2;

        // Enhanced interaction: Tilt model towards mouse position
        // This works because we pass mouse events through the text overlay
        const targetX = (state.mouse.y * Math.PI) / 6;
        const targetY = (state.mouse.x * Math.PI) / 6;
        shieldRef.current.rotation.x += (targetX - shieldRef.current.rotation.x) * 0.1;
        shieldRef.current.rotation.y += (targetY - shieldRef.current.rotation.y) * 0.1;
    });

    return (
        <group ref={shieldRef}>
            {/* Outer Cyan Triangular Wireframe Shield - Radius increased to 4.0 */}
            <mesh>
                <icosahedronGeometry args={[4.0, 1]} />
                <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.3} />
            </mesh>
            
            {/* Inner Solid Blue Core - Radius increased up to 2.8 */}
            <mesh>
                <icosahedronGeometry args={[2.8, 4]} />
                <meshBasicMaterial color="#0077ff" transparent opacity={0.4} />
            </mesh>
        </group>
    );
};

const Starfield = (props) => {
    const ref = useRef();
    // Fixed: Ensure the buffer length is exactly divisible by 3 (2000 * 3 = 6000)
    // Passing a non-divisible number can cause NaN values in the last indices
    const [sphere] = useState(() => random.inSphere(new Float32Array(6000), { radius: 15 }));

    useFrame((state, delta) => {
        // Safety check for delta to prevent sudden NaN spikes or huge jumps
        if (isNaN(delta) || delta > 0.1) return;
        
        ref.current.rotation.x -= delta / 30;
        ref.current.rotation.y -= delta / 45;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial transparent color="#ffffff" size={0.03} sizeAttenuation={true} depthWrite={false} />
            </Points>
        </group>
    );
};

const Hero = () => {
    return (
        <section style={styles.heroSection}>
            <div style={styles.heroContent}>
                <h1 style={styles.title}>AEGIS.AI</h1>
                
                <p style={styles.subtitle}>
                    Advanced Intelligence. Unbreakable Defense.<br/>
                    Aegis.ai leverages deep neural networks to instantly stop zero-day phishing attacks before they breach your perimeter.
                </p>
                
                <div style={styles.buttonGroup}>
                    <Link to="/report" className="btn btn-primary" style={styles.primaryBtn}>
                        ENTER DASHBOARD →
                    </Link>
                </div>

                <div style={styles.metricsRow}>
                    <div style={styles.metric}>
                        <strong>99.9%</strong>
                        <span>Detection</span>
                    </div>
                    <div style={styles.metric}>
                        <strong>&lt;50ms</strong>
                        <span>Latency</span>
                    </div>
                    <div style={styles.metric}>
                        <strong>Live</strong>
                        <span>Monitoring</span>
                    </div>
                </div>
            </div>

            <div style={styles.canvasContainer}>
                <Canvas camera={{ position: [0, 0, 8.0] }}>
                    <DynamicGlobe />
                    <Starfield />
                </Canvas>
            </div>
        </section>
    );
};

const styles = {
    heroSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '100vh',
        width: '100vw',
        padding: '0 4rem',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-color)',
        gap: '2rem'
    },
    heroContent: {
        flex: '0 0 45%', // Reduced to 45% to push more space to the model
        zIndex: 10,
        position: 'relative',
        textAlign: 'left'
    },
    canvasContainer: {
        flex: '0 0 55%', // Increased to 55% to cover the empty space
        height: '750px',
        position: 'relative',
        zIndex: 1,
    },
    title: {
        fontSize: '4.5rem',
        lineHeight: 1,
        marginTop: '6rem', // Increased space above further as requested
        marginBottom: '2rem',
        fontFamily: 'Orbitron, sans-serif',
        fontWeight: 900,
        letterSpacing: '4px',
        color: '#fff',
        textShadow: '0 0 50px rgba(0, 240, 255, 0.4)',
        display: 'block',
        transform: 'scaleY(1.5)', // Stretches the font vertically
        transformOrigin: 'left center'
    },
    subtitle: {
        fontSize: '1.2rem',
        color: 'var(--text-dim)',
        marginBottom: '4rem',
        lineHeight: 1.8,
        fontFamily: 'monospace',
        letterSpacing: '1px'
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '1.2rem', // Further reduced gap as requested
        pointerEvents: 'auto'
    },
    primaryBtn: {
        background: 'transparent',
        border: '1px solid #00f0ff',
        padding: '1.2rem 3rem',
        color: '#00f0ff',
        fontSize: '0.9rem',
        letterSpacing: '3px',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)'
    },
    metricsRow: {
        display: 'flex',
        gap: '4rem',
        justifyContent: 'flex-start',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        paddingTop: '3rem',
        opacity: 0.8,
        pointerEvents: 'auto'
    },
    metric: {
        display: 'flex',
        flexDirection: 'column',
    }
};

// Add CSS for mobile and hover
const inject = `
    .btn-primary:hover {
        background: rgba(0, 240, 255, 0.1) !important;
        box-shadow: 0 0 35px rgba(0, 240, 255, 0.4) !important;
        transform: translateY(-2px);
    }
    .metric strong {
        font-size: 1.8rem;
        color: #fff;
        font-family: 'Orbitron', sans-serif;
    }
    .metric span {
        font-size: 0.75rem;
        color: #00f0ff;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
`;
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = inject;
    document.head.appendChild(styleSheet);
}

export default Hero;
