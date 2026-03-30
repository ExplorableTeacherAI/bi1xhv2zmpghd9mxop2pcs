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
// CYLINDER SECTION
// ============================================================================

function InteractiveCylinder() {
    const radius = useVar("cylinderRadius", 2) as number;
    const height = useVar("cylinderHeight", 4) as number;

    // Create cylinder using parametric surface
    const cylinderSurface = (u: number, v: number): [number, number, number] => {
        const x = radius * Math.cos(u);
        const y = v * height;
        const z = radius * Math.sin(u);
        return [x, y, z];
    };

    // Top circle
    const topCircle = (u: number, v: number): [number, number, number] => {
        const r = v * radius;
        const x = r * Math.cos(u);
        const y = height;
        const z = r * Math.sin(u);
        return [x, y, z];
    };

    // Bottom circle
    const bottomCircle = (u: number, v: number): [number, number, number] => {
        const r = v * radius;
        const x = r * Math.cos(u);
        const y = 0;
        const z = r * Math.sin(u);
        return [x, y, z];
    };

    return (
        <div className="relative">
            <Cartesian3D
                height={380}
                cameraPosition={[10, 8, 10]}
                axisLength={Math.max(radius + 2, height + 1)}
                showAxes={true}
                showGrid={true}
                showLabels={true}
                plots={[
                    // Curved surface
                    {
                        type: "parametric-surface",
                        fn: cylinderSurface,
                        uRange: [0, 2 * Math.PI],
                        vRange: [0, 1],
                        resolution: 40,
                        color: "#62D0AD",
                        opacity: 0.6,
                    },
                    // Top disk
                    {
                        type: "parametric-surface",
                        fn: topCircle,
                        uRange: [0, 2 * Math.PI],
                        vRange: [0, 1],
                        resolution: 30,
                        color: "#8E90F5",
                        opacity: 0.7,
                    },
                    // Bottom disk
                    {
                        type: "parametric-surface",
                        fn: bottomCircle,
                        uRange: [0, 2 * Math.PI],
                        vRange: [0, 1],
                        resolution: 30,
                        color: "#8E90F5",
                        opacity: 0.7,
                    },
                    // Height indicator line
                    {
                        type: "segment",
                        point1: [radius + 0.3, 0, 0],
                        point2: [radius + 0.3, height, 0],
                        color: "#F7B23B",
                        lineWidth: 3,
                    },
                    // Radius indicator line
                    {
                        type: "segment",
                        point1: [0, 0, 0],
                        point2: [radius, 0, 0],
                        color: "#62D0AD",
                        lineWidth: 3,
                    },
                ]}
            />
            <InteractionHintSequence
                hintKey="cylinder-3d-rotate"
                steps={[{ gesture: "orbit-3d", label: "Drag to rotate the cylinder", position: { x: "50%", y: "50%" } }]}
            />
        </div>
    );
}

function CylinderCalculations() {
    const radius = useVar("cylinderRadius", 2) as number;
    const height = useVar("cylinderHeight", 4) as number;
    const baseArea = Math.PI * radius * radius;
    const lateralArea = 2 * Math.PI * radius * height;
    const surfaceArea = 2 * baseArea + lateralArea;
    const volume = baseArea * height;

    return (
        <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
            <div className="text-center">
                <span className="text-sm text-slate-500">Base Area (πr²)</span>
                <p className="text-lg font-semibold text-purple-600">{baseArea.toFixed(2)} cm²</p>
            </div>
            <div className="text-center">
                <span className="text-sm text-slate-500">Surface Area</span>
                <p className="text-2xl font-bold text-indigo-600">{surfaceArea.toFixed(2)} cm²</p>
            </div>
            <div className="text-center">
                <span className="text-sm text-slate-500">Volume</span>
                <p className="text-2xl font-bold text-teal-600">{volume.toFixed(2)} cm³</p>
            </div>
        </div>
    );
}

