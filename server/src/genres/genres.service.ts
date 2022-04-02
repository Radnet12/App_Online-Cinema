import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ModelType } from "@typegoose/typegoose/lib/types";

import { GenreDto } from "@dto";
import { GenreModel } from "@models";
import { Collection } from "@types";

import { MoviesService } from "@/movies/movies.service";

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(GenreModel) private readonly genreModel: ModelType<GenreModel>,
    private readonly moviesService: MoviesService,
  ) {}

  async getGenreBySlug(slug: string) {
    const genre = await this.genreModel.findOne({ slug });

    if (!genre) {
      throw new NotFoundException("Genre not found");
    }

    return genre;
  }

  async getAllGenres(searchTerm?: string) {
    let options = {};

    if (searchTerm) {
      options = {
        $or: [
          {
            name: new RegExp(searchTerm, "i"),
          },
          {
            slug: new RegExp(searchTerm, "i"),
          },
          {
            description: new RegExp(searchTerm, "i"),
          },
        ],
      };
    }

    return this.genreModel
      .find(options)
      .select("-updatedAt -__v")
      .sort({
        createdAt: "desc",
      })
      .exec();
  }

  async getCollections() {
    const genres = await this.getAllGenres();

    const collections = await Promise.all(
      genres.map(async (genre) => {
        const moviesByGenres = await this.moviesService.getMoviesByGenres([
          genre._id,
        ]);

        const result: Collection = {
          _id: String(genre._id),
          image: moviesByGenres[0].largePoster,
          slug: genre.slug,
          title: genre.name,
        };

        return result;
      }),
    );

    return collections;
  }

  // ADMIN METHODS

  async getGenreById(_id) {
    const genre = await this.genreModel.findById(_id);

    if (!genre) {
      throw new NotFoundException("Genre not found");
    }

    return genre;
  }

  async createGenre() {
    const genres = await this.getAllGenres();

    const emptyGenre = genres.find((genre) => genre.slug === "");

    if (emptyGenre) {
      throw new ConflictException(
        `Genre with id: ${emptyGenre._id} is empty. Please fill this genre`,
      );
    }

    const genreDefaultValues: GenreDto = {
      name: "",
      slug: "",
      description: "",
      icon: "",
    };

    const genre = await this.genreModel.create(genreDefaultValues);

    return genre._id;
  }

  async updateGenre(_id: string, dto: GenreDto) {
    const genreBySlug = await this.genreModel.findOne({ slug: dto.slug });

    if (genreBySlug?.slug === dto.slug) {
      throw new BadRequestException("Genre with such slug alredy exists");
    }

    const genre = await this.genreModel
      .findByIdAndUpdate(_id, dto, { new: true })
      .exec();

    if (!genre) {
      throw new NotFoundException("Genre has not been found");
    }

    return genre;
  }

  async deleteGenre(_id: string) {
    const genre = await this.genreModel.findByIdAndDelete(_id).exec();

    if (!genre) {
      throw new NotFoundException("Genre has not been found");
    }

    return genre;
  }

  // ADMIN METHODS
}
