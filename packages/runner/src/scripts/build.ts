import { execSync } from "child_process";
import { promises as fs } from "fs";
import { join, resolve } from "path";

const imagesDirectory = resolve(__dirname, "..", "..", "docker");

void (async function () {
  for (const lang of await fs.readdir(imagesDirectory)) {
    execSync(`docker build . --tag "algwiki/${lang}"`, {
      cwd: join(imagesDirectory, lang),
      stdio: "inherit",
    });
  }
})();
