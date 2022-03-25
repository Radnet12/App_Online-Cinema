import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const start = async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  await app.listen(5000, () => "Server started");
};

start();
