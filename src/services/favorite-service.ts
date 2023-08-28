import create from "./http-service";

export interface Favorite {
  id: string;
  user_id: string;
  recipe_id: string;
}

export default create('/recipes/favorites');