const path = require("path");

module.exports = {
  title: "My Lib",
  description: "Just playing around.",
  themeConfig: {
    repo: "https://github.com/endeavourhealth-discovery/IMLibrary",
    sidebar: [
      {
        text: "Introduction",
        children: [
          { text: "What is IM Library?", link: "/" },
          { text: "Getting Started", link: "/guide/" },
        ],
      },
      {
        text: "Components",
        children: [
          { text: "Component A", link: "/components/component-a" },
          { text: "Component B", link: "/components/component-b" },
          { text: "TopBar", link: "/components/top-bar" },
        ],
      },
    ],
  },
  vite: {
    resolve: {
      alias: {
        "im-library": path.resolve(__dirname, "../../src"),
      },
      dedupe: ["vue", /primevue\/.+/], // avoid error when using dependencies that also use Vue
    },
  },
};
