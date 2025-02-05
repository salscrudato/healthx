export const bodyPartsData = [
  {
    key: "head",
    label: "Head",
    ariaLabel: "Head region",
    path: `
      M75,5
      c-11,0 -20,9 -20,20
      s9,20 20,20
      s20,-9 20,-20
      s-9,-20 -20,-20
      z
    `,
  },
  {
    key: "neck",
    label: "Neck",
    ariaLabel: "Neck region",
    path: `
      M65,40
      h20
      v20
      h-20
      z
    `,
  },
  {
    key: "chest",
    label: "Chest",
    ariaLabel: "Chest region",
    path: `
      M45,60
      c10,-10 50,-10 60,0
      v40
      h-60
      z
    `,
  },
  {
    key: "abdomen",
    label: "Abdomen",
    ariaLabel: "Abdomen region",
    path: `
      M45,100
      h60
      v40
      h-60
      z
    `,
  },
  {
    key: "pelvis",
    label: "Pelvis",
    ariaLabel: "Pelvic region",
    path: `
      M45,125
      c10,10 50,10 60,0
      v20
      h-60
      z
    `,
  },

  /**
   * Left Shoulder / Arm Segments
   */
  {
    key: "leftShoulder",
    label: "Left Shoulder",
    ariaLabel: "Left shoulder region",
    path: `
      M45,60
      c-2,3 -8,3 -10,12
      h10
      v15
      h15
      v-27
      z
    `,
  },
  {
    key: "leftUpperArm",
    label: "Left Upper Arm",
    ariaLabel: "Left upper arm",
    path: `
      M35,72
      c-3,15 -3,25 -3,30
      c0,5 3,5 3,5
      h15
      v-35
      z
    `,
  },
  {
    key: "leftLowerArm",
    label: "Left Lower Arm",
    ariaLabel: "Left lower arm region",
    path: `
      M35,102
      c-2,10 -2,20 -2,25
      c0,5 2,5 2,5
      h15
      v-30
      z
    `,
  },

  /**
   * Right Shoulder / Arm Segments
   */
  {
    key: "rightShoulder",
    label: "Right Shoulder",
    ariaLabel: "Right shoulder region",
    path: `
      M105,60
      c2,3 8,3 10,12
      h-10
      v15
      h-15
      v-27
      z
    `,
  },
  {
    key: "rightUpperArm",
    label: "Right Upper Arm",
    ariaLabel: "Right upper arm region",
    path: `
      M115,72
      c3,15 3,25 3,30
      c0,5 -3,5 -3,5
      h-15
      v-35
      z
    `,
  },
  {
    key: "rightLowerArm",
    label: "Right Lower Arm",
    ariaLabel: "Right lower arm region",
    path: `
      M115,92
      c2,10 2,20 2,25
      c0,5 -2,5 -2,5
      h-15
      v-30
      z
    `,
  },

  /**
   * Legs / Feet
   */
  {
    key: "leftLeg",
    label: "Left Leg",
    ariaLabel: "Left leg region",
    path: `
      M55,145
      h-10
      v60
      c0,10 10,20 20,20
      v-80
      z
    `,
  },
  {
    key: "rightLeg",
    label: "Right Leg",
    ariaLabel: "Right leg region",
    path: `
      M95,145
      h10
      v60
      c0,10 -10,20 -20,20
      v-80
      z
    `,
  },
  {
    key: "leftFoot",
    label: "Left Foot",
    ariaLabel: "Left foot region",
    path: `
      M45,235
      scale(1, -1)
      translate(0, -250)
      c0,10 10,10 10,20
      h10
      v-10
      c-5,-5 -10,-10 -20,-10
      z
    `,
  },
  {
    key: "rightFoot",
    label: "Right Foot",
    ariaLabel: "Right foot region",
    path: `
      M105,235
      scale(1, -1)
      translate(0, -250)
      c0,10 -10,10 -10,20
      h-10
      v-10
      c5,-5 10,-10 20,-10
      z
    `,
  },
];