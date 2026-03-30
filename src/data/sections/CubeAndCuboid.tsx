import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableH3,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineClozeInput,
    InlineFeedback,
    InlineSpotColor,
} from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { Cartesian3D } from "@/components/atoms/visual/Cartesian3D";
import { InteractionHintSequence } from "@/components/atoms/visual/InteractionHint";
import { useVar } from "@/stores";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    clozePropsFromDefinition,
    scrubVarsFromDefinitions,
} from "../variables";

// ============================================================================
// CUBE SECTION
// ============================================================================

function InteractiveCube() {
    const side = useVar("cubeSide", 3) as number;

    return (
        <div className="relative">
            <Cartesian3D
                height={350}
                cameraPosition={[8, 6, 8]}
                axisLength={Math.max(side + 1, 5)}
                showAxes={true}
                showGrid={true}
                showLabels={true}
                plots={[
                    // Cube faces with transparency
                    { type: "plane", point: [side / 2, side / 2, side], normal: [0, 0, 1], size: side, color: "#62D0AD", opacity: 0.5 },
                    { type: "plane", point: [side / 2, side / 2, 0], normal: [0, 0, -1], size: side, color: "#62D0AD", opacity: 0.5 },
                    { type: "plane", point: [side / 2, side, side / 2], normal: [0, 1, 0], size: side, color: "#8E90F5", opacity: 0.5 },
                    { type: "plane", point: [side / 2, 0, side / 2], normal: [0, -1, 0], size: side, color: "#8E90F5", opacity: 0.5 },
                    { type: "plane", point: [0, side / 2, side / 2], normal: [-1, 0, 0], size: side, color: "#F7B23B", opacity: 0.5 },
                    { type: "plane", point: [side, side / 2, side / 2], normal: [1, 0, 0], size: side, color: "#F7B23B", opacity: 0.5 },
                    // Edges
                    { type: "segment", point1: [0, 0, 0], point2: [side, 0, 0], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, 0, 0], point2: [0, side, 0], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, 0, 0], point2: [0, 0, side], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [side, 0, 0], point2: [side, side, 0], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [side, 0, 0], point2: [side, 0, side], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, side, 0], point2: [side, side, 0], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, side, 0], point2: [0, side, side], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, 0, side], point2: [side, 0, side], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, 0, side], point2: [0, side, side], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [side, side, 0], point2: [side, side, side], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [side, 0, side], point2: [side, side, side], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, side, side], point2: [side, side, side], color: "#334155", lineWidth: 2 },
                ]}
            />
            <InteractionHintSequence
                hintKey="cube-3d-rotate"
                steps={[{ gesture: "orbit-3d", label: "Drag to rotate the cube", position: { x: "50%", y: "50%" } }]}
            />
        </div>
    );
}

function CubeCalculations() {
    const side = useVar("cubeSide", 3) as number;
    const surfaceArea = 6 * side * side;
    const volume = side * side * side;

    return (
        <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
            <div className="text-center">
                <span className="text-sm text-slate-500">Surface Area</span>
                <p className="text-2xl font-bold text-indigo-600">{surfaceArea.toFixed(1)} cm²</p>
            </div>
            <div className="text-center">
                <span className="text-sm text-slate-500">Volume</span>
                <p className="text-2xl font-bold text-teal-600">{volume.toFixed(1)} cm³</p>
            </div>
        </div>
    );
}

// ============================================================================
// CUBOID SECTION
// ============================================================================

