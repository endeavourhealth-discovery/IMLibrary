import { Plugin } from "vue";
export interface imlibraryInterface {
    install: Plugin;
}
declare const IMLibrary: imlibraryInterface;
import "./assets/main.scss";
export default IMLibrary;
export * from "./components";
export * from "./constants";
export * from "./utils";
export * from "./vocabulary";
export * from "./helpers";
export * from "./models";
export * from "./enums";
export * from "./interfaces";
