import { useState } from "react";
import recipeService, { Recipe } from "../services/recipe-service";
import { CanceledError } from "../services/api-client";

const useRecipe = () => {
  const [recipe, setRecipe] = useState<Recipe | null>();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const loadRecipeById = (recipeId: string, params?: object) => {
    setLoading(true);
      const { request, cancel } = recipeService.get<Recipe>(recipeId, undefined, params);
      request
        .then((res) => {
          setRecipe(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });
  
      return () => cancel();
  };

  const unsetRecipe = () => {
    setRecipe(null);
  }

  return { recipe, error, isLoading, setError, loadRecipeById, unsetRecipe };
}

export default useRecipe;