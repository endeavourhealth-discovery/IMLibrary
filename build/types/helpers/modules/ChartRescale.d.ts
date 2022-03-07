export declare function setTooltips(counts: number[]): {
    callbacks: {
        label(d: any): string;
    };
};
export declare function rescaleData(data: number[]): number[];
declare const _default: {
    setTooltips: typeof setTooltips;
    rescaleData: typeof rescaleData;
};
export default _default;
