import create from "./http-service";

interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: number;
  user_id: number;
  name: string;
  ingredients: Ingredient[];
  steps: string[];
  image: File;
  isFavorite?: boolean;
}

export default create('/recipes');