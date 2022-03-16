export default class Env {
  static api = import.meta.env.VITE_API ? import.meta.env.VITE_API as string : "/imapi/";
  static authUrl = import.meta.env.VITE_AUTH_URL ? import.meta.env.VITE_AUTH_URL as string : "/auth/";
  static directoryUrl = import.meta.env.VITE_DIRECTORY_URL ? import.meta.env.VITE_DIRECTORY_URL as string : "/";
  static editorUrl = import.meta.env.VITE_EDITOR_URL ? import.meta.env.VITE_EDITOR_URL as string : "/editor/";
  static catalogueUrl = import.meta.env.VITE_CATALOGUE_URL ? import.meta.env.VITE_CATALOGUE_URL as string : "/catalogue/";
  static viewerUrl = import.meta.env.VITE_VIEWER_URL ? import.meta.env.VITE_VIEWER_URL as string : "/viewer/";
}
