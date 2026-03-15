import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, GridLayout } from "@/components/layouts";
import {
    EditableH1,
    EditableH2,
    EditableParagraph,
    InlineTooltip,
} from "@/components/atoms";
import { Cartesian3D } from "@/components/atoms/visual/Cartesian3D";
import { InteractionHintSequence } from "@/components/atoms/visual/InteractionHint";

// ============================================================================
// INTRODUCTION SECTION
// Surface Area vs Volume - Side by Side Comparison
// ============================================================================

// 3D Visualization showing the cube with faces visible (surface area concept)
function SurfaceAreaCube() {
    return (
        <div className="relative">
            <Cartesian3D
                height={300}
                cameraPosition={[6, 4, 6]}
                axisLength={4}
                showAxes={false}
                showGrid={false}
                plots={[
                    // Each face of the cube as a semi-transparent plane
                    // Front face
                    {
                        type: "plane",
                        point: [1.5, 1.5, 3],
                        normal: [0, 0, 1],
                        size: 3,
                        color: "#62D0AD",
                        opacity: 0.7,
                    },
                    // Back face
                    {
                        type: "plane",
                        point: [1.5, 1.5, 0],
                        normal: [0, 0, -1],
                        size: 3,
                        color: "#62D0AD",
                        opacity: 0.7,
                    },
                    // Top face
                    {
                        type: "plane",
                        point: [1.5, 3, 1.5],
                        normal: [0, 1, 0],
                        size: 3,
                        color: "#8E90F5",
                        opacity: 0.7,
                    },
                    // Bottom face
                    {
                        type: "plane",
                        point: [1.5, 0, 1.5],
                        normal: [0, -1, 0],
                        size: 3,
                        color: "#8E90F5",
                        opacity: 0.7,
                    },
                    // Left face
                    {
                        type: "plane",
                        point: [0, 1.5, 1.5],
                        normal: [-1, 0, 0],
                        size: 3,
                        color: "#F7B23B",
                        opacity: 0.7,
                    },
                    // Right face
                    {
                        type: "plane",
                        point: [3, 1.5, 1.5],
                        normal: [1, 0, 0],
                        size: 3,
                        color: "#F7B23B",
                        opacity: 0.7,
                    },
                    // Edges for clarity
                    { type: "segment", point1: [0, 0, 0], point2: [3, 0, 0], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, 0, 0], point2: [0, 3, 0], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, 0, 0], point2: [0, 0, 3], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [3, 0, 0], point2: [3, 3, 0], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [3, 0, 0], point2: [3, 0, 3], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, 3, 0], point2: [3, 3, 0], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, 3, 0], point2: [0, 3, 3], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, 0, 3], point2: [3, 0, 3], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, 0, 3], point2: [0, 3, 3], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [3, 3, 0], point2: [3, 3, 3], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [3, 0, 3], point2: [3, 3, 3], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, 3, 3], point2: [3, 3, 3], color: "#334155", lineWidth: 2 },
                ]}
                autoRotate={false}
            />
            <InteractionHintSequence
                hintKey="intro-surface-area-cube"
                steps={[{ gesture: "orbit-3d", label: "Drag to rotate and see all 6 faces", position: { x: "50%", y: "50%" } }]}
            />
        </div>
    );
}

// 3D Visualization showing the cube filled with small cubes (volume concept)
function VolumeCube() {
    const smallCubes: { type: "sphere"; center: [number, number, number]; radius: number; color: string; opacity: number }[] = [];
    const spacing = 1;
    const offset = 0.5;

    // Create a 3x3x3 grid of small spheres to represent unit cubes filling the volume
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            for (let z = 0; z < 3; z++) {
                smallCubes.push({
                    type: "sphere",
                    center: [x * spacing + offset, y * spacing + offset, z * spacing + offset],
                    radius: 0.35,
                    color: "#AC8BF9",
                    opacity: 0.8,
                });
            }
        }
    }

    return (
        <div className="relative">
            <Cartesian3D
                height={300}
                cameraPosition={[6, 4, 6]}
                axisLength={4}
                showAxes={false}
                showGrid={false}
                plots={[
                    ...smallCubes,
                    // Wireframe edges
                    { type: "segment", point1: [0, 0, 0], point2: [3, 0, 0], color: "#334155", lineWidth: 1, dashed: true },
                    { type: "segment", point1: [0, 0, 0], point2: [0, 3, 0], color: "#334155", lineWidth: 1, dashed: true },
                    { type: "segment", point1: [0, 0, 0], point2: [0, 0, 3], color: "#334155", lineWidth: 1, dashed: true },
                    { type: "segment", point1: [3, 0, 0], point2: [3, 3, 0], color: "#334155", lineWidth: 1, dashed: true },
                    { type: "segment", point1: [3, 0, 0], point2: [3, 0, 3], color: "#334155", lineWidth: 1, dashed: true },
                    { type: "segment", point1: [0, 3, 0], point2: [3, 3, 0], color: "#334155", lineWidth: 1, dashed: true },
                    { type: "segment", point1: [0, 3, 0], point2: [0, 3, 3], color: "#334155", lineWidth: 1, dashed: true },
                    { type: "segment", point1: [0, 0, 3], point2: [3, 0, 3], color: "#334155", lineWidth: 1, dashed: true },
                    { type: "segment", point1: [0, 0, 3], point2: [0, 3, 3], color: "#334155", lineWidth: 1, dashed: true },
                    { type: "segment", point1: [3, 3, 0], point2: [3, 3, 3], color: "#334155", lineWidth: 1, dashed: true },
                    { type: "segment", point1: [3, 0, 3], point2: [3, 3, 3], color: "#334155", lineWidth: 1, dashed: true },
                    { type: "segment", point1: [0, 3, 3], point2: [3, 3, 3], color: "#334155", lineWidth: 1, dashed: true },
                ]}
                autoRotate={false}
            />
            <InteractionHintSequence
                hintKey="intro-volume-cube"
                steps={[{ gesture: "orbit-3d", label: "Drag to rotate and count 27 unit cubes inside", position: { x: "50%", y: "50%" } }]}
            />
        </div>
    );
}

