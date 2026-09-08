// One geometric specification drives the static projection and Three.js model.
export const coreModules = Array.from({ length: 27 }, (_, i) => {
  const x = i % 3 - 1; const y = Math.floor(i / 9) - 1; const z = Math.floor(i / 3) % 3 - 1;
  return { x: x * 1.1, y: y * 1.1, z: z * 1.1, core: x === 0 && z === 0, index: i };
});
export const scenePolicy = { mobileDpr: 1.25, desktopDpr: 1.5, duration: 1200, maxDrawCalls: 80, maxTriangles: 70000 } as const;
