const path = require("path");

module.exports = {
  title: "IM Library",
  description: "Library for the Information Model app suite",
  themeConfig: {
    repo: "https://github.com/endeavourhealth-discovery/IMLibrary",
    sidebar: [
      {
        text: "Introduction",
        children: [
          { text: "What is IM Library?", link: "/" },
          { text: "Getting Started", link: "/guide/" }
        ]
      },
      {
        text: "Components",
        children: [
          { text: "TopBar", link: "/components/top-bar" },
          { text: "SnomedLicense", link: "/components/snomed-license" },
          { text: "TextHTMLWithLabel", link: "/components/text-html-with-label" },
          { test: "TextWithLabel", link: "/components/text-with-label" }
        ]
      }
    ]
  },
  vite: {
    resolve: {
      alias: {
        "im-library": path.resolve(__dirname, "../../src")
      },
      dedupe: ["vue", /primevue\/.+/] // avoid error when using dependencies that also use Vue
    }
  }
};
