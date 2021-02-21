const join = require("path").join;
const resolve = require("path").resolve;

module.exports =
{
  gitRemote: "upstream",
  ignoreCompilerErrors: true,
  inputFiles: [resolve(join("src", "main", "ts"))],
  mode: "modules",
  out: resolve(join("build", "tsdoc")),
  readme: resolve(join("docs", "typedoc", "README.md")),
  stripInternal: true,
  tsconfig: resolve(join("src", "main", "ts", "tsconfig.dist.json"))
};
