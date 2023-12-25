import fs from "fs";
import path from "path";
// for building and releasing the package
import { execSync } from "child_process";
import { fileURLToPath } from "url";

// Function to get directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const packagePath = path.resolve(__dirname, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
// bump version
const bump = (version) => {
  packageJson.version = version;
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  console.log("bumped version to " + version);
};

// build
const build = () => {
  // nothing here yet
  execSync("rm -rd ./dist");
  execSync("npm install");
  execSync("npm run build");
};

const publish = () => {
  // publish to npm
  execSync("npm publish --verbose", { stdio: [0, 1, 2] });
  console.log("published to npm");
};

// main
const main = () => {
  const args = process.argv.slice(2);
  const version = args[0];
  if (!version) {
    console.error("version is required");
    process.exit(1);
  }
  try {
    bump(version);
    build();
    publish();
    console.log("done");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

main();
