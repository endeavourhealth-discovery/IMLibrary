import { PartialBundle } from "../../interfaces/modules/PartialBundle";
import TTGraphData from "../../interfaces/modules/TTGraphData";
export declare function translateFromEntityBundle(bundle: PartialBundle, includedPredicates: string[]): TTGraphData;
export declare function hasNodeChildrenByName(data: TTGraphData, name: string): boolean;
declare function findNodeByName(data: TTGraphData, name: string, nodes: TTGraphData[]): void;
export declare function toggleNodeByName(data: TTGraphData, name: string): void;
declare const _default: {
    translateFromEntityBundle: typeof translateFromEntityBundle;
    hasNodeChildrenByName: typeof hasNodeChildrenByName;
    findNodeByName: typeof findNodeByName;
    toggleNodeByName: typeof toggleNodeByName;
};
export default _default;
