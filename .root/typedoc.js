const join = require("path").join;

module.exports =
{
  gitRemote: "upstream",
  ignoreCompilerErrors: true,
  inputFiles: [join("src", "main", "ts")],
  mode: "modules",
  out: join("build", "tsdoc"),
  readme: join("docs", "typedoc", "README.md"),
  stripInternal: true,
  tsconfig: join("src", "main", "ts", "tsconfig.dist.json")
};
