import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// --- STAR LAYER COMPONENT ---
const StarLayer = ({ count, size, color, opacity, transparent = true }) => {
  const mesh = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 3000;
      const y = (Math.random() - 0.5) * 3000;
      // Spread stars along Z axis deeply
      const z = (Math.random() - 0.5) * 3000; 
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count]);

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        size={size} 
        color={color} 
        transparent={transparent} 
        opacity={opacity} 
        sizeAttenuation={true} 
        depthWrite={false} 
      />
    </points>
  );
};

// --- MAIN SCENE CONTENT ---
const SceneContent = ({ isMobile }) => {
  const { camera } = useThree();
  
  // Create refs for continuous motion
  const targetZ = useRef(100);

  useFrame((state, delta) => {
    // 1. Get Scroll Position
    const scrollY = window.scrollY;
    
    // 2. Calculate Target Z Position (Move forward as we scroll)
    const newZ = 100 - (scrollY * 0.1); 
    
    // 3. Smooth Camera Movement (Lerp)
    targetZ.current = THREE.MathUtils.lerp(targetZ.current, newZ, 0.1);
    camera.position.z = targetZ.current;

    // 4. Subtle rotation for "floating" feel
    camera.rotation.z = scrollY * 0.0002;
  });

  // UPDATED: Significantly increased star counts
  const counts = isMobile 
    ? { dust: 4000, stars: 2000, beacons: 300 }  // Mobile (Boosted)
    : { dust: 12000, stars: 5000, beacons: 800 }; // Desktop (Boosted)

  return (
    <group>
      {/* REMOVED FOG: This ensures "Clear Black" galaxy without gray fade */}
      {/* <fog attach="fog" args={['#050505', 10, 800]} /> */}
      
      {/* Background Dust */}
      <StarLayer count={counts.dust} size={0.5} color="#64748b" opacity={0.5} />
      
      {/* Mid-range Stars */}
      <StarLayer count={counts.stars} size={1.2} color="#ffffff" opacity={0.8} />
      
      {/* Bright Beacons */}
      <StarLayer count={counts.beacons} size={2.5} color="#38bdf8" opacity={1} />
    </group>
  );
};

// --- EXPORTED COMPONENT ---
const Background = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Initial check
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[#000000] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 100], fov: 75 }}
        // Removed alpha: false to ensure we control background color via CSS div above
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={isMobile ? 1 : [1, 1.5]}
      >
        <SceneContent isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default Background;