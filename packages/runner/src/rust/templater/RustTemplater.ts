import { promises as fs } from "fs";
import { join } from "path";

import { Boundary } from "../../Boundary";
import { Challenge } from "../../Challenge";
import { LanguageTemplater } from "../../Templater";
import { Variant } from "../../Type";
import { RustChallengeRenderer } from "../renderer";

export class RustTemplater<I extends Variant, O extends Variant>
  implements LanguageTemplater<I, O>
{
  public imageName = "rust";

  #challengeRenderer = new RustChallengeRenderer();

  async output(
    challenge: Challenge<I, O>,
    userCode: string,
    mountPath: string
  ): Promise<Boundary> {
    const boundary = await Boundary.create();
    const runnerCode = await challenge.createRunner(
      this.#challengeRenderer,
      boundary,
      userCode
    );

    // write files
    await fs.writeFile(join(mountPath, "main.rs"), runnerCode);

    return boundary;
  }
}
