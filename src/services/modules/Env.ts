const Env = {
  API: import.meta.env.VITE_API ? (import.meta.env.VITE_API as string) : "/imapi/",
  AUTH_URL: import.meta.env.VITE_AUTH_URL ? (import.meta.env.VITE_AUTH_URL as string) : "/auth/#/",
  DIRECTORY_URL: import.meta.env.VITE_DIRECTORY_URL ? (import.meta.env.VITE_DIRECTORY_URL as string) : "/#/",
  EDITOR_URL: import.meta.env.VITE_EDITOR_URL ? (import.meta.env.VITE_EDITOR_URL as string) : "/editor/#/",
  CATALOGUE_URL: import.meta.env.VITE_CATALOGUE_URL ? (import.meta.env.VITE_CATALOGUE_URL as string) : "/catalogue/#/",
  VIEWER_URL: import.meta.env.VITE_VIEWER_URL ? (import.meta.env.VITE_VIEWER_URL as string) : "/viewer/#/",
  VITE_NODE_API: import.meta.env.VITE_NODE_API ? (import.meta.env.VITE_NODE_API as string) : "http://localhost:3000/"
};

Object.freeze(Env);

export default Env;
