import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";

import { MovieModel } from "@models";
import { MovieDto } from "@dto";

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(MovieModel) private readonly movieModel: ModelType<MovieModel>,
  ) {}

  async getAllMovies(searchTerm?: string) {
    let options = {};

    if (searchTerm) {
      options = {
        $or: [
          {
            title: new RegExp(searchTerm, "i"),
          },
        ],
      };
    }

    return this.movieModel
      .find(options)
      .select("-updatedAt -__v")
      .sort({
        createdAt: "desc",
      })
      .populate("actors genres")
      .exec();
  }

  async getMovieBySlug(slug: string) {
    const movie = await this.movieModel
      .findOne({ slug })
      .populate("actors genres")
      .exec();

    if (!movie) {
      throw new NotFoundException("Movie not found");
    }

    return movie;
  }

  async getMoviesByActor(actorId: Types.ObjectId) {
    const movies = await this.movieModel.find({ actors: actorId }).exec();

    if (!movies) {
      throw new NotFoundException("Movies not found");
    }

    return movies;
  }

  async getMoviesByGenres(genreIds: Types.ObjectId[]) {
    const movies = await this.movieModel
      .find({ genres: { $in: genreIds } })
      .exec();

    if (!movies) {
      throw new NotFoundException("Movies not found");
    }

    return movies;
  }

  async getMostPopularMovies() {
    const movies = await this.movieModel
      .find({ watchCount: { $gt: 0 } })
      .sort({ watchCount: -1 })
      .populate("genres")
      .exec();

    if (!movies) {
      throw new NotFoundException("Movies not found");
    }

    return movies;
  }

  async updateWatchesCount(slug: string) {
    const movie = await this.movieModel
      .findOneAndUpdate(
        { slug },
        {
          $inc: { watchCount: 1 },
        },
        {
          new: true,
        },
      )
      .exec();

    if (!movie) {
      throw new NotFoundException("Movie has not been found");
    }

    return movie;
  }

  async updateMovieRating(_id: Types.ObjectId, rating: number) {
    return this.movieModel
      .findByIdAndUpdate(_id, { rating }, { new: true })
      .exec();
  }

  // ADMIN METHODS

  async getMovieById(_id) {
    const movie = await this.movieModel.findById(_id);

    if (!movie) {
      throw new NotFoundException("Movie not found");
    }

    return movie;
  }

  async createMovie() {
    const movies = await this.getAllMovies();

    const emptyMovie = movies.find((movie) => movie.slug === "");

    if (emptyMovie) {
      throw new ConflictException(
        `Movie with id: ${emptyMovie._id} is empty. Please fill this movie`,
      );
    }

    const movieDefaultValues: MovieDto = {
      actors: [],
      genres: [],
      largePoster: "",
      poster: "",
      slug: "",
      title: "",
      videoUrl: "",
    };

    const movie = await this.movieModel.create(movieDefaultValues);

    return movie._id;
  }

  async updateMovie(_id: string, dto: MovieDto) {
    const movie = await this.movieModel
      .findByIdAndUpdate(_id, dto, { new: true })
      .exec();

    if (!movie) {
      throw new NotFoundException("Movie has not been found");
    }

    return movie;
  }

  async deleteMovie(_id: string) {
    const movie = await this.movieModel.findByIdAndDelete(_id).exec();

    if (!movie) {
      throw new NotFoundException("Movie has not been found");
    }

    return movie;
  }

  // ADMIN METHODS
}
