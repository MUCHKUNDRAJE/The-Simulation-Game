import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";
import { AnimationMixer, Vector3 } from "three";
import { keyPressHandler } from "../utils/keypress";

export default function Character() {
  const characterRef = useRef(null);
  const mixerRef = useRef(null);
  const actionRef = useRef(null);
  const jumpActionRef = useRef(null);
  const [keys, setKeys] = useState({ KeyW: false, KeyA: false, KeyS: false, KeyD: false });
  const [KeyPress, setKeyPress] = useState();
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const rotation = useRef({ azimuth: Math.PI / 2, polar: Math.PI / 4 });
  const velocity = useRef(new Vector3());
  const [Jump, setJump] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    const loader = new FBXLoader();
    loader.load("/models/X Bot.fbx", (fbx) => {
      fbx.scale.set(0.01, 0.01, 0.01);
      fbx.position.set(0, 0, 0);
      characterRef.current = fbx;

      const mixer = new AnimationMixer(fbx);
      mixerRef.current = mixer;

      loader.load("/models/Walking-inplace.fbx", (anim) => {
        const action = mixer.clipAction(anim.animations[0]);
        action.play();
        action.paused = true;
        mixer.timeScale = 1.5;
        actionRef.current = action;
      });

      loader.load("/models/Hip Hop Dancing.fbx", (jump) => {
        const jumpAction = mixer.clipAction(jump.animations[0]);
        jumpAction.setLoop(THREE.LoopOnce);
        jumpAction.clampWhenFinished = true;
        jumpActionRef.current = jumpAction;
      });

      camera.position.set(0, 2, 5);
      camera.lookAt(fbx.position);
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const getKeyChar = (code) => code.replace(/^Key/, "");
      setKeys((prev) => ({ ...prev, [event.code]: true }));
      setKeyPress(getKeyChar(event.code));
      keyPressHandler(getKeyChar(event.code));

      if (event.code === "Space" && !isJumping) {
        setJump(true);
        return;
      }

      if (!isJumping && ["KeyW", "KeyA", "KeyS", "KeyD"].includes(event.code)) {
        if (actionRef.current) actionRef.current.paused = false;
      }
    };

    const handleKeyUp = (event) => {
      const updated = { ...keys, [event.code]: false };
      setKeys(updated);
      setKeyPress(event.code);

      if (event.code === "Space") return;

      if (!Object.values(updated).some((v) => v) && !isJumping) {
        if (actionRef.current) actionRef.current.paused = true;
      }
    };

    const handleMouseMove = (event) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;

      const deltaX = event.movementX || 0;
      const deltaY = event.movementY || 0;

      rotation.current.azimuth -= deltaX * 0.005;
      rotation.current.polar -= deltaY * 0.005;

      rotation.current.polar = Math.max(0.2, Math.min(Math.PI / 2, rotation.current.polar));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [keys, isJumping]);

  useEffect(() => {
    if (Jump && jumpActionRef.current) {
      setIsJumping(true);
      jumpActionRef.current.reset().play();
      if (actionRef.current) actionRef.current.paused = true;

      setTimeout(() => {
        setIsJumping(false);
        setJump(false);

        if (Object.values(keys).some((v) => v) && actionRef.current) {
          actionRef.current.paused = false;
        }
      }, 1000); // Match this to jump duration
    }
  }, [Jump]);

  useFrame((_, delta) => {
    if (!characterRef.current) return;
    if (mixerRef.current) mixerRef.current.update(delta);

    const moveSpeed = 2;
    const direction = new Vector3();
    if (keys.KeyW) direction.z -= 1;
    if (keys.KeyS) direction.z += 1;
    if (keys.KeyA) direction.x -= 1;
    if (keys.KeyD) direction.x += 1;

    direction.normalize().multiplyScalar(moveSpeed);
    velocity.current.lerp(direction, 0.2);

    const move = velocity.current.clone().multiplyScalar(delta);
    characterRef.current.position.add(move);

    if (!isJumping) {
      if (keys.KeyW) characterRef.current.rotation.y = Math.PI;
      else if (keys.KeyS) characterRef.current.rotation.y = 0;
      else if (keys.KeyA) characterRef.current.rotation.y = -Math.PI / 2;
      else if (keys.KeyD) characterRef.current.rotation.y = Math.PI / 2;
    }

    const charPos = characterRef.current.position.clone();
    const cameraOffset = new Vector3(0, 1.9, 4.9);
    const targetPos = charPos.clone().add(cameraOffset);

    camera.position.lerp(targetPos, 0.1);
    camera.lookAt(charPos);
  });

  return characterRef.current ? <primitive object={characterRef.current} /> : null;
}
