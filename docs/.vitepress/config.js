import path from "path";

export default {
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
          { text: "ArrayObjectNameListboxWithLabel", link: "/components/array-object-name-listbox-with-label" },
          { text: "ArrayObjectNamesToStringWithLabel", link: "/components/array-object-names-to-string-with-label" },
          { text: "ArrayObjectNameTagWithLabel", link: "/components/array-object-name-tag-with-label" },
          { text: "NumberWithLabel", link: "/components/number-with-label" },
          { text: "ObjectNameTagWithLabel", link: "/components/object-name-tag-with-label" },
          { text: "ObjectNameWithLabel", link: "/components/object-name-with-label" },
          { text: "ProfileDisplay", link: "/components/profile-display" },
          { text: "ReportTable", link: "/components/report-table" },
          { text: "SectionDivider", link: "/components/section-divider" },
          { text: "SnomedLicense", link: "/components/snomed-license" },
          { text: "TermCodeTable", link: "/components/term-code-table" },
          { text: "TextDefinition", link: "/components/text-definition" },
          { text: "TextHTMLWithLabel", link: "/components/text-html-with-label" },
          { text: "TextSectionHeader", link: "/components/text-section-header" },
          { text: "TextWithLabel", link: "/components/text-with-label" },
          { text: "TopBar", link: "/components/top-bar" }
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
