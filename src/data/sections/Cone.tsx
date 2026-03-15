import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableH3,
    EditableParagraph,
    InlineScrubbleNumber,
    InlineClozeChoice,
    InlineFeedback,
    InlineSpotColor,
    InlineTooltip,
} from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { Cartesian3D } from "@/components/atoms/visual/Cartesian3D";
import { InteractionHintSequence } from "@/components/atoms/visual/InteractionHint";
import { useVar } from "@/stores";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    choicePropsFromDefinition,
    scrubVarsFromDefinitions,
} from "../variables";

// ============================================================================
// CONE SECTION
// ============================================================================

function InteractiveCone() {
    const radius = useVar("coneRadius", 3) as number;
    const height = useVar("coneHeight", 4) as number;

    // Create cone using parametric surface
    const coneSurface = (u: number, v: number): [number, number, number] => {
        const r = radius * (1 - v);
        const y = v * height;
        const x = r * Math.cos(u);
        const z = r * Math.sin(u);
        return [x, y, z];
    };

    // Base circle
    const baseCircle = (u: number, v: number): [number, number, number] => {
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
                cameraPosition={[10, 6, 10]}
                axisLength={Math.max(radius + 2, height + 1)}
                showAxes={true}
                showGrid={true}
                showLabels={true}
                plots={[
                    // Cone surface
                    {
                        type: "parametric-surface",
                        fn: coneSurface,
                        uRange: [0, 2 * Math.PI],
                        vRange: [0, 1],
                        resolution: 40,
                        color: "#F7B23B",
                        opacity: 0.6,
                    },
                    // Base disk
                    {
                        type: "parametric-surface",
                        fn: baseCircle,
                        uRange: [0, 2 * Math.PI],
                        vRange: [0, 1],
                        resolution: 30,
                        color: "#8E90F5",
                        opacity: 0.7,
                    },
                    // Apex point
                    {
                        type: "point",
                        position: [0, height, 0],
                        color: "#ef4444",
                        size: 0.15,
                    },
                    // Height line (vertical)
                    {
                        type: "segment",
                        point1: [0, 0, 0],
                        point2: [0, height, 0],
                        color: "#62D0AD",
                        lineWidth: 3,
                    },
                    // Radius line
                    {
                        type: "segment",
                        point1: [0, 0, 0],
                        point2: [radius, 0, 0],
                        color: "#8E90F5",
                        lineWidth: 3,
                    },
                    // Slant height line
                    {
                        type: "segment",
                        point1: [radius, 0, 0],
                        point2: [0, height, 0],
                        color: "#AC8BF9",
                        lineWidth: 2,
                        dashed: true,
                    },
                ]}
            />
            <InteractionHintSequence
                hintKey="cone-3d-rotate"
                steps={[{ gesture: "orbit-3d", label: "Drag to rotate the cone", position: { x: "50%", y: "50%" } }]}
            />
        </div>
    );
}

