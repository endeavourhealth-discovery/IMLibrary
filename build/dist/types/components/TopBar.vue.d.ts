import User from "../models/modules/User";
import { AccountItem } from "../interfaces/modules/AccountItem";
import { LoginItem } from "../interfaces/modules/LoginItem";
declare const _default: import("vue").DefineComponent<{
    currentUser: {
        type: typeof User;
        required: false;
    };
    isLoggedIn: {
        type: BooleanConstructor;
        required: true;
    };
}, unknown, {
    loading: boolean;
    request: {
        cancel: any;
        msg: string;
    };
    searchText: string;
    items: {
        label: string;
        icon: string;
        items: {
            label: string;
            items: {
                label: string;
            }[];
        }[];
    }[];
    loginItems: LoginItem[];
    accountItems: AccountItem[];
}, {}, {
    getItems(): LoginItem[] | AccountItem[];
    openUserMenu(event: any): void;
    getUrl(item: string): string;
    openAppsOverlay(event: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    currentUser: {
        type: typeof User;
        required: false;
    };
    isLoggedIn: {
        type: BooleanConstructor;
        required: true;
    };
}>>, {}>;
export default _default;
