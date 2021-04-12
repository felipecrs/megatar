module.exports = {
  extends: ["@commitlint/config-conventional"],
  helpUrl: "https://www.conventionalcommits.org/",
  rules: {
    "body-max-line-length": [1, "always", 100],
  },
};
