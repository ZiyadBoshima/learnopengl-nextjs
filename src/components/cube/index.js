'use client';
import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader} from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import styles from './styles.module.scss';

export default function App() {
  return (
    <div className={styles.main}>
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 1, 1]} />
        <Cube />
      </Canvas>
    </div>
  );
}

function Cube() {
  const mesh = useRef();

  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.2;
    mesh.current.rotation.y += delta * 0.2;
    mesh.current.rotation.z += delta * 0.2;
  });

  const texture1 = useLoader(TextureLoader, '/assets/container.jpg');
  const texture2 = useLoader(TextureLoader, '/assets/awesomeface.png');
  
  const shaderArgs = [{
    uniforms: {
      uTexture1: { value: texture1 },
      uTexture2: { value: texture2 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture1;
      uniform sampler2D uTexture2;
      varying vec2 vUv;
      void main() {
        vec4 tex1 = texture2D(uTexture1, vUv);
        vec4 tex2 = texture2D(uTexture2, vUv);
        gl_FragColor = mix(tex1, tex2, 0.2);
      }
    `,
  }];

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[2.5, 2.5, 2.5]}/>
      <shaderMaterial
      attach="material"
      args={shaderArgs}
      />
    </mesh>
  );
}






