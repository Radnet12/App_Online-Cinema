import { Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { Types } from "mongoose";

import { Auth, User } from "@decorators";
import { IdValidationPipe } from "@pipes";

import { RatingService } from "./rating.service";
import { RatingDto } from "@dto";

@Controller("rating")
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Auth()
  @Get("/:movieId")
  async getMovieRating(
    @Param("movieId", IdValidationPipe) movieId: Types.ObjectId,
    @User("_id") _id: Types.ObjectId,
  ) {
    return this.ratingService.getMovieRating(movieId, _id);
  }

  @Auth()
  @HttpCode(200)
  @Post()
  async setMovieRating(@User("_id") _id: Types.ObjectId, dto: RatingDto) {
    return this.ratingService.setMovieRating(_id, dto);
  }
}
