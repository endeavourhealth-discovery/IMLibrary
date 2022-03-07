import { DefinitionConfig } from "../../interfaces/modules/DefinitionConfig";
export declare function copyConceptToClipboard(concept: any, configs?: DefinitionConfig[], defaults?: any, blockedUrlIris?: string[]): string;
export declare function conceptObjectToCopyString(key: string, value: any, counter: number, totalKeys: number, configs?: DefinitionConfig[], defaults?: any, blockedUrlIris?: string[]): {
    label: string;
    value: string;
} | undefined;
declare const _default: {
    copyConceptToClipboard: typeof copyConceptToClipboard;
    conceptObjectToCopyString: typeof conceptObjectToCopyString;
};
export default _default;
