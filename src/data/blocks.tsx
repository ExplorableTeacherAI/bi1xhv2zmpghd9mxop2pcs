import { type ReactElement } from "react";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

// Import section blocks
import { introductionBlocks } from "./sections/Introduction";
import { cubeAndCuboidBlocks } from "./sections/CubeAndCuboid";
import { cylinderBlocks } from "./sections/Cylinder";
import { coneBlocks } from "./sections/Cone";
import { sphereBlocks } from "./sections/Sphere";
import { pyramidBlocks } from "./sections/Pyramid";
import { formulaChallengeBlocks } from "./sections/FormulaChallenge";

/**
 * ------------------------------------------------------------------
 * 3D MENSURATION: Surface Area and Volume of 3D Shapes
 * ------------------------------------------------------------------
 *
 * Target audience: Students aged 15-16 (Secondary school)
 *
 * Sections:
 * 1. Introduction - Surface Area vs Volume comparison
 * 2. Cube & Cuboid - The foundation of 3D shapes
 * 3. Cylinder - Introducing curved surfaces
 * 4. Cone - Understanding slant height vs vertical height
 * 5. Sphere - Perfect symmetry in 3D
 * 6. Pyramid - Connecting base shape to volume
 * 7. Formula Finder Challenge - Practice choosing the right formula
 * ------------------------------------------------------------------
 */

export const blocks: ReactElement[] = [
    ...introductionBlocks,
    ...cubeAndCuboidBlocks,
    ...cylinderBlocks,
    ...coneBlocks,
    ...sphereBlocks,
    ...pyramidBlocks,
    ...formulaChallengeBlocks,
];
