import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { GLView } from 'expo-gl';
import * as THREE from 'three';
import AnimatedCharacter from './AnimatedCharacter';

const { width, height } = Dimensions.get('window');

interface SceneSetup {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  character: THREE.Group;
  mixer: THREE.AnimationMixer | null;
  actions: THREE.AnimationAction[];
}

const CameraView: React.FC = () => {
  const glRef = useRef<GLView>(null);
  const sceneRef = useRef<SceneSetup | null>(null);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    if (!glRef.current) return;

    const setupScene = async () => {
      const gl = glRef.current?.getContext();
      if (!gl) return;

      // Initialize Three.js scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);

      const camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
      );
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ context: gl });
      renderer.setSize(width, height);
      renderer.setPixelRatio(1);

      // Add lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // Create animated character
      const { character, mixer, actions } = AnimatedCharacter.create();
      character.position.set(2, -1, 0); // Position in corner of room
      scene.add(character);

      sceneRef.current = {
        scene,
        camera,
        renderer,
        character,
        mixer,
        actions,
      };

      // Start animation loop
      let lastTime = Date.now();
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);

        const now = Date.now();
        const deltaTime = (now - lastTime) / 1000;
        lastTime = now;

        // Update mixer
        if (sceneRef.current?.mixer) {
          sceneRef.current.mixer.update(deltaTime);
        }

        // Slight character bobbing animation
        if (sceneRef.current?.character) {
          sceneRef.current.character.position.y =
            -1 + Math.sin(now / 500) * 0.2;
        }

        // Render
        if (sceneRef.current?.renderer) {
          sceneRef.current.renderer.render(scene, camera);
          gl.endFrameEXP();
        }
      };

      animate();
    };

    setupScene();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <GLView
        ref={glRef}
        style={styles.glView}
        onContextCreate={async (gl) => {
          // Context is created, scene setup happens in useEffect
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  glView: {
    flex: 1,
  },
});

export default CameraView;
