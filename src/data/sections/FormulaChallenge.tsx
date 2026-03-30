import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineClozeChoice,
    InlineClozeInput,
    InlineFeedback,
} from "@/components/atoms";
import { Table } from "@/components/atoms/visual/Table";
import { InlineFormula } from "@/components/atoms/formula/InlineFormula";
import {
    getVariableInfo,
    choicePropsFromDefinition,
    clozePropsFromDefinition,
} from "../variables";

// ============================================================================
// FORMULA FINDER CHALLENGE SECTION
// ============================================================================

export const formulaChallengeBlocks: ReactElement[] = [
    <StackLayout key="layout-challenge-heading" maxWidth="xl">
        <Block id="challenge-heading" padding="lg">
            <EditableH2 id="h2-challenge-heading" blockId="challenge-heading">
                Formula Finder Challenge
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-challenge-intro" maxWidth="xl">
        <Block id="challenge-intro" padding="sm">
            <EditableParagraph id="para-challenge-intro" blockId="challenge-intro">
                Test your understanding! Choosing the right formula is key. Use the reference table below to solve real-world problems.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Formula reference table
    <StackLayout key="layout-challenge-table" maxWidth="xl">
        <Block id="challenge-table" padding="md">
            <Table
                columns={[
                    { header: "Shape", align: "left", width: 120 },
                    { header: "Surface Area", align: "center" },
                    { header: "Volume", align: "center" },
                ]}
                rows={[
                    {
                        cells: [
                            "Cube",
                            <InlineFormula key="cube-sa" latex="6a^2" colorMap={{}} />,
                            <InlineFormula key="cube-v" latex="a^3" colorMap={{}} />,
                        ],
                    },
                    {
                        cells: [
                            "Cuboid",
                            <InlineFormula key="cuboid-sa" latex="2(lw + lh + wh)" colorMap={{}} />,
                            <InlineFormula key="cuboid-v" latex="l \times w \times h" colorMap={{}} />,
                        ],
                    },
                    {
                        cells: [
                            "Cylinder",
                            <InlineFormula key="cyl-sa" latex="2\pi r^2 + 2\pi rh" colorMap={{}} />,
                            <InlineFormula key="cyl-v" latex="\pi r^2 h" colorMap={{}} />,
                        ],
                    },
                    {
                        cells: [
                            "Cone",
                            <InlineFormula key="cone-sa" latex="\pi r^2 + \pi rl" colorMap={{}} />,
                            <InlineFormula key="cone-v" latex="\frac{1}{3}\pi r^2 h" colorMap={{}} />,
                        ],
                    },
                    {
                        cells: [
                            "Sphere",
                            <InlineFormula key="sphere-sa" latex="4\pi r^2" colorMap={{}} />,
                            <InlineFormula key="sphere-v" latex="\frac{4}{3}\pi r^3" colorMap={{}} />,
                        ],
                    },
                    {
                        cells: [
                            "Pyramid",
                            <InlineFormula key="pyr-sa" latex="a^2 + 4 \times \frac{1}{2}al" colorMap={{}} />,
                            <InlineFormula key="pyr-v" latex="\frac{1}{3}a^2 h" colorMap={{}} />,
                        ],
                    },
                ]}
                color="#6366f1"
                caption="Quick Reference: 3D Shape Formulas"
                striped={true}
                bordered={true}
            />
        </Block>
    </StackLayout>,

    // Challenge 1
    <StackLayout key="layout-challenge-one" maxWidth="xl">
        <Block id="challenge-one" padding="md">
            <EditableParagraph id="para-challenge-one" blockId="challenge-one">
                <strong>Challenge 1:</strong> A factory needs to calculate how much liquid a storage tank can hold. The tank has a circular base with radius 3 meters and is 5 meters tall, with a flat top and bottom. Which shape's volume formula should they use?{" "}
                <InlineFeedback
                    varName="answerChallengeOne"
                    correctValue="Cylinder"
                    position="terminal"
                    successMessage="— correct! A tank with circular ends and straight sides is a cylinder"
                    failureMessage="— think again"
                    hint="What shape has a circular base, straight sides, and a flat top?"
                >
                    <InlineClozeChoice
                        varName="answerChallengeOne"
                        correctAnswer="Cylinder"
                        options={["Cube", "Cylinder", "Cone", "Sphere"]}
                        {...choicePropsFromDefinition(getVariableInfo("answerChallengeOne"))}
                    />
                </InlineFeedback>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Challenge 2
    <StackLayout key="layout-challenge-two" maxWidth="xl">
        <Block id="challenge-two" padding="md">
            <EditableParagraph id="para-challenge-two" blockId="challenge-two">
                <strong>Challenge 2:</strong> An ice cream vendor wants to know how much ice cream fits in a waffle cone. The cone has a circular opening at the top that tapers to a point at the bottom. Which shape's volume formula applies?{" "}
                <InlineFeedback
                    varName="answerChallengeTwo"
                    correctValue="Cone"
                    position="terminal"
                    successMessage="— exactly! An ice cream cone is indeed a cone shape"
                    failureMessage="— not quite"
                    hint="The description mentions it tapers to a point at the bottom"
                >
                    <InlineClozeChoice
                        varName="answerChallengeTwo"
                        correctAnswer="Cone"
                        options={["Cuboid", "Cylinder", "Cone", "Pyramid"]}
                        {...choicePropsFromDefinition(getVariableInfo("answerChallengeTwo"))}
                    />
                </InlineFeedback>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Challenge 3
    <StackLayout key="layout-challenge-three" maxWidth="xl">
        <Block id="challenge-three" padding="md">
            <EditableParagraph id="para-challenge-three" blockId="challenge-three">
                <strong>Challenge 3:</strong> A gift shop sells small square-based pyramid ornaments. Each pyramid has a base side of 3 cm and a height of 4 cm. What is the volume of one ornament?{" "}
                <InlineFeedback
                    varName="answerChallengeThree"
                    correctValue="36"
                    position="terminal"
                    successMessage="— well done! You did it. (1/3) × 9 × 4 = 36 cm³ is correct. You did not forget the 1/3 factor"
                    failureMessage="— try again"
                    hint="Volume = (1/3) × base² × height = (1/3) × 3² × 4. Calculate the base area first (3 × 3), multiply by height, then divide by 3"
                >
                    <InlineClozeInput
                        varName="answerChallengeThree"
                        correctAnswer="36"
                        {...clozePropsFromDefinition(getVariableInfo("answerChallengeThree"))}
                    />
                </InlineFeedback>{" "}
                cm³
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Summary
    <StackLayout key="layout-challenge-summary" maxWidth="xl">
        <Block id="challenge-summary" padding="lg">
            <EditableParagraph id="para-challenge-summary" blockId="challenge-summary">
                Well done! You've explored six 3D shapes. Key insights: cone and pyramid have ⅓ in their volume formulas. Sphere has 4/3. Surface area uses cm², volume uses cm³.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
