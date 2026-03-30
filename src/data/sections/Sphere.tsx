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
// SPHERE SECTION
// ============================================================================

function InteractiveSphere() {
    const radius = useVar("sphereRadius", 3) as number;

    // Create sphere using parametric surface
    const sphereSurface = (u: number, v: number): [number, number, number] => {
        const x = radius * Math.sin(v) * Math.cos(u);
        const y = radius * Math.cos(v);
        const z = radius * Math.sin(v) * Math.sin(u);
        return [x, y, z];
    };

    // Equator circle
    const equatorPoints: [number, number, number][] = [];
    for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * 2 * Math.PI;
        equatorPoints.push([radius * Math.cos(angle), 0, radius * Math.sin(angle)]);
    }

    // Prime meridian
    const meridianPoints: [number, number, number][] = [];
    for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * 2 * Math.PI;
        meridianPoints.push([radius * Math.cos(angle), radius * Math.sin(angle), 0]);
    }

    return (
        <div className="relative">
            <Cartesian3D
                height={380}
                cameraPosition={[8, 6, 8]}
                axisLength={radius + 2}
                showAxes={true}
                showGrid={true}
                showLabels={true}
                plots={[
                    // Sphere surface
                    {
                        type: "parametric-surface",
                        fn: sphereSurface,
                        uRange: [0, 2 * Math.PI],
                        vRange: [0, Math.PI],
                        resolution: 40,
                        color: "#AC8BF9",
                        opacity: 0.5,
                    },
                    // Center point
                    {
                        type: "point",
                        position: [0, 0, 0],
                        color: "#ef4444",
                        size: 0.12,
                    },
                    // Radius line
                    {
                        type: "segment",
                        point1: [0, 0, 0],
                        point2: [radius, 0, 0],
                        color: "#62D0AD",
                        lineWidth: 3,
                    },
                    // Equator
                    {
                        type: "polyline",
                        points: equatorPoints,
                        color: "#F7B23B",
                        lineWidth: 2,
                    },
                    // Meridian
                    {
                        type: "polyline",
                        points: meridianPoints,
                        color: "#8E90F5",
                        lineWidth: 2,
                    },
                ]}
            />
            <InteractionHintSequence
                hintKey="sphere-3d-rotate"
                steps={[{ gesture: "orbit-3d", label: "Drag to rotate the sphere", position: { x: "50%", y: "50%" } }]}
            />
        </div>
    );
}

function SphereCalculations() {
    const radius = useVar("sphereRadius", 3) as number;
    const surfaceArea = 4 * Math.PI * radius * radius;
    const volume = (4 / 3) * Math.PI * radius * radius * radius;

    return (
        <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
            <div className="text-center">
                <span className="text-sm text-slate-500">Diameter</span>
                <p className="text-lg font-semibold text-purple-600">{(2 * radius).toFixed(1)} cm</p>
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

export const sphereBlocks: ReactElement[] = [
    <StackLayout key="layout-sphere-heading" maxWidth="xl">
        <Block id="sphere-heading" padding="lg">
            <EditableH2 id="h2-sphere-heading" blockId="sphere-heading">
                The Sphere: Perfect Symmetry in 3D
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sphere-intro" maxWidth="xl">
        <Block id="sphere-intro" padding="sm">
            <EditableParagraph id="para-sphere-intro" blockId="sphere-intro">
                A sphere is perfectly symmetrical. Every surface point is the same distance from the center. The only measurement needed is the{" "}
                <InlineSpotColor varName="sphereRadius" color="#62D0AD">radius</InlineSpotColor>
                .
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive sphere visualization
    <SplitLayout key="layout-sphere-interactive" ratio="2:1" gap="lg">
        <Block id="sphere-visualization" padding="sm" hasVisualization>
            <InteractiveSphere />
        </Block>
        <div className="space-y-4">
            <Block id="sphere-controls" padding="sm">
                <EditableParagraph id="para-sphere-controls" blockId="sphere-controls">
                    <strong>Radius:</strong>{" "}
                    <InlineScrubbleNumber
                        varName="sphereRadius"
                        {...numberPropsFromDefinition(getVariableInfo("sphereRadius"))}
                    />{" "}
                    cm
                </EditableParagraph>
            </Block>
            <Block id="sphere-calculations" padding="sm">
                <SphereCalculations />
            </Block>
        </div>
    </SplitLayout>,

    <StackLayout key="layout-sphere-explore" maxWidth="xl">
        <Block id="sphere-explore" padding="sm">
            <EditableParagraph id="para-sphere-explore" blockId="sphere-explore">
                Rotate and observe perfect roundness from every angle. The amber equator and indigo meridian show the sphere's symmetry. The green radius is the same length in any direction.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Sphere formulas
    <StackLayout key="layout-sphere-formulas-heading" maxWidth="xl">
        <Block id="sphere-formulas-heading" padding="md">
            <EditableH3 id="h3-sphere-formulas-heading" blockId="sphere-formulas-heading">
                Sphere Formulas
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sphere-surface-formula" maxWidth="xl">
        <Block id="sphere-surface-formula" padding="sm">
            <FormulaBlock
                latex="\text{Surface Area} = 4\pi \scrub{sphereRadius}^2"
                variables={scrubVarsFromDefinitions(["sphereRadius"])}
                colorMap={{ sphereRadius: "#62D0AD" }}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sphere-surface-explanation" maxWidth="xl">
        <Block id="sphere-surface-explanation" padding="sm">
            <EditableParagraph id="para-sphere-surface-explanation" blockId="sphere-surface-explanation">
                Surface area = 4 × the area of a circle with the same radius. Archimedes discovered this over 2000 years ago.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sphere-volume-formula" maxWidth="xl">
        <Block id="sphere-volume-formula" padding="sm">
            <FormulaBlock
                latex="\text{Volume} = \frac{4}{3}\pi \scrub{sphereRadius}^3"
                variables={scrubVarsFromDefinitions(["sphereRadius"])}
                colorMap={{ sphereRadius: "#62D0AD" }}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-sphere-volume-explanation" maxWidth="xl">
        <Block id="sphere-volume-explanation" padding="sm">
            <EditableParagraph id="para-sphere-volume-explanation" blockId="sphere-volume-explanation">
                The 4/3 factor: a sphere fills exactly 2/3 of a cylinder that fits perfectly around it. This gives (4/3)πr³.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Sphere assessment
    <StackLayout key="layout-sphere-question" maxWidth="xl">
        <Block id="sphere-question" padding="md">
            <EditableParagraph id="para-sphere-question" blockId="sphere-question">
                <strong>Calculate:</strong> A spherical ball has radius 6 cm. What is its volume? (Use π ≈ 3.14, round to the nearest whole number){" "}
                <InlineFeedback
                    varName="answerSphereVolume"
                    correctValue="905"
                    position="terminal"
                    successMessage="— excellent! (4/3) × 3.14 × 6³ = (4/3) × 3.14 × 216 ≈ 905 cm³"
                    failureMessage="— not quite"
                    hint="Volume = (4/3) × π × r³. Calculate (4/3) × 3.14 × 6 × 6 × 6"
                    reviewBlockId="sphere-volume-formula"
                    reviewLabel="Review the formula"
                >
                    <InlineClozeInput
                        varName="answerSphereVolume"
                        correctAnswer="905"
                        {...clozePropsFromDefinition(getVariableInfo("answerSphereVolume"))}
                    />
                </InlineFeedback>{" "}
                cm³
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
