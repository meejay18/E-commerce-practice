import path from "node:path";
import fs, { read } from "node:fs";

export const removeFileUpload = (folderPath: any) => {
  try {
    let readFileData: any = fs.readFileSync(folderPath);

    for (let i of readFileData) {
      fs.unlink(path.join(folderPath, i), () => {
        console.log("removed");
      });
    }
  } catch (error) {
    return error;
  }
};
