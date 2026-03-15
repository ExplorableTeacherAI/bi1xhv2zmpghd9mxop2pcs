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
    InlineTooltip,
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
// PYRAMID SECTION
// ============================================================================

function InteractivePyramid() {
    const base = useVar("pyramidBase", 4) as number;
    const height = useVar("pyramidHeight", 5) as number;
    const halfBase = base / 2;

    // Define pyramid vertices
    const apex: [number, number, number] = [0, height, 0];
    const v1: [number, number, number] = [-halfBase, 0, -halfBase]; // Back-left
    const v2: [number, number, number] = [halfBase, 0, -halfBase];  // Back-right
    const v3: [number, number, number] = [halfBase, 0, halfBase];   // Front-right
    const v4: [number, number, number] = [-halfBase, 0, halfBase];  // Front-left

    return (
        <div className="relative">
            <Cartesian3D
                height={380}
                cameraPosition={[10, 8, 10]}
                axisLength={Math.max(base, height) + 2}
                showAxes={true}
                showGrid={true}
                showLabels={true}
                plots={[
                    // Base square - using plane with transparency
                    {
                        type: "plane",
                        point: [0, 0.01, 0],
                        normal: [0, 1, 0],
                        size: base,
                        color: "#8E90F5",
                        opacity: 0.6,
                    },
                    // Triangular faces - represented as polylines for edges and transparency
                    // Face 1: Front
                    { type: "segment", point1: v4, point2: apex, color: "#62D0AD", lineWidth: 2 },
                    { type: "segment", point1: v3, point2: apex, color: "#62D0AD", lineWidth: 2 },
                    // Face 2: Right
                    { type: "segment", point1: v2, point2: apex, color: "#62D0AD", lineWidth: 2 },
                    // Face 3: Back
                    { type: "segment", point1: v1, point2: apex, color: "#62D0AD", lineWidth: 2 },
                    // Base edges
                    { type: "segment", point1: v1, point2: v2, color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: v2, point2: v3, color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: v3, point2: v4, color: "#334155", lineWidth: 2 },
                    { type: "segment", point1: v4, point2: v1, color: "#334155", lineWidth: 2 },
                    // Apex point
                    {
                        type: "point",
                        position: apex,
                        color: "#ef4444",
                        size: 0.15,
                    },
                    // Height line (vertical)
                    {
                        type: "segment",
                        point1: [0, 0, 0],
                        point2: apex,
                        color: "#F7B23B",
                        lineWidth: 3,
                    },
                    // Center of base point
                    {
                        type: "point",
                        position: [0, 0, 0],
                        color: "#F7B23B",
                        size: 0.1,
                    },
                ]}
            />
            <InteractionHintSequence
                hintKey="pyramid-3d-rotate"
                steps={[{ gesture: "orbit-3d", label: "Drag to rotate the pyramid", position: { x: "50%", y: "50%" } }]}
            />
        </div>
    );
}