export const introductionBlocks: ReactElement[] = [
    // Title
    <StackLayout key="layout-intro-title" maxWidth="xl">
        <Block id="intro-title" padding="lg">
            <EditableH1 id="h1-intro-title" blockId="intro-title">
                Surface Area and Volume of 3D Shapes
            </EditableH1>
        </Block>
    </StackLayout>,

    // Hook paragraph
    <StackLayout key="layout-intro-hook" maxWidth="xl">
        <Block id="intro-hook" padding="sm">
            <EditableParagraph id="para-intro-hook" blockId="intro-hook">
                Imagine you want to wrap a gift box with paper, and also fill that same box with sand. You would need to measure two completely different things: the amount of paper to cover the outside, and the amount of sand to fill the inside. These are{" "}
                <InlineTooltip id="tooltip-surface-area" tooltip="The total area of all the outer surfaces of a 3D shape, measured in square units like cm² or m²">
                    surface area
                </InlineTooltip>
                {" "}and{" "}
                <InlineTooltip id="tooltip-volume" tooltip="The amount of space inside a 3D shape, measured in cubic units like cm³ or m³">
                    volume
                </InlineTooltip>
                . Understanding the difference is essential for solving real-world problems in architecture, engineering, and everyday life.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Section heading for side-by-side comparison
    <StackLayout key="layout-intro-comparison-heading" maxWidth="xl">
        <Block id="intro-comparison-heading" padding="md">
            <EditableH2 id="h2-intro-comparison-heading" blockId="intro-comparison-heading">
                Surface Area vs Volume: A Visual Comparison
            </EditableH2>
        </Block>
    </StackLayout>,

    // Side-by-side 3D comparison
    <GridLayout key="layout-intro-comparison-visuals" columns={2} gap="lg">
        <Block id="intro-surface-area-visual" padding="sm" hasVisualization>
            <div className="text-center mb-4">
                <span className="text-lg font-semibold text-slate-700">Surface Area</span>
                <p className="text-sm text-slate-500 mt-1">The outside covering</p>
            </div>
            <SurfaceAreaCube />
            <p className="text-center text-sm text-slate-600 mt-3">
                6 faces × 9 cm² each = <strong>54 cm²</strong>
            </p>
        </Block>
        <Block id="intro-volume-visual" padding="sm" hasVisualization>
            <div className="text-center mb-4">
                <span className="text-lg font-semibold text-slate-700">Volume</span>
                <p className="text-sm text-slate-500 mt-1">The inside space</p>
            </div>
            <VolumeCube />
            <p className="text-center text-sm text-slate-600 mt-3">
                3 × 3 × 3 = <strong>27 cm³</strong>
            </p>
        </Block>
    </GridLayout>,

    // Explanation paragraph
    <StackLayout key="layout-intro-explanation" maxWidth="xl">
        <Block id="intro-explanation" padding="md">
            <EditableParagraph id="para-intro-explanation" blockId="intro-explanation">
                Look at the two cubes above. On the left, you can see the six coloured faces that make up the surface of the cube. Drag to rotate it and notice how each face is a square. On the right, the same cube is filled with 27 smaller unit cubes. This shows how volume measures the space inside. The key insight is that surface area uses square units (cm²) while volume uses cubic units (cm³). When you double the side length of a cube, its surface area increases by 4 times, but its volume increases by 8 times!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Transition to next sections
    <StackLayout key="layout-intro-transition" maxWidth="xl">
        <Block id="intro-transition" padding="md">
            <EditableParagraph id="para-intro-transition" blockId="intro-transition">
                In the sections that follow, you will explore each 3D shape interactively. You can change dimensions, see how the formulas work in real-time, and build a deep understanding of when to use surface area versus volume calculations. Let's start with the simplest shapes: the cube and cuboid.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
