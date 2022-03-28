import {
  Controller,
  HttpCode,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";

import { Auth } from "@decorators";

import { FilesService } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseInterceptors(FileInterceptor("file"))
  @Auth("admin")
  @HttpCode(200)
  @Post()
  async uploadFiles(
    @UploadedFile() file: Express.Multer.File,
    @Query("folder") folder: string,
  ) {
    return this.filesService.uploadFiles([file], folder);
  }
}
