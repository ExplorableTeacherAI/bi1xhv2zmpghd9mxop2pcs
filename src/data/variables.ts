/**
 * Variables Configuration
 * =======================
 *
 * CENTRAL PLACE TO DEFINE ALL SHARED VARIABLES
 *
 * This file defines all variables that can be shared across sections.
 * AI agents should read this file to understand what variables are available.
 */

import { type VarValue } from '@/stores';

/**
 * Variable definition with metadata
 */
export interface VariableDefinition {
    /** Default value */
    defaultValue: VarValue;
    /** Human-readable label */
    label?: string;
    /** Description for AI agents */
    description?: string;
    /** Variable type hint */
    type?: 'number' | 'text' | 'boolean' | 'select' | 'array' | 'object' | 'spotColor' | 'linkedHighlight';
    /** Unit (e.g., 'Hz', '°', 'm/s') - for numbers */
    unit?: string;
    /** Minimum value (for number sliders) */
    min?: number;
    /** Maximum value (for number sliders) */
    max?: number;
    /** Step increment (for number sliders) */
    step?: number;
    /** Display color for InlineScrubbleNumber / InlineSpotColor (e.g. '#D81B60') */
    color?: string;
    /** Options for 'select' type variables */
    options?: string[];
    /** Placeholder text for text inputs */
    placeholder?: string;
    /** Correct answer for cloze input validation */
    correctAnswer?: string;
    /** Whether cloze matching is case sensitive */
    caseSensitive?: boolean;
    /** Background color for inline components */
    bgColor?: string;
    /** Schema hint for object types (for AI agents) */
    schema?: string;
}

export const variableDefinitions: Record<string, VariableDefinition> = {
    // ========================================
    // INTRODUCTION SECTION
    // ========================================
    introBoxSide: {
        defaultValue: 3,
        type: 'number',
        label: 'Introduction Box Side',
        description: 'Side length of the introductory box',
        min: 1,
        max: 5,
        step: 0.5,
        color: '#62D0AD',
    },

    // ========================================
    // CUBE SECTION
    // ========================================
    cubeSide: {
        defaultValue: 3,
        type: 'number',
        label: 'Cube Side Length',
        description: 'The side length of the cube in units',
        unit: 'cm',
        min: 1,
        max: 6,
        step: 0.5,
        color: '#62D0AD',
    },
    answerCubeSurfaceArea: {
        defaultValue: '',
        type: 'text',
        label: 'Cube Surface Area Answer',
        description: 'Student answer for cube surface area question',
        placeholder: '?',
        correctAnswer: '150',
        color: '#8E90F5',
    },
    answerCubeVolume: {
        defaultValue: '',
        type: 'text',
        label: 'Cube Volume Answer',
        description: 'Student answer for cube volume question',
        placeholder: '?',
        correctAnswer: '125',
        color: '#8E90F5',
    },

    // ========================================
    // CUBOID SECTION
    // ========================================
    cuboidLength: {
        defaultValue: 4,
        type: 'number',
        label: 'Cuboid Length',
        description: 'The length of the cuboid',
        unit: 'cm',
        min: 1,
        max: 8,
        step: 0.5,
        color: '#62D0AD',
    },
    cuboidWidth: {
        defaultValue: 3,
        type: 'number',
        label: 'Cuboid Width',
        description: 'The width of the cuboid',
        unit: 'cm',
        min: 1,
        max: 6,
        step: 0.5,
        color: '#8E90F5',
    },
    cuboidHeight: {
        defaultValue: 2,
        type: 'number',
        label: 'Cuboid Height',
        description: 'The height of the cuboid',
        unit: 'cm',
        min: 1,
        max: 6,
        step: 0.5,
        color: '#F7B23B',
    },
    answerCuboidVolume: {
        defaultValue: '',
        type: 'text',
        label: 'Cuboid Volume Answer',
        description: 'Student answer for cuboid volume question',
        placeholder: '?',
        correctAnswer: '60',
        color: '#AC8BF9',
    },

    // ========================================
    // CYLINDER SECTION
    // ========================================
    cylinderRadius: {
        defaultValue: 2,
        type: 'number',
        label: 'Cylinder Radius',
        description: 'The radius of the cylinder base',
        unit: 'cm',
        min: 0.5,
        max: 5,
        step: 0.5,
        color: '#62D0AD',
    },
    cylinderHeight: {
        defaultValue: 4,
        type: 'number',
        label: 'Cylinder Height',
        description: 'The height of the cylinder',
        unit: 'cm',
        min: 1,
        max: 8,
        step: 0.5,
        color: '#8E90F5',
    },
    answerCylinderVolume: {
        defaultValue: '',
        type: 'text',
        label: 'Cylinder Volume Answer',
        description: 'Student answer for cylinder volume question',
        placeholder: '?',
        correctAnswer: '628',
        color: '#F7B23B',
    },

    // ========================================
    // CONE SECTION
    // ========================================
    coneRadius: {
        defaultValue: 3,
        type: 'number',
        label: 'Cone Radius',
        description: 'The radius of the cone base',
        unit: 'cm',
        min: 1,
        max: 5,
        step: 0.5,
        color: '#62D0AD',
    },
    coneHeight: {
        defaultValue: 4,
        type: 'number',
        label: 'Cone Height',
        description: 'The vertical height of the cone',
        unit: 'cm',
        min: 1,
        max: 8,
        step: 0.5,
        color: '#8E90F5',
    },
    answerConeFormula: {
        defaultValue: '',
        type: 'select',
        label: 'Cone Formula Choice',
        description: 'Student choice for cone volume formula',
        placeholder: '?',
        correctAnswer: '⅓πr²h',
        options: ['πr²h', '⅓πr²h', '½πr²h', '2πr²h'],
        color: '#F7B23B',
    },

    // ========================================
    // SPHERE SECTION
    // ========================================
    sphereRadius: {
        defaultValue: 3,
        type: 'number',
        label: 'Sphere Radius',
        description: 'The radius of the sphere',
        unit: 'cm',
        min: 1,
        max: 5,
        step: 0.5,
        color: '#62D0AD',
    },
    answerSphereVolume: {
        defaultValue: '',
        type: 'text',
        label: 'Sphere Volume Answer',
        description: 'Student answer for sphere volume question',
        placeholder: '?',
        correctAnswer: '905',
        color: '#8E90F5',
    },

    // ========================================
    // PYRAMID SECTION
    // ========================================
    pyramidBase: {
        defaultValue: 4,
        type: 'number',
        label: 'Pyramid Base Side',
        description: 'The side length of the square base',
        unit: 'cm',
        min: 1,
        max: 6,
        step: 0.5,
        color: '#62D0AD',
    },
    pyramidHeight: {
        defaultValue: 5,
        type: 'number',
        label: 'Pyramid Height',
        description: 'The vertical height of the pyramid',
        unit: 'cm',
        min: 1,
        max: 8,
        step: 0.5,
        color: '#8E90F5',
    },
    answerPyramidVolume: {
        defaultValue: '',
        type: 'text',
        label: 'Pyramid Volume Answer',
        description: 'Student answer for pyramid volume question',
        placeholder: '?',
        correctAnswer: '48',
        color: '#F7B23B',
    },

    // ========================================
    // FORMULA FINDER CHALLENGE
    // ========================================
    challengeShape: {
        defaultValue: 'cube',
        type: 'select',
        label: 'Challenge Shape',
        description: 'The shape for the formula challenge',
        options: ['cube', 'cuboid', 'cylinder', 'cone', 'sphere', 'pyramid'],
        color: '#AC8BF9',
    },
    answerChallengeOne: {
        defaultValue: '',
        type: 'select',
        label: 'Challenge One Answer',
        description: 'First challenge question answer',
        placeholder: '?',
        correctAnswer: 'Cylinder',
        options: ['Cube', 'Cylinder', 'Cone', 'Sphere'],
        color: '#62D0AD',
    },
    answerChallengeTwo: {
        defaultValue: '',
        type: 'select',
        label: 'Challenge Two Answer',
        description: 'Second challenge question answer',
        placeholder: '?',
        correctAnswer: 'Cone',
        options: ['Cuboid', 'Cylinder', 'Cone', 'Pyramid'],
        color: '#8E90F5',
    },
    answerChallengeThree: {
        defaultValue: '',
        type: 'text',
        label: 'Challenge Three Answer',
        description: 'Third challenge calculation answer',
        placeholder: '?',
        correctAnswer: '36',
        color: '#F7B23B',
    },
};

