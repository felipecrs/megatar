const organizationName = "felipecrs";
const projectName = "megatar";
const githubUrl = `https://github.com/${organizationName}/${projectName}`;
const title = "Megatar";
const description = require("../package.json").description;

module.exports = {
  title,
  tagline: description,
  url: `https://${organizationName}.github.io/`,
  baseUrl: `/${projectName}/`,
  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName,
  projectName,
  themeConfig: {
    navbar: {
      title,
      items: [
        {
          href: githubUrl,
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} Felipe Santos. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "../docs",
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: `${githubUrl}/edit/master/website`,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  plugins: [
    [
      "docusaurus-plugin-typedoc",
      {
        entryPoints: ["../src/"],
        tsconfig: "../tsconfig.json",
        docsRoot: "../docs",
        readme: "none",
        name: `${title} API`,
        includeVersion: true,
        plugin: [
          "typedoc-plugin-merge-modules",
        ],
        sidebar: {
          globalsLabel: "Table of Contents",
        },
      },
    ],
  ],
};
