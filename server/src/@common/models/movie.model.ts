import { prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

import { ActorModel, GenreModel } from "@models";

export interface MovieModel extends Base {}

export class MovieDtoParams {
  @prop()
  year: number;

  @prop()
  duration: number;

  @prop()
  country: string;
}

export class MovieModel extends TimeStamps {
  @prop()
  poster: string;

  @prop()
  largePoster: string;

  @prop()
  title: string;

  @prop({ unique: true })
  slug: string;

  @prop()
  params?: MovieDtoParams;

  @prop({ default: 0 })
  rating?: number;

  @prop()
  videoUrl: string;

  @prop({ default: 0 })
  watchCount?: number;

  @prop({ ref: () => GenreModel })
  genres: Ref<GenreModel>[];

  @prop({ ref: () => ActorModel })
  actors: Ref<ActorModel>[];

  @prop({ default: false })
  isPublishedInTelegram?: boolean;
}