/**
 * Get all variable names (for AI agents to discover)
 */
export const getVariableNames = (): string[] => {
    return Object.keys(variableDefinitions);
};

/**
 * Get a variable's default value
 */
export const getDefaultValue = (name: string): VarValue => {
    return variableDefinitions[name]?.defaultValue ?? 0;
};

/**
 * Get a variable's metadata
 */
export const getVariableInfo = (name: string): VariableDefinition | undefined => {
    return variableDefinitions[name];
};

/**
 * Get all default values as a record (for initialization)
 */
export const getDefaultValues = (): Record<string, VarValue> => {
    const defaults: Record<string, VarValue> = {};
    for (const [name, def] of Object.entries(variableDefinitions)) {
        defaults[name] = def.defaultValue;
    }
    return defaults;
};

/**
 * Get number props for InlineScrubbleNumber from a variable definition.
 */
export function numberPropsFromDefinition(def: VariableDefinition | undefined): {
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    color?: string;
} {
    if (!def || def.type !== 'number') return {};
    return {
        defaultValue: def.defaultValue as number,
        min: def.min,
        max: def.max,
        step: def.step,
        ...(def.color ? { color: def.color } : {}),
    };
}

/**
 * Get cloze choice props for InlineClozeChoice from a variable definition.
 */
export function choicePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Get toggle props for InlineToggle from a variable definition.
 */
export function togglePropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

export function clozePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
    caseSensitive?: boolean;
} {
    if (!def || def.type !== 'text') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
        ...(def.caseSensitive !== undefined ? { caseSensitive: def.caseSensitive } : {}),
    };
}

/**
 * Get spot-color props for InlineSpotColor from a variable definition.
 */
export function spotColorPropsFromDefinition(def: VariableDefinition | undefined): {
    color: string;
} {
    return {
        color: def?.color ?? '#8B5CF6',
    };
}

/**
 * Get linked-highlight props for InlineLinkedHighlight from a variable definition.
 */
export function linkedHighlightPropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    return {
        ...(def?.color ? { color: def.color } : {}),
        ...(def?.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Build the `variables` prop for FormulaBlock from variable definitions.
 */
export function scrubVarsFromDefinitions(
    varNames: string[],
): Record<string, { min?: number; max?: number; step?: number; color?: string }> {
    const result: Record<string, { min?: number; max?: number; step?: number; color?: string }> = {};
    for (const name of varNames) {
        const def = variableDefinitions[name];
        if (!def) continue;
        result[name] = {
            ...(def.min !== undefined ? { min: def.min } : {}),
            ...(def.max !== undefined ? { max: def.max } : {}),
            ...(def.step !== undefined ? { step: def.step } : {}),
            ...(def.color ? { color: def.color } : {}),
        };
    }
    return result;
}
