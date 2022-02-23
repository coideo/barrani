module.exports = {
  roots: ["<rootDir>/src"],
  setupFiles: [require.resolve("whatwg-fetch")],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  testEnvironment: "jest-environment-jsdom",
};
