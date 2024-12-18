import React from "react";

import { useThree } from "@react-three/fiber";
import gsap from "gsap";

import Background from "./Background";
import Earth from "./earth";
import Sun from "./sun";
import Moon from "./moon";
import { ControlsContext } from "../../App";
import { degToRad, getDegreeDistance } from "../../lib";
import useMainStore from "../../store/useMainStore";

/**
 * This component include all object in this app, such as sun, earth, and the star in the background
 * */
const Universe = () => {
  //#region  //*=========== Get Data From Store ===========
  const focusTarget = useMainStore.useFocusTarget();
  const { controls } = React.useContext(ControlsContext);
  //#endregion  //*======== Get Data From Outside ===========

  const { camera } = useThree();
  const groupRef = React.useRef();

  React.useEffect(() => {
    if (groupRef.current && controls.current) {
      if (focusTarget !== null) {
        //#region  //*=========== Calculate necessary rotation in y axis ===========
        const earthRotation = getDegreeDistance();
        let totalYRotation = -(
          focusTarget.rotation.y + degToRad(earthRotation)
        );
        totalYRotation < -Math.PI &&
          (totalYRotation = totalYRotation + 2 * Math.PI);
        //#endregion  //*======== Calculate necessary rotation in y axis ===========

        //#region  //*=========== Animate Zoom In To Focused Object ===========
        gsap.to(groupRef.current.rotation, {
          duration: 1,
          x: -focusTarget.rotation.x,
          y: totalYRotation,
          z: -focusTarget.rotation.z,
          order: "ZXY",
        });
        gsap.to(controls.current.target, { duration: 1, x: 0, y: 3.1, z: 0 });

        gsap
          .timeline({ paused: false })
          .to(camera.position, { duration: 0.5, y: 3 })
          .to(controls.current, {
            duration: 0.5,
            minDistance: 0.5,
            maxDistance: 0.5,
            maxPolarAngle: Math.PI / 2,
            // autoRotate: true
          });
        //#endregion  //*======== Animate Zoom In To Focused Object ===========
      } else {
        //#region  //*=========== Animate Zoom Out Back To Earth ===========
        gsap.to(groupRef.current.rotation, {
          duration: 2,
          x: 0,
          y: 0,
          z: 0,
          order: "ZXY",
        });
        gsap.to(controls.current.target, { duration: 2, x: 0, y: 0, z: 0 });
        gsap
          .timeline({ paused: false })
          .to(controls.current, {
            duration: 0.5,
            minDistance: 3.1,
            maxDistance: 8,
            maxPolarAngle: Math.PI,
            // autoRotate: false
          })
          .to(camera.position, { duration: 2, x: 0, y: 0, z: 5 });
        //#endregion  //*======== Animate Zoom Out Back To Earth ===========
      }
    }
  }, [groupRef.current, controls.current, focusTarget]);

  return (
    <group ref={groupRef}>
      <Background />
      <Sun />
      <Earth />
      <Moon />
    </group>
  );
};

export default Universe;
