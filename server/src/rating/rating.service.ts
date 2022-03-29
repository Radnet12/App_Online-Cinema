import { Injectable, Type } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";

import { RatingModel } from "@models";
import { RatingDto } from "@dto";

import { MoviesService } from "@/movies/movies.service";

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(RatingModel)
    private readonly ratingModel: ModelType<RatingModel>,
    private readonly moviesService: MoviesService,
  ) {}

  async getMovieRating(movieId: Types.ObjectId, userId: Types.ObjectId) {
    return this.ratingModel
      .findOne({ movie: movieId, user: userId })
      .select("rating")
      .exec()
      .then((data) => (data ? data.rating : 0));
  }

  async setMovieRating(userId: Types.ObjectId, dto: RatingDto) {
    const { movieId, rating } = dto;

    const newRating = await this.ratingModel
      .findOneAndUpdate(
        {
          movie: movieId,
          user: userId,
        },
        {
          movie: movieId,
          user: userId,
          rating,
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      )
      .exec();

    const averageRating = await this.calcAverageRating(movieId);

    await this.moviesService.updateMovieRating(movieId, averageRating);

    return newRating;
  }

  private async calcAverageRating(movieId: Types.ObjectId) {
    const moviesRating: RatingModel[] = await this.ratingModel
      .aggregate()
      .match({
        movie: movieId,
      })
      .exec();

    return (
      moviesRating.reduce((acc, item) => acc + item.rating, 0) /
      moviesRating.length
    );
  }
}
