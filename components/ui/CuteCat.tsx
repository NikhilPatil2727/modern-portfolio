"use client";

import React, { useEffect, useState, useRef } from "react";

// Sprite coordinate grid mapping (multiplied by 32px)
const SPRITE_SETS: Record<string, number[][]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
};

export default function CuteCat() {
  const [mounted, setMounted] = useState(false);
  
  // Visual positions (triggering re-renders)
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [bgPosition, setBgPosition] = useState("-96px -96px"); // default idle sprite [-3, -3]

  // Track the actual current state without triggering immediate extra re-renders
  const stateRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    hasMouseMoved: false,
    frameCount: 0,
    idleTime: 0,
    idleAnimation: null as string | null,
    idleAnimationFrame: 0,
    lastFrameTimestamp: 0,
  });

  const nekoSpeed = 10;

  useEffect(() => {
    setMounted(true);
    
    // Set initial position to center of viewport
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    setX(startX);
    setY(startY);
    
    stateRef.current.x = startX;
    stateRef.current.y = startY;
    stateRef.current.targetX = startX;
    stateRef.current.targetY = startY;

    const handleMouseMove = (event: MouseEvent) => {
      stateRef.current.hasMouseMoved = true;
      stateRef.current.targetX = event.clientX;
      stateRef.current.targetY = event.clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        stateRef.current.hasMouseMoved = true;
        stateRef.current.targetX = event.touches[0].clientX;
        stateRef.current.targetY = event.touches[0].clientY;
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        stateRef.current.hasMouseMoved = true;
        stateRef.current.targetX = event.touches[0].clientX;
        stateRef.current.targetY = event.touches[0].clientY;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchstart", handleTouchStart);

    let animationFrameId: number;

    const setSprite = (name: string, frame: number) => {
      const set = SPRITE_SETS[name] || SPRITE_SETS["idle"];
      const sprite = set[frame % set.length];
      setBgPosition(`${sprite[0] * 32}px ${sprite[1] * 32}px`);
    };

    const resetIdleAnimation = () => {
      stateRef.current.idleAnimation = null;
      stateRef.current.idleAnimationFrame = 0;
    };

    const idle = () => {
      const state = stateRef.current;
      state.idleTime += 1;

      // Trigger random idle animations (sleeping, scratching) every ~20 seconds of idle
      if (
        state.idleTime > 10 &&
        Math.floor(Math.random() * 200) === 0 &&
        state.idleAnimation === null
      ) {
        const availableIdleAnimations = ["sleeping", "scratchSelf"];
        if (state.x < 32) {
          availableIdleAnimations.push("scratchWallW");
        }
        if (state.y < 32) {
          availableIdleAnimations.push("scratchWallN");
        }
        if (state.x > window.innerWidth - 32) {
          availableIdleAnimations.push("scratchWallE");
        }
        if (state.y > window.innerHeight - 32) {
          availableIdleAnimations.push("scratchWallS");
        }
        state.idleAnimation =
          availableIdleAnimations[
            Math.floor(Math.random() * availableIdleAnimations.length)
          ];
      }

      switch (state.idleAnimation) {
        case "sleeping":
          if (state.idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(state.idleAnimationFrame / 4));
          if (state.idleAnimationFrame > 192) {
            resetIdleAnimation();
          }
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(state.idleAnimation, state.idleAnimationFrame);
          if (state.idleAnimationFrame > 9) {
            resetIdleAnimation();
          }
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      state.idleAnimationFrame += 1;
    };

    const frame = () => {
      const state = stateRef.current;
      
      // If the mouse hasn't moved yet, we keep the cat in idle state at starting position
      if (!state.hasMouseMoved) {
        setSprite("idle", 0);
        return;
      }

      state.frameCount += 1;
      const diffX = state.x - state.targetX;
      const diffY = state.y - state.targetY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      // If close enough to target, switch to idle animations
      if (distance < nekoSpeed || distance < 48) {
        idle();
        return;
      }

      resetIdleAnimation();

      // Alert reaction before moving
      if (state.idleTime > 1) {
        setSprite("alert", 0);
        // Count down alert phase
        state.idleTime = Math.min(state.idleTime, 7);
        state.idleTime -= 1;
        return;
      }

      // Determine direction code (N, NE, E, SE, S, SW, W, NW)
      let direction = "";
      direction = diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";

      setSprite(direction, state.frameCount);

      // Translate position towards target
      state.x -= (diffX / distance) * nekoSpeed;
      state.y -= (diffY / distance) * nekoSpeed;

      // Viewport boundaries clamping
      state.x = Math.min(Math.max(16, state.x), window.innerWidth - 16);
      state.y = Math.min(Math.max(16, state.y), window.innerHeight - 16);

      // Trigger visual updates
      setX(state.x);
      setY(state.y);
    };

    const loop = (timestamp: number) => {
      const state = stateRef.current;
      if (!state.lastFrameTimestamp) {
        state.lastFrameTimestamp = timestamp;
      }

      if (timestamp - state.lastFrameTimestamp > 100) {
        state.lastFrameTimestamp = timestamp;
        frame();
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchstart", handleTouchStart);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        width: "32px",
        height: "32px",
        position: "fixed",
        left: `${x - 16}px`,
        top: `${y - 16}px`,
        backgroundImage: 'url("/oneko-tora.gif")',
        backgroundPosition: bgPosition,
        imageRendering: "pixelated",
        pointerEvents: "none",
        zIndex: 99999,
        transition: "opacity 0.3s ease",
      }}
    />
  );
}
