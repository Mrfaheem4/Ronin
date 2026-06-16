import { SmokeScene } from "react-smoke";
import { useMemo, memo } from "react";
import * as THREE from "three";

const SmokeLayer = memo(function SmokeLayer() {
  const smokeConfig = useMemo(
    () => ({
      color: new THREE.Color("white"),
      density: 30,
      opacity: 0.12,
      enableWind: true,
    }),
    [],
  );

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 3,
        pointerEvents: "none",
      }}
    >
      <SmokeScene smoke={smokeConfig} />
    </div>
  );
});

export default SmokeLayer;
