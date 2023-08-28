import create from "./http-service";

export interface User {
  id: string;
  username: string;
  token: string;
}

export default create('/users');