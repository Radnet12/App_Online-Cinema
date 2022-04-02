import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const start = async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:3000",
  });

  // Set prefix
  app.setGlobalPrefix("api");

  // Use pipes globally
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(5000, () => "Server started");
};

start();
