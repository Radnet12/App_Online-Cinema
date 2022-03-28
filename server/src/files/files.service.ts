import { Injectable } from "@nestjs/common";
import { path } from "app-root-path";
import { ensureDir, writeFile } from "fs-extra";

import { FileResponse } from "@types";

@Injectable()
export class FilesService {
  async uploadFiles(
    uploadedFiles: Express.Multer.File[],
    folder: string = "default",
  ): Promise<FileResponse[]> {
    const uploadsFolder = `${path}/uploads/${folder}`;

    await ensureDir(uploadsFolder);

    const files: FileResponse[] = await Promise.all(
      uploadedFiles.map(async (file) => {
        await writeFile(`${uploadsFolder}/${file.originalname}`, file.buffer);

        return {
          name: file.originalname,
          url: `/uploads/${folder}/${file.originalname}`,
        };
      }),
    );

    return files;
  }
}