function ConeCalculations() {
    const radius = useVar("coneRadius", 3) as number;
    const height = useVar("coneHeight", 4) as number;
    const slantHeight = Math.sqrt(radius * radius + height * height);
    const baseArea = Math.PI * radius * radius;
    const lateralArea = Math.PI * radius * slantHeight;
    const surfaceArea = baseArea + lateralArea;
    const volume = (1 / 3) * Math.PI * radius * radius * height;

    return (
        <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
            <div className="text-center">
                <span className="text-sm text-slate-500">Slant Height</span>
                <p className="text-lg font-semibold text-purple-600">{slantHeight.toFixed(2)} cm</p>
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

export const coneBlocks: ReactElement[] = [
    <StackLayout key="layout-cone-heading" maxWidth="xl">
        <Block id="cone-heading" padding="lg">
            <EditableH2 id="h2-cone-heading" blockId="cone-heading">
                The Cone: A Cylinder with a Point
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cone-intro" maxWidth="xl">
        <Block id="cone-intro" padding="sm">
            <EditableParagraph id="para-cone-intro" blockId="cone-intro">
                A cone is like a cylinder that tapers to a point. Think of an ice cream cone, a party hat, or a traffic cone. It has a circular base and comes to a single point called the{" "}
                <InlineTooltip id="tooltip-apex" tooltip="The tip or point at the top of the cone, opposite to the base">
                    apex
                </InlineTooltip>
                . The cone has two important height measurements:{" "}
                <InlineSpotColor varName="coneHeight" color="#62D0AD">vertical height</InlineSpotColor>
                {" "}(straight up from base to apex) and{" "}
                <InlineTooltip id="tooltip-slant-height" tooltip="The distance along the surface from the edge of the base to the apex">
                    slant height
                </InlineTooltip>
                {" "}(along the sloping surface).
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive cone visualization
    <SplitLayout key="layout-cone-interactive" ratio="2:1" gap="lg">
        <Block id="cone-visualization" padding="sm" hasVisualization>
            <InteractiveCone />
        </Block>
        <div className="space-y-4">
            <Block id="cone-controls" padding="sm">
                <EditableParagraph id="para-cone-controls" blockId="cone-controls">
                    <strong>Radius:</strong>{" "}
                    <InlineScrubbleNumber
                        varName="coneRadius"
                        {...numberPropsFromDefinition(getVariableInfo("coneRadius"))}
                    />{" "}
                    cm
                    <br />
                    <strong>Height:</strong>{" "}
                    <InlineScrubbleNumber
                        varName="coneHeight"
                        {...numberPropsFromDefinition(getVariableInfo("coneHeight"))}
                    />{" "}
                    cm
                </EditableParagraph>
            </Block>
            <Block id="cone-calculations" padding="sm">
                <ConeCalculations />
            </Block>
        </div>
    </SplitLayout>,

    <StackLayout key="layout-cone-explore" maxWidth="xl">
        <Block id="cone-explore" padding="sm">
            <EditableParagraph id="para-cone-explore" blockId="cone-explore">
                Rotate the cone to see its structure. Notice the green vertical height line from the center of the base to the apex, the purple radius line on the base, and the dashed violet slant height line along the surface. The slant height is always longer than the vertical height because it follows the Pythagorean theorem: slant² = height² + radius².
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Cone formulas
    <StackLayout key="layout-cone-formulas-heading" maxWidth="xl">
        <Block id="cone-formulas-heading" padding="md">
            <EditableH3 id="h3-cone-formulas-heading" blockId="cone-formulas-heading">
                Cone Formulas
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cone-slant-formula" maxWidth="xl">
        <Block id="cone-slant-formula" padding="sm">
            <FormulaBlock
                latex="\text{Slant Height } (l) = \sqrt{\scrub{coneHeight}^2 + \scrub{coneRadius}^2}"
                variables={scrubVarsFromDefinitions(["coneRadius", "coneHeight"])}
                colorMap={{ coneRadius: "#8E90F5", coneHeight: "#62D0AD" }}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cone-surface-formula" maxWidth="xl">
        <Block id="cone-surface-formula" padding="sm">
            <FormulaBlock
                latex="\text{Surface Area} = \pi \scrub{coneRadius}^2 + \pi \scrub{coneRadius} \times l"
                variables={scrubVarsFromDefinitions(["coneRadius"])}
                colorMap={{ coneRadius: "#8E90F5" }}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cone-surface-explanation" maxWidth="xl">
        <Block id="cone-surface-explanation" padding="sm">
            <EditableParagraph id="para-cone-surface-explanation" blockId="cone-surface-explanation">
                The surface area consists of two parts: the circular base (πr²) and the curved lateral surface (πrl, where l is the slant height). If you were to cut the curved surface and unroll it, you would get a sector of a larger circle.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cone-volume-formula" maxWidth="xl">
        <Block id="cone-volume-formula" padding="sm">
            <FormulaBlock
                latex="\text{Volume} = \frac{1}{3} \pi \scrub{coneRadius}^2 \times \scrub{coneHeight}"
                variables={scrubVarsFromDefinitions(["coneRadius", "coneHeight"])}
                colorMap={{ coneRadius: "#8E90F5", coneHeight: "#62D0AD" }}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-cone-volume-explanation" maxWidth="xl">
        <Block id="cone-volume-explanation" padding="sm">
            <EditableParagraph id="para-cone-volume-explanation" blockId="cone-volume-explanation">
                Here is a remarkable fact: a cone has exactly one-third the volume of a cylinder with the same base and height. This means you could fill a cylinder with water from exactly three cones of the same dimensions! The ⅓ factor appears because the cone tapers to a point instead of maintaining its full width.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Cone assessment
    <StackLayout key="layout-cone-question" maxWidth="xl">
        <Block id="cone-question" padding="md">
            <EditableParagraph id="para-cone-question" blockId="cone-question">
                <strong>Think about this:</strong> A cone and a cylinder have the same radius and height. Which formula gives the volume of the cone?{" "}
                <InlineFeedback
                    varName="answerConeFormula"
                    correctValue="⅓πr²h"
                    position="terminal"
                    successMessage="— correct! The cone's volume is one-third of the cylinder's volume"
                    failureMessage="— not quite"
                    hint="Remember: a cone holds exactly one-third the volume of a cylinder with the same dimensions"
                    reviewBlockId="cone-volume-formula"
                    reviewLabel="Review the formula"
                >
                    <InlineClozeChoice
                        varName="answerConeFormula"
                        correctAnswer="⅓πr²h"
                        options={["πr²h", "⅓πr²h", "½πr²h", "2πr²h"]}
                        {...choicePropsFromDefinition(getVariableInfo("answerConeFormula"))}
                    />
                </InlineFeedback>
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
