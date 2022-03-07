import { PropType } from "vue";
declare const _default: import("vue").DefineComponent<{
    name: {
        type: StringConstructor;
        required: false;
    };
    description: {
        type: StringConstructor;
        required: false;
    };
    inputData: {
        type: PropType<any[]>;
        required: true;
    };
    id: {
        type: StringConstructor;
        required: true;
    };
}, unknown, {
    tableData: {
        count: number;
        label: string;
    }[];
    loading: boolean;
}, {
    isCorrectInputData(): boolean;
}, {
    getReportTableData(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
        required: false;
    };
    description: {
        type: StringConstructor;
        required: false;
    };
    inputData: {
        type: PropType<any[]>;
        required: true;
    };
    id: {
        type: StringConstructor;
        required: true;
    };
}>>, {}>;
export default _default;