export const cylinderBlocks: ReactElement[] = [
    <StackLayout key="layout-cylinder-heading" maxWidth="xl">
        <Block id="cylinder-heading" padding="lg">
            <EditableH2 id="h2-cylinder-heading" blockId="cylinder-heading">
                The Cylinder: Circles Meet Height
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cylinder-intro" maxWidth="xl">
        <Block id="cylinder-intro" padding="sm">
            <EditableParagraph id="para-cylinder-intro" blockId="cylinder-intro">
                A cylinder is like a stack of circles: two circular bases connected by a curved surface. Key measurements are the{" "}
                <InlineSpotColor varName="cylinderRadius" color="#62D0AD">radius</InlineSpotColor>
                {" "}and the{" "}
                <InlineSpotColor varName="cylinderHeight" color="#8E90F5">height</InlineSpotColor>
                .
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive cylinder visualization
    <SplitLayout key="layout-cylinder-interactive" ratio="2:1" gap="lg">
        <Block id="cylinder-visualization" padding="sm" hasVisualization>
            <InteractiveCylinder />
        </Block>
        <div className="space-y-4">
            <Block id="cylinder-controls" padding="sm">
                <EditableParagraph id="para-cylinder-controls" blockId="cylinder-controls">
                    <strong>Radius:</strong>{" "}
                    <InlineScrubbleNumber
                        varName="cylinderRadius"
                        {...numberPropsFromDefinition(getVariableInfo("cylinderRadius"))}
                    />{" "}
                    cm
                    <br />
                    <strong>Height:</strong>{" "}
                    <InlineScrubbleNumber
                        varName="cylinderHeight"
                        {...numberPropsFromDefinition(getVariableInfo("cylinderHeight"))}
                    />{" "}
                    cm
                </EditableParagraph>
            </Block>
            <Block id="cylinder-calculations" padding="sm">
                <CylinderCalculations />
            </Block>
        </div>
    </SplitLayout>,

    <StackLayout key="layout-cylinder-explore" maxWidth="xl">
        <Block id="cylinder-explore" padding="sm">
            <EditableParagraph id="para-cylinder-explore" blockId="cylinder-explore">
                Rotate to see three parts: teal curved surface and two purple circular ends. Increase radius and both parts grow. Increase height and only the curved surface gets taller.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Cylinder formulas
    <StackLayout key="layout-cylinder-formulas-heading" maxWidth="xl">
        <Block id="cylinder-formulas-heading" padding="md">
            <EditableH3 id="h3-cylinder-formulas-heading" blockId="cylinder-formulas-heading">
                Cylinder Formulas
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cylinder-surface-formula" maxWidth="xl">
        <Block id="cylinder-surface-formula" padding="sm">
            <FormulaBlock
                latex="\text{Surface Area} = 2\pi \scrub{cylinderRadius}^2 + 2\pi \scrub{cylinderRadius} \times \scrub{cylinderHeight}"
                variables={scrubVarsFromDefinitions(["cylinderRadius", "cylinderHeight"])}
                colorMap={{ cylinderRadius: "#62D0AD", cylinderHeight: "#8E90F5" }}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cylinder-surface-explanation" maxWidth="xl">
        <Block id="cylinder-surface-explanation" padding="sm">
            <EditableParagraph id="para-cylinder-surface-explanation" blockId="cylinder-surface-explanation">
                Two parts: 2πr² for the two circular ends, and 2πrh for the curved surface (imagine unrolling it into a rectangle).
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cylinder-volume-formula" maxWidth="xl">
        <Block id="cylinder-volume-formula" padding="sm">
            <FormulaBlock
                latex="\text{Volume} = \pi \scrub{cylinderRadius}^2 \times \scrub{cylinderHeight}"
                variables={scrubVarsFromDefinitions(["cylinderRadius", "cylinderHeight"])}
                colorMap={{ cylinderRadius: "#62D0AD", cylinderHeight: "#8E90F5" }}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cylinder-volume-explanation" maxWidth="xl">
        <Block id="cylinder-volume-explanation" padding="sm">
            <EditableParagraph id="para-cylinder-volume-explanation" blockId="cylinder-volume-explanation">
                Volume = base area × height. The circular base has area πr², multiplied by height. Same principle as a cuboid, just with a circular base.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Cylinder assessment
    <StackLayout key="layout-cylinder-question" maxWidth="xl">
        <Block id="cylinder-question" padding="md">
            <EditableParagraph id="para-cylinder-question" blockId="cylinder-question">
                <strong>Calculate:</strong> A cylindrical water tank has radius 5 cm and height 8 cm. What is its volume? (Use π ≈ 3.14, round to the nearest whole number){" "}
                <InlineFeedback
                    varName="answerCylinderVolume"
                    correctValue="628"
                    position="terminal"
                    successMessage="— excellent! π × 5² × 8 = 3.14 × 25 × 8 = 628 cm³"
                    failureMessage="— not quite"
                    hint="Volume = π × r² × h. Calculate 3.14 × 5 × 5 × 8"
                    reviewBlockId="cylinder-volume-formula"
                    reviewLabel="Review the formula"
                >
                    <InlineClozeInput
                        varName="answerCylinderVolume"
                        correctAnswer="628"
                        {...clozePropsFromDefinition(getVariableInfo("answerCylinderVolume"))}
                    />
                </InlineFeedback>{" "}
                cm³
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
