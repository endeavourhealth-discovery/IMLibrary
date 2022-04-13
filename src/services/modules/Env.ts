const Env = {
  api: import.meta.env.VITE_API
    ? (import.meta.env.VITE_API as string)
    : "/imapi/",
  authUrl: import.meta.env.VITE_AUTH_URL
    ? (import.meta.env.VITE_AUTH_URL as string)
    : "/auth/",
  directoryUrl: import.meta.env.VITE_DIRECTORY_URL
    ? (import.meta.env.VITE_DIRECTORY_URL as string)
    : "/",
  editorUrl: import.meta.env.VITE_EDITOR_URL
    ? (import.meta.env.VITE_EDITOR_URL as string)
    : "/editor/",
  catalogueUrl: import.meta.env.VITE_CATALOGUE_URL
    ? (import.meta.env.VITE_CATALOGUE_URL as string)
    : "/catalogue/",
  viewerUrl: import.meta.env.VITE_VIEWER_URL
    ? (import.meta.env.VITE_VIEWER_URL as string)
    : "/viewer/"
};

Object.freeze(Env);

export default Env;