function InteractiveCuboid() {
    const length = useVar("cuboidLength", 4) as number;
    const width = useVar("cuboidWidth", 3) as number;
    const height = useVar("cuboidHeight", 2) as number;

    return (
        <div className="relative">
            <Cartesian3D
                height={350}
                cameraPosition={[10, 7, 10]}
                axisLength={Math.max(length, width, height) + 2}
                showAxes={true}
                showGrid={true}
                showLabels={true}
                plots={[
                    // Front face (z = width) - length x height
                    { type: "polygon", points: [[0, 0, width], [length, 0, width], [length, height, width], [0, height, width]], color: "#62D0AD", opacity: 0.5 },
                    // Back face (z = 0) - length x height
                    { type: "polygon", points: [[0, 0, 0], [0, height, 0], [length, height, 0], [length, 0, 0]], color: "#62D0AD", opacity: 0.5 },
                    // Top face (y = height) - length x width
                    { type: "polygon", points: [[0, height, 0], [0, height, width], [length, height, width], [length, height, 0]], color: "#8E90F5", opacity: 0.5 },
                    // Bottom face (y = 0) - length x width
                    { type: "polygon", points: [[0, 0, 0], [length, 0, 0], [length, 0, width], [0, 0, width]], color: "#8E90F5", opacity: 0.5 },
                    // Left face (x = 0) - width x height
                    { type: "polygon", points: [[0, 0, 0], [0, 0, width], [0, height, width], [0, height, 0]], color: "#F7B23B", opacity: 0.5 },
                    // Right face (x = length) - width x height
                    { type: "polygon", points: [[length, 0, 0], [length, height, 0], [length, height, width], [length, 0, width]], color: "#F7B23B", opacity: 0.5 },
                    // Edges
                    { type: "segment", point1: [0, 0, 0], point2: [length, 0, 0], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, 0, 0], point2: [0, height, 0], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, 0, 0], point2: [0, 0, width], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [length, 0, 0], point2: [length, height, 0], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [length, 0, 0], point2: [length, 0, width], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, height, 0], point2: [length, height, 0], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, height, 0], point2: [0, height, width], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, 0, width], point2: [length, 0, width], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, 0, width], point2: [0, height, width], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [length, height, 0], point2: [length, height, width], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [length, 0, width], point2: [length, height, width], color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: [0, height, width], point2: [length, height, width], color: "#334155", lineWidth: 2 },
                ]}
            />
            <InteractionHintSequence
                hintKey="cuboid-3d-rotate"
                steps={[{ gesture: "orbit-3d", label: "Drag to rotate the cuboid", position: { x: "50%", y: "50%" } }]}
            />
        </div>
    );
}

function CuboidCalculations() {
    const length = useVar("cuboidLength", 4) as number;
    const width = useVar("cuboidWidth", 3) as number;
    const height = useVar("cuboidHeight", 2) as number;
    const surfaceArea = 2 * (length * width + length * height + width * height);
    const volume = length * width * height;

    return (
        <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
            <div className="text-center">
                <span className="text-sm text-slate-500">Surface Area</span>
                <p className="text-2xl font-bold text-indigo-600">{surfaceArea.toFixed(1)} cm²</p>
            </div>
            <div className="text-center">
                <span className="text-sm text-slate-500">Volume</span>
                <p className="text-2xl font-bold text-teal-600">{volume.toFixed(1)} cm³</p>
            </div>
        </div>
    );
}

