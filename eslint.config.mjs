import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: ["audit/**", "docs/**", "node_modules/**", ".next/**", "public/**"],
  },
  ...nextVitals,
];

export default eslintConfig;
