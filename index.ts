import path from "path";
import fs from "fs/promises";
import { Manpasi } from "@/core/index";
import { regexFolder } from "@/core/options";

async function processFolder(
  dirname: string,
  folder: string,
  parentFolder: string = "",
) {
  const filePath = path.join(dirname, folder);

  const fileStats = await fs.stat(filePath);

  const matched = regexFolder(folder);

  if (matched.match) {
    const file = await import(filePath);

    return [
      {
        name: `/${matched.match[1] === "index" ? "api" : matched.match[1]}`,
        method: matched.match[2].toUpperCase(),
        file: file.default,
        dynamic: {
          name: matched.name,
          has: matched.dynamic,
        },
      },
    ];
  }

  if (!fileStats.isDirectory()) return [];

  const subFolderPath = path.join(dirname, folder);
  const subFolderFiles = await fs.readdir(subFolderPath);

  return await Promise.all(
    subFolderFiles.map(async (subFolder: string) => {
      const subFilePath = path.join(dirname, folder, subFolder);
      const subFileMatched = regexFolder(subFolder);
      const file = await import(subFilePath);

      return {
        name: `/api/${folder}${
          subFileMatched.match[1] === "index"
            ? ""
            : `/${subFileMatched.match[1]}`
        }`,
        method: subFileMatched.match[2].toUpperCase(),
        file: file.default,
        dynamic: {
          name: subFileMatched.name,
          has: subFileMatched.dynamic,
        },
        parentFolder: parentFolder || folder,
      };
    }),
  );
}

(async () => {
  try {
    const dirname = path.resolve(`${import.meta.dir}/api`);
    const files = await fs.readdir(dirname);

    const subDefineRoutes = (
      await Promise.all(
        files.map((folder: any) => processFolder(dirname, folder)),
      )
    ).flat();

    Manpasi(subDefineRoutes);
  } catch (error) {
    console.error("Error:", error);
  }
})();
