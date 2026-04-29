import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ModelViewerProps {
  objUrl: string;
  mtlUrl?: string;
  textureUrl?: string;
  height?: number;
  autoRotate?: boolean;
  rotateSpeed?: number;
  color?: string;
  cameraZ?: number;
  className?: string;
  interactive?: boolean;
  glowColor?: string;
  initialRotationY?: number;
  initialRotationX?: number;
}

export default function ModelViewer({
  objUrl,
  mtlUrl,
  textureUrl,
  height = 420,
  autoRotate = true,
  rotateSpeed = 0.005,
  color = '#E8E0D0',
  cameraZ = 4.5,
  className = '',
  interactive = true,
  glowColor = '#C9A84C',
  initialRotationY = 0,
  initialRotationX = -0.05,
}: ModelViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let destroyed = false;
    let animId = 0;

    const w = mount.clientWidth || 500;
    const h = height;

    // ── Renderer — fully transparent background ──
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // fully transparent
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.0;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = `
      display: block;
      width: 100%;
      height: 100%;
      cursor: ${interactive ? 'grab' : 'default'};
    `;

    // ── Scene ──
    const scene = new THREE.Scene();
    // No scene background — fully transparent

    // ── Camera ──
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.001, 2000);
    camera.position.set(0, 0, cameraZ);

    // ── Cinematic lighting — bright, renders well on any background ──
    scene.add(new THREE.AmbientLight(0xffffff, 2.5));

    const key = new THREE.DirectionalLight(0xfff0d0, 5.0);
    key.position.set(3, 4, 5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x80aaff, 3.0);
    fill.position.set(-4, 1, 2);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffffff, 4.0);
    rim.position.set(0, -2, -4);
    scene.add(rim);

    const bottom = new THREE.DirectionalLight(0xffd080, 2.5);
    bottom.position.set(0, -5, 2);
    scene.add(bottom);

    scene.add(new THREE.HemisphereLight(0xddeeff, 0x443322, 2.0));

    // ── Drag interaction ──
    let isDragging = false;
    let prevX = 0, prevY = 0;
    let targetRotY = initialRotationY;
    let targetRotX = initialRotationX;
    let currRotY = initialRotationY;
    let currRotX = initialRotationX;

    const onPointerDown = (e: PointerEvent) => {
      if (!interactive) return;
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      renderer.domElement.style.cursor = 'grabbing';
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      targetRotY += (e.clientX - prevX) * 0.012;
      targetRotX += (e.clientY - prevY) * 0.009;
      targetRotX = Math.max(-0.8, Math.min(0.8, targetRotX));
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onPointerUp = () => {
      isDragging = false;
      renderer.domElement.style.cursor = interactive ? 'grab' : 'default';
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    // ── Load OBJ ──
    const loadModel = async () => {
      try {
        const { OBJLoader } = await import('three/examples/jsm/loaders/OBJLoader.js');
        const objLoader = new OBJLoader();

        // Load texture if provided
        let textureMap: THREE.Texture | null = null;
        if (textureUrl) {
          try {
            const texLoader = new THREE.TextureLoader();
            textureMap = await texLoader.loadAsync(textureUrl);
            textureMap.colorSpace = THREE.SRGBColorSpace;
            textureMap.wrapS = textureMap.wrapT = THREE.RepeatWrapping;
          } catch {
            console.warn('Texture failed, using solid color');
          }
        }

        const obj = await objLoader.loadAsync(objUrl);
        if (destroyed) return;

        // ── Material — bright, visible on dark backgrounds ──
        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          roughness: 0.4,
          metalness: 0.5,
          map: textureMap || null,
          emissive: textureMap
            ? new THREE.Color(0x000000)
            : new THREE.Color(color).multiplyScalar(0.15),
          emissiveIntensity: textureMap ? 0 : 1,
        });

        obj.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).material = mat;
          }
        });

        // ── Center & scale ──
        const box = new THREE.Box3().setFromObject(obj);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);

        if (!isFinite(maxDim) || maxDim === 0) {
          setError(true);
          setLoading(false);
          return;
        }

        obj.scale.setScalar(2.2 / maxDim);

        // Re-center after scale
        const box2 = new THREE.Box3().setFromObject(obj);
        const center2 = box2.getCenter(new THREE.Vector3());
        obj.position.sub(center2);

        obj.rotation.y = initialRotationY;
        obj.rotation.x = initialRotationX;

        scene.add(obj);
        if (!destroyed) setLoading(false);

        // ── Animate ──
        const clock = new THREE.Clock();

        const animate = () => {
          animId = requestAnimationFrame(animate);
          const t = clock.getElapsedTime();

          if (!isDragging && autoRotate) targetRotY += rotateSpeed;
          currRotY += (targetRotY - currRotY) * 0.06;
          currRotX += (targetRotX - currRotX) * 0.06;

          obj.rotation.y = currRotY;
          obj.rotation.x = currRotX;
          obj.position.y = Math.sin(t * 0.6) * 0.08;

          renderer.render(scene, camera);
        };
        animate();

      } catch (err: any) {
        console.error('ModelViewer error:', objUrl, err?.message);
        if (!destroyed) {
          setError(true);
          setLoading(false);
        }
      }
    };

    loadModel();

    // ── Resize ──
    const onResize = () => {
      if (!mount) return;
      const nw = mount.clientWidth;
      camera.aspect = nw / height;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, height);
    };
    window.addEventListener('resize', onResize);

    return () => {
      destroyed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [objUrl, mtlUrl, textureUrl, color, autoRotate, rotateSpeed, cameraZ, interactive, height, glowColor, initialRotationY, initialRotationX]);

  // ── Render — just the canvas, no wrappers, no decorations ──
  return (
    <div
      className={className}
      style={{
        height,
        position: 'relative',
        background: 'transparent', // no background
        border: 'none',            // no border
        outline: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Loading — minimal dot pulse only */}
      {loading && !error && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', zIndex: 2,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#C9A84C', opacity: 0.6,
            animation: 'pulse 1.4s ease-in-out infinite',
          }} />
        </div>
      )}

      {/* Three.js canvas mounts here */}
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
