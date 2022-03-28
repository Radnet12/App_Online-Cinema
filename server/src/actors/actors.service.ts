import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ModelType } from "@typegoose/typegoose/lib/types";

import { ActorModel } from "@models";
import { ActorDto } from "@dto";

@Injectable()
export class ActorsService {
  constructor(
    @InjectModel(ActorModel) private readonly actorModel: ModelType<ActorModel>,
  ) {}

  async getActorBySlug(slug: string) {
    const actor = await this.actorModel.findOne({ slug });

    if (!actor) {
      throw new NotFoundException("Actor not found");
    }

    return actor;
  }

  async getAllActors(searchTerm?: string) {
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
        ],
      };
    }

    return this.actorModel
      .find(options)
      .select("-updatedAt -__v")
      .sort({
        createdAt: "desc",
      })
      .exec();
  }

  // ADMIN METHODS

  async getActorById(_id) {
    const actor = await this.actorModel.findById(_id);

    if (!actor) {
      throw new NotFoundException("Actor not found");
    }

    return actor;
  }

  async createActor() {
    const actors = await this.getAllActors();

    const emptyActor = actors.find((actor) => actor.slug === "");

    if (emptyActor) {
      throw new ConflictException(
        `Actor with id: ${emptyActor._id} is empty. Please fill this actor`,
      );
    }

    const actorDefaultValues: ActorDto = {
      name: "",
      slug: "",
      photo: "",
    };

    const actor = await this.actorModel.create(actorDefaultValues);

    return actor._id;
  }

  async updateActor(_id: string, dto: ActorDto) {
    const actor = await this.actorModel
      .findByIdAndUpdate(_id, dto, { new: true })
      .exec();

    if (!actor) {
      throw new NotFoundException("Actor has not been found");
    }

    return actor;
  }

  async deleteActor(_id: string) {
    const actor = await this.actorModel.findByIdAndDelete(_id).exec();

    if (!actor) {
      throw new NotFoundException("Actor has not been found");
    }

    return actor;
  }

  // ADMIN METHODS
}
