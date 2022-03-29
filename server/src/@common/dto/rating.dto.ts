import { IsNumber } from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";
import { Types } from "mongoose";

export class RatingDto {
  @IsObjectId({ message: "Movie id is invalid" })
  movieId: Types.ObjectId;

  @IsNumber()
  rating: number;
}
