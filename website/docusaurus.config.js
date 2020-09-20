const organizationName = "felipecrs"
const projectName = "megatar"
const githubUrl = `https://github.com/${organizationName}/${projectName}`;

module.exports = {
  title: "Megatar",
  tagline: "Full offline Helm chart packages.",
  url: `https://${organizationName}.github.io/`,
  baseUrl: `/${projectName}/`,
  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName,
  projectName,
  themeConfig: {
    navbar: {
      title: "Megatar",
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
          path: '../docs',
          routeBasePath: '/',
          homePageId: "api/index",
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
      'docusaurus-plugin-typedoc',
      {
        inputFiles: ['../src/'],
        docsRoot: '../docs',
        mode: "file"
      },
    ],
  ],
};
