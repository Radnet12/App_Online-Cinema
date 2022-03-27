import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  async byId() {
    return { email: "dsfsdf" };
  }
}
