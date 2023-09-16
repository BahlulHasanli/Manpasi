import path from 'path'
import fs from 'fs'
import { Manpasi } from '@/core/index'
import { regexFolder } from '@/core/options';

(async () => {
  try {
    const dirname = path.resolve(import.meta.dir + '/api')
    const files = fs.readdirSync(dirname)

    Manpasi(await Promise.all(files.map(async (folder) => {
      const matched = regexFolder(folder)

      if (!matched.match) {
        const filePath = path.join(dirname, folder);
        const directory = fs.statSync(filePath);

        let subDefineRoutes: any = [];

        if (directory.isDirectory()) {

          const subFolderPath = path.join(dirname, folder);
          const subFolderFiles = fs.readdirSync(subFolderPath);

          subDefineRoutes = await Promise.all(subFolderFiles.map(async (subFolder) => {
            const subFoldermatched = regexFolder(subFolder)
            const file = await import(`${dirname}/${folder}/${subFolder}`)

            return {
              name: `/${folder}${subFoldermatched.match[1] === 'index' ? '' : `/${subFoldermatched.match[1]}`}`,
              method: (subFoldermatched.match[2] as string).toUpperCase(),
              file: file.default,
              dynamic: subFoldermatched.dynamic
            };
          }))
        }

        return subDefineRoutes
      } else {
        const file = await import(`${dirname}/${folder}`)

        return {
          name: `/${matched.match[1] === 'index' ? '' : matched.match[1]}`,
          method: (matched.match[2] as string).toUpperCase(),
          file: file.default,
          dynamic: matched.dynamic
        };
      }
    })))
  } catch (error) {
    console.error('Error:', error);
  }
})();
