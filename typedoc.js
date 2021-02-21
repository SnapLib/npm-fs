module.exports =
{
  gitRemote: "upstream",
  ignoreCompilerErrors: true,
  inputFiles: ["src/main/ts"],
  mode: "modules",
  out: "build/tsdoc",
  readme: "docs/typedoc/README.md",
  stripInternal: true,
  tsconfig: "./src/main/ts/tsconfig.dist.json"
};