function PyramidCalculations() {
    const base = useVar("pyramidBase", 4) as number;
    const height = useVar("pyramidHeight", 5) as number;
    const baseArea = base * base;
    const halfBase = base / 2;
    const slantHeight = Math.sqrt(height * height + halfBase * halfBase);
    const lateralArea = 4 * (0.5 * base * slantHeight);
    const surfaceArea = baseArea + lateralArea;
    const volume = (1 / 3) * baseArea * height;

    return (
        <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
            <div className="text-center">
                <span className="text-sm text-slate-500">Base Area</span>
                <p className="text-lg font-semibold text-purple-600">{baseArea.toFixed(1)} cm²</p>
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

export const pyramidBlocks: ReactElement[] = [
    <StackLayout key="layout-pyramid-heading" maxWidth="xl">
        <Block id="pyramid-heading" padding="lg">
            <EditableH2 id="h2-pyramid-heading" blockId="pyramid-heading">
                The Pyramid: Ancient Wonder, Modern Mathematics
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-pyramid-intro" maxWidth="xl">
        <Block id="pyramid-intro" padding="sm">
            <EditableParagraph id="para-pyramid-intro" blockId="pyramid-intro">
                A pyramid is a shape with a polygon base and triangular faces that meet at a single point called the{" "}
                <InlineTooltip id="tooltip-pyramid-apex" tooltip="The top point where all the triangular faces of the pyramid meet">
                    apex
                </InlineTooltip>
                . The Great Pyramid of Giza is the most famous example. We will focus on square-based pyramids, where the base is a square with side length{" "}
                <InlineSpotColor varName="pyramidBase" color="#62D0AD">a</InlineSpotColor>
                {" "}and the vertical{" "}
                <InlineSpotColor varName="pyramidHeight" color="#F7B23B">height</InlineSpotColor>
                {" "}goes from the center of the base to the apex.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive pyramid visualization
    <SplitLayout key="layout-pyramid-interactive" ratio="2:1" gap="lg">
        <Block id="pyramid-visualization" padding="sm" hasVisualization>
            <InteractivePyramid />
        </Block>
        <div className="space-y-4">
            <Block id="pyramid-controls" padding="sm">
                <EditableParagraph id="para-pyramid-controls" blockId="pyramid-controls">
                    <strong>Base side:</strong>{" "}
                    <InlineScrubbleNumber
                        varName="pyramidBase"
                        {...numberPropsFromDefinition(getVariableInfo("pyramidBase"))}
                    />{" "}
                    cm
                    <br />
                    <strong>Height:</strong>{" "}
                    <InlineScrubbleNumber
                        varName="pyramidHeight"
                        {...numberPropsFromDefinition(getVariableInfo("pyramidHeight"))}
                    />{" "}
                    cm
                </EditableParagraph>
            </Block>
            <Block id="pyramid-calculations" padding="sm">
                <PyramidCalculations />
            </Block>
        </div>
    </SplitLayout>,

    <StackLayout key="layout-pyramid-explore" maxWidth="xl">
        <Block id="pyramid-explore" padding="sm">
            <EditableParagraph id="para-pyramid-explore" blockId="pyramid-explore">
                Rotate the pyramid to see its structure clearly. Notice the purple square base, the four triangular faces in teal, and the amber height line from the center of the base to the red apex. Unlike a cone, the pyramid has flat faces and distinct edges. When you make the base larger, watch how the triangular faces become wider.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Pyramid formulas
    <StackLayout key="layout-pyramid-formulas-heading" maxWidth="xl">
        <Block id="pyramid-formulas-heading" padding="md">
            <EditableH3 id="h3-pyramid-formulas-heading" blockId="pyramid-formulas-heading">
                Pyramid Formulas
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-pyramid-volume-formula" maxWidth="xl">
        <Block id="pyramid-volume-formula" padding="sm">
            <FormulaBlock
                latex="\text{Volume} = \frac{1}{3} \times \scrub{pyramidBase}^2 \times \scrub{pyramidHeight}"
                variables={scrubVarsFromDefinitions(["pyramidBase", "pyramidHeight"])}
                colorMap={{ pyramidBase: "#62D0AD", pyramidHeight: "#F7B23B" }}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-pyramid-volume-explanation" maxWidth="xl">
        <Block id="pyramid-volume-explanation" padding="sm">
            <EditableParagraph id="para-pyramid-volume-explanation" blockId="pyramid-volume-explanation">
                Just like the cone, a pyramid has exactly one-third the volume of a prism with the same base and height. This is no coincidence: any shape that tapers to a point has this same ⅓ factor in its volume formula. For a square-based pyramid, the base area is side², so the volume becomes ⅓ × side² × height.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-pyramid-surface-formula" maxWidth="xl">
        <Block id="pyramid-surface-formula" padding="sm">
            <FormulaBlock
                latex="\text{Surface Area} = \scrub{pyramidBase}^2 + 4 \times \frac{1}{2} \times \scrub{pyramidBase} \times l"
                variables={scrubVarsFromDefinitions(["pyramidBase"])}
                colorMap={{ pyramidBase: "#62D0AD" }}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-pyramid-surface-explanation" maxWidth="xl">
        <Block id="pyramid-surface-explanation" padding="sm">
            <EditableParagraph id="para-pyramid-surface-explanation" blockId="pyramid-surface-explanation">
                The surface area has two parts: the square base (side²) and the four triangular faces. Each triangular face is an isoceles triangle with base equal to the pyramid's base side and height equal to the slant height (l). The slant height is different from the vertical height and can be calculated using the Pythagorean theorem.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Pyramid assessment
    <StackLayout key="layout-pyramid-question" maxWidth="xl">
        <Block id="pyramid-question" padding="md">
            <EditableParagraph id="para-pyramid-question" blockId="pyramid-question">
                <strong>Calculate:</strong> A square-based pyramid has a base side of 6 cm and a height of 4 cm. What is its volume?{" "}
                <InlineFeedback
                    varName="answerPyramidVolume"
                    correctValue="48"
                    position="terminal"
                    successMessage="— perfect! (1/3) × 6² × 4 = (1/3) × 36 × 4 = 48 cm³"
                    failureMessage="— not quite"
                    hint="Volume = (1/3) × base² × height. Calculate (1/3) × 6 × 6 × 4"
                    reviewBlockId="pyramid-volume-formula"
                    reviewLabel="Review the formula"
                >
                    <InlineClozeInput
                        varName="answerPyramidVolume"
                        correctAnswer="48"
                        {...clozePropsFromDefinition(getVariableInfo("answerPyramidVolume"))}
                    />
                </InlineFeedback>{" "}
                cm³
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
