import { TTBundle } from "../../interfaces/modules/TTBundle";
import { TTIriRef } from "../../interfaces/Interfaces";
export declare function bundleToText(bundle: TTBundle, defaultPredicatenames: any, indent: number, withHyperlinks: boolean, blockedUrlIris?: string[]): string;
export declare function ttValueToString(node: any, previousType: string, indent: number, withHyperlinks: boolean, iriMap?: any, blockedUrlIris?: string[]): string;
export declare function termToString(node: any, indent: number): string;
export declare function ttIriToString(iri: TTIriRef, previous: string, indent: number, withHyperlinks: boolean, inline: boolean, blockedUrlIris?: string[]): string;
export declare function ttNodeToString(node: any, previousType: string, indent: number, withHyperlinks: boolean, iriMap?: any, blockedUrlIris?: string[]): string;
export declare function ttArrayToString(arr: any[], indent: number, withHyperlinks: boolean, iriMap?: any, blockedUrlIris?: string[]): string;
declare const _default: {
    bundleToText: typeof bundleToText;
    ttArrayToString: typeof ttArrayToString;
    ttIriToString: typeof ttIriToString;
    ttNodeToString: typeof ttNodeToString;
    ttValueToString: typeof ttValueToString;
    termToString: typeof termToString;
};
export default _default;
