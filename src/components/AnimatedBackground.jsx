import { Canvas } from '@react-three/fiber';
import { useOktaAuth } from '@okta/okta-react';
import { useSprings, a } from '@react-spring/three';
import React, { useEffect } from 'react';
import * as THREE from 'three';

const number = 50;
const colors = ['#00003f', '#00008b', '#ededff', '#e0feff', '#e0feff'];
const random = (i) => {
  const r = Math.random();
  return {
    position: [100 - Math.random() * 200, 100 - Math.random() * 200, i * 1.5],
    color: colors[Math.round(Math.random() * (colors.length - 1))],
    scale: [1 + r * 14, 1 + r * 14, 1],
    rotation: [0, 0, THREE.Math.degToRad(Math.round(Math.random()) * 45)],
  };
};

const data = new Array(number).fill().map(() => {
  const yo = Math.random();
  return {
    color: colors[Math.round(yo * (colors.length - 1))],
    args: [0.1 + Math.random() * 9, 0.1 + Math.random() * 9, 10],
  };
});

function Content() {
  const [springs, set] = useSprings(number, (i) => ({
    from: random(i),
    ...random(i),
    config: { mass: 200, tension: 20, friction: 50 },
  }));
  useEffect(() => undefined, setInterval(() => set((i) => ({ ...random(i), delay: i * 4 })), 3000), []);
  return data.map((d, index) => (
    <a.mesh key={0} {...springs[index]} castShadow receiveShadow>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <a.meshStandardMaterial attach="material" color={springs[index].color} roughness={0.75} metalness={0.5} />
    </a.mesh>
  ));
}

function Lights() {
  return (
    <group>
      <pointLight intensity={0.1} />
      <ambientLight intensity={2} />
      <spotLight
        castShadow
        intensity={0.1}
        angle={Math.PI / 7}
        position={[150, 150, 250]}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </group>
  );
}

const AnimatedBackground = () => {
  const { authState } = useOktaAuth();

  return (
    <div>
      {!authState.isAuthenticated
        && (
        <div>
          <Canvas linear shadows camera={{ position: [0, 0, 100], fov: 100 }}>
            <Lights />
            <Content />
          </Canvas>
        </div>
        )}
    </div>
  );
};
export default AnimatedBackground;