export const cubeAndCuboidBlocks: ReactElement[] = [
    // ========== CUBE SECTION ==========
    <StackLayout key="layout-cube-heading" maxWidth="xl">
        <Block id="cube-heading" padding="lg">
            <EditableH2 id="h2-cube-heading" blockId="cube-heading">
                The Cube: Equal Sides, Simple Formulas
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cube-intro" maxWidth="xl">
        <Block id="cube-intro" padding="sm">
            <EditableParagraph id="para-cube-intro" blockId="cube-intro">
                A cube has all edges equal. With side length{" "}
                <InlineScrubbleNumber
                    varName="cubeSide"
                    {...numberPropsFromDefinition(getVariableInfo("cubeSide"))}
                />{" "}
                cm, rotate the 3D shape and notice all 6 faces are identical squares.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive cube visualization
    <SplitLayout key="layout-cube-interactive" ratio="2:1" gap="lg">
        <Block id="cube-visualization" padding="sm" hasVisualization>
            <InteractiveCube />
        </Block>
        <Block id="cube-calculations" padding="sm">
            <CubeCalculations />
        </Block>
    </SplitLayout>,

    // Cube formulas
    <StackLayout key="layout-cube-formulas-heading" maxWidth="xl">
        <Block id="cube-formulas-heading" padding="md">
            <EditableH3 id="h3-cube-formulas-heading" blockId="cube-formulas-heading">
                Cube Formulas
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cube-surface-formula" maxWidth="xl">
        <Block id="cube-surface-formula" padding="sm">
            <FormulaBlock
                latex="\text{Surface Area} = 6 \times \scrub{cubeSide}^2"
                variables={scrubVarsFromDefinitions(["cubeSide"])}
                colorMap={{ cubeSide: "#62D0AD" }}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cube-surface-explanation" maxWidth="xl">
        <Block id="cube-surface-explanation" padding="sm">
            <EditableParagraph id="para-cube-surface-explanation" blockId="cube-surface-explanation">
                A cube has 6 faces, each with area{" "}
                <InlineSpotColor varName="cubeSide" color="#62D0AD">side</InlineSpotColor>
                {" "}×{" "}
                <InlineSpotColor varName="cubeSide" color="#62D0AD">side</InlineSpotColor>
                . Change the side to{" "}
                <InlineScrubbleNumber
                    varName="cubeSide"
                    {...numberPropsFromDefinition(getVariableInfo("cubeSide"))}
                />{" "}
                cm and watch the surface area grow!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cube-volume-formula" maxWidth="xl">
        <Block id="cube-volume-formula" padding="sm">
            <FormulaBlock
                latex="\text{Volume} = \scrub{cubeSide}^3"
                variables={scrubVarsFromDefinitions(["cubeSide"])}
                colorMap={{ cubeSide: "#62D0AD" }}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cube-volume-explanation" maxWidth="xl">
        <Block id="cube-volume-explanation" padding="sm">
            <EditableParagraph id="para-cube-volume-explanation" blockId="cube-volume-explanation">
                Volume is{" "}
                <InlineScrubbleNumber
                    varName="cubeSide"
                    {...numberPropsFromDefinition(getVariableInfo("cubeSide"))}
                />
                {" "}×{" "}
                <InlineScrubbleNumber
                    varName="cubeSide"
                    {...numberPropsFromDefinition(getVariableInfo("cubeSide"))}
                    showHint={false}
                />
                {" "}×{" "}
                <InlineScrubbleNumber
                    varName="cubeSide"
                    {...numberPropsFromDefinition(getVariableInfo("cubeSide"))}
                    showHint={false}
                />
                {" "}= side³. Double the side and the volume grows 8 times!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Cube assessment
    <StackLayout key="layout-cube-question" maxWidth="xl">
        <Block id="cube-question" padding="md">
            <EditableParagraph id="para-cube-question" blockId="cube-question">
                <strong>Quick Check:</strong> A cube has a side length of 5 cm. What is its surface area?{" "}
                <InlineFeedback
                    varName="answerCubeSurfaceArea"
                    correctValue="150"
                    position="terminal"
                    successMessage="— exactly right! 6 × 5² = 6 × 25 = 150 cm²"
                    failureMessage="— not quite"
                    hint="Remember: Surface Area = 6 × side². Calculate 6 × 5²"
                    reviewBlockId="cube-surface-formula"
                    reviewLabel="Review the formula"
                >
                    <InlineClozeInput
                        varName="answerCubeSurfaceArea"
                        correctAnswer="150"
                        {...clozePropsFromDefinition(getVariableInfo("answerCubeSurfaceArea"))}
                    />
                </InlineFeedback>{" "}
                cm²
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cube-question-volume" maxWidth="xl">
        <Block id="cube-question-volume" padding="md">
            <EditableParagraph id="para-cube-question-volume" blockId="cube-question-volume">
                What is the volume of the same cube (side = 5 cm)?{" "}
                <InlineFeedback
                    varName="answerCubeVolume"
                    correctValue="125"
                    position="terminal"
                    successMessage="— well done! 5³ = 5 × 5 × 5 = 125 cm³"
                    failureMessage="— try again"
                    hint="Volume = side³. Calculate 5 × 5 × 5"
                    reviewBlockId="cube-volume-formula"
                    reviewLabel="Review the formula"
                >
                    <InlineClozeInput
                        varName="answerCubeVolume"
                        correctAnswer="125"
                        {...clozePropsFromDefinition(getVariableInfo("answerCubeVolume"))}
                    />
                </InlineFeedback>{" "}
                cm³
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // ========== CUBOID SECTION ==========
    <StackLayout key="layout-cuboid-heading" maxWidth="xl">
        <Block id="cuboid-heading" padding="lg">
            <EditableH2 id="h2-cuboid-heading" blockId="cuboid-heading">
                The Cuboid: Three Different Dimensions
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cuboid-intro" maxWidth="xl">
        <Block id="cuboid-intro" padding="sm">
            <EditableParagraph id="para-cuboid-intro" blockId="cuboid-intro">
                A cuboid has{" "}
                <InlineSpotColor varName="cuboidLength" color="#62D0AD">length</InlineSpotColor>
                {" "}={" "}
                <InlineScrubbleNumber
                    varName="cuboidLength"
                    {...numberPropsFromDefinition(getVariableInfo("cuboidLength"))}
                />{" "}
                cm,{" "}
                <InlineSpotColor varName="cuboidWidth" color="#8E90F5">width</InlineSpotColor>
                {" "}={" "}
                <InlineScrubbleNumber
                    varName="cuboidWidth"
                    {...numberPropsFromDefinition(getVariableInfo("cuboidWidth"))}
                />{" "}
                cm, and{" "}
                <InlineSpotColor varName="cuboidHeight" color="#F7B23B">height</InlineSpotColor>
                {" "}={" "}
                <InlineScrubbleNumber
                    varName="cuboidHeight"
                    {...numberPropsFromDefinition(getVariableInfo("cuboidHeight"))}
                />{" "}
                cm. Rotate to see the different-sized faces.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive cuboid visualization
    <SplitLayout key="layout-cuboid-interactive" ratio="2:1" gap="lg">
        <Block id="cuboid-visualization" padding="sm" hasVisualization>
            <InteractiveCuboid />
        </Block>
        <Block id="cuboid-calculations" padding="sm">
            <CuboidCalculations />
        </Block>
    </SplitLayout>,

    // Cuboid formulas
    <StackLayout key="layout-cuboid-formulas-heading" maxWidth="xl">
        <Block id="cuboid-formulas-heading" padding="md">
            <EditableH3 id="h3-cuboid-formulas-heading" blockId="cuboid-formulas-heading">
                Cuboid Formulas
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cuboid-surface-formula" maxWidth="xl">
        <Block id="cuboid-surface-formula" padding="sm">
            <FormulaBlock
                latex="\text{Surface Area} = 2(\scrub{cuboidLength} \times \scrub{cuboidWidth} + \scrub{cuboidLength} \times \scrub{cuboidHeight} + \scrub{cuboidWidth} \times \scrub{cuboidHeight})"
                variables={scrubVarsFromDefinitions(["cuboidLength", "cuboidWidth", "cuboidHeight"])}
                colorMap={{ cuboidLength: "#62D0AD", cuboidWidth: "#8E90F5", cuboidHeight: "#F7B23B" }}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cuboid-surface-explanation" maxWidth="xl">
        <Block id="cuboid-surface-explanation" padding="sm">
            <EditableParagraph id="para-cuboid-surface-explanation" blockId="cuboid-surface-explanation">
                Three pairs of faces: top/bottom, front/back, and sides. Each pair appears twice, so multiply by 2.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cuboid-volume-formula" maxWidth="xl">
        <Block id="cuboid-volume-formula" padding="sm">
            <FormulaBlock
                latex="\text{Volume} = \scrub{cuboidLength} \times \scrub{cuboidWidth} \times \scrub{cuboidHeight}"
                variables={scrubVarsFromDefinitions(["cuboidLength", "cuboidWidth", "cuboidHeight"])}
                colorMap={{ cuboidLength: "#62D0AD", cuboidWidth: "#8E90F5", cuboidHeight: "#F7B23B" }}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cuboid-volume-explanation" maxWidth="xl">
        <Block id="cuboid-volume-explanation" padding="sm">
            <EditableParagraph id="para-cuboid-volume-explanation" blockId="cuboid-volume-explanation">
                Volume = length × width × height. Think of it as stacking layers of unit cubes.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Cuboid assessment
    <StackLayout key="layout-cuboid-question" maxWidth="xl">
        <Block id="cuboid-question" padding="md">
            <EditableParagraph id="para-cuboid-question" blockId="cuboid-question">
                <strong>Try this:</strong> A storage box has dimensions 5 cm × 4 cm × 3 cm. What is its volume?{" "}
                <InlineFeedback
                    varName="answerCuboidVolume"
                    correctValue="60"
                    position="terminal"
                    successMessage="— perfect! 5 × 4 × 3 = 60 cm³"
                    failureMessage="— not quite"
                    hint="Volume = length × width × height. Multiply all three numbers together"
                    reviewBlockId="cuboid-volume-formula"
                    reviewLabel="Review the formula"
                >
                    <InlineClozeInput
                        varName="answerCuboidVolume"
                        correctAnswer="60"
                        {...clozePropsFromDefinition(getVariableInfo("answerCuboidVolume"))}
                    />
                </InlineFeedback>{" "}
                cm³
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
