import create from "./http-service";

export interface Ingredient {
  id: number;
  name: string;
  amount: string;
}

export interface Step {
  id: number;
  text: string;
}

export interface Recipe {
  id: number;
  user_id: number;
  name: string;
  ingredients: Ingredient[];
  steps: Step[];
  image: File;
  isFavorite?: boolean;
}

export default create('/recipes');