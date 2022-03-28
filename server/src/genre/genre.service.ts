import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { CreateGenreDto } from "./dto/createGenre.dto";
import { GenreModel } from "./genre.model";

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(GenreModel) private readonly genreModel: ModelType<GenreModel>,
  ) {}

  async getGenrebySlug(slug: string) {
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

    const collections = genres;

    return collections;
  }

  // ADMIN METHODS

  async getGenrebyId(_id) {
    const genre = await this.genreModel.findById(_id);

    if (!genre) {
      throw new NotFoundException("Genre not found");
    }

    return genre;
  }

  async createGenre() {
    const genreDefaultValues: CreateGenreDto = {
      name: "",
      slug: "",
      description: "",
      icon: "",
    };

    const genre = await this.genreModel.create(genreDefaultValues);

    return genre._id;
  }

  async updateGenre(_id: string, dto: CreateGenreDto) {
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
