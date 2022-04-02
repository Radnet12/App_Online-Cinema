import { Injectable } from "@nestjs/common";
import { Telegraf } from "telegraf";

import { Telegram } from "@types";
import { getTelegramConfig } from "@configs";
import { ExtraReplyMessage } from "telegraf/typings/telegram-types";

@Injectable()
export class TelegramService {
  options: Telegram;
  bot: Telegraf;

  constructor() {
    this.options = getTelegramConfig();
    this.bot = new Telegraf(this.options.token);
  }

  async sendMessage(
    msg: string,
    options?: ExtraReplyMessage,
    chatId: string = this.options.chatId,
  ) {
    await this.bot.telegram.sendMessage(chatId, msg, {
      parse_mode: "HTML",
      ...options,
    });
  }

  async sendPhoto(
    photoUrl: string,
    msg?: string,
    chatId: string = this.options.chatId,
  ) {
    await this.bot.telegram.sendPhoto(chatId, photoUrl, {
      caption: msg,
    });
  }
}
