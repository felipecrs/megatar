import * as execa from "execa";
import { getBinPathSync } from "get-bin-path";

const bin = getBinPathSync();

export const runCommand = (
  commandLine: string,
  options?: execa.SyncOptions
): execa.ExecaSyncReturnValue =>
  execa.commandSync(`${bin} ${commandLine}`, {
    ...options,
  });
