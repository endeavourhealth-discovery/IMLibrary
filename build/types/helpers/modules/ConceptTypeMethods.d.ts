import { TTIriRef } from "../../interfaces/modules/TTIriRef";
export declare function isOfTypes(conceptTypeElements: TTIriRef[], ...types: string[]): boolean;
export declare function isValueSet(conceptTypes: TTIriRef[]): boolean;
export declare function isProperty(conceptTypes: TTIriRef[]): boolean;
export declare function getFAIconFromType(conceptTypes: TTIriRef[]): string[];
export declare function getColourFromType(conceptTypes: TTIriRef[]): string;
declare const _default: {
    isOfTypes: typeof isOfTypes;
    isProperty: typeof isProperty;
    isValueSet: typeof isValueSet;
    getColourFromType: typeof getColourFromType;
    getFAIconFromType: typeof getFAIconFromType;
};
export default _default;
