const path = require("path");

module.exports = {
  title: "IM Library",
  description: "Library for the Information Model app suite",
  themeConfig: {
    repo: "https://github.com/endeavourhealth-discovery/IMLibrary",
    sidebar: [
      {
        text: "Introduction",
        link: "/",
        children: [
          { text: "What is IM Library?", link: "/" },
          { text: "Getting Started", link: "/guide/" }
        ]
      },
      {
        text: "Components",
        link: "/components/index",
        children: [
          { text: "TextHTMLWithLabel", link: "/components/text-html-with-label" },
          { text: "TextWithLabel", link: "/components/text-with-label" },
          { text: "TopBar", link: "/components/top-bar" },
          { text: "SnomedLicense", link: "/components/snomed-license" }
        ]
      },
      {
        text: "Constants",
        link: "/constants/index",
        children: [{ text: "Avatars", link: "/constants/avatars" }]
      },
      {
        text: "Enums",
        link: "/enums/index",
        children: [
          { text: "AppEnum", link: "/enums/app-enum" },
          { text: "BuilderType", link: "/enums/builder-type" },
          { text: "ComponentType", link: "/enums/component-type" },
          { text: "ECLComponent", link: "/enums/ecl-component" },
          { text: "ECLType", link: "/enums/ecl-type" },
          { text: "PasswordStrength", link: "/enums/password-strength" },
          { text: "SortBy", link: "/enums/sort-by" }
        ]
      },
      {
        text: "Helpers",
        link: "/helpers/index",
        children: []
      },
      {
        text: "Interfaces",
        link: "/interfaces/index",
        children: []
      },
      {
        text: "Models",
        link: "/models/index",
        children: []
      },
      {
        text: "Services",
        link: "/services/index",
        children: []
      },
      {
        text: "Vocabulary",
        link: "/vocabulary/index",
        children: []
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
