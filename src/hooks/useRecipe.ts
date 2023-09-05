import { useState } from "react";
import recipeService, { Recipe } from "../services/recipe-service";
import { CanceledError } from "../services/api-client";
import useFavorites from "./useFavorites";

/**
 * A hook to load a specific recipe by its ID from the server.
 * @returns recipe, error, isLoading, setError(), loadRecipeById(), unsetRecipe(), addToFavorites(), removeFromFavorites()
 * @author Kevin Friedrichs
 */
const useRecipe = () => {
  const [recipe, setRecipe] = useState<Recipe | null>();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { createFavorite, deleteFavorite } = useFavorites();

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

  const addToFavorites = () => {
    createFavorite(recipe!);
    setRecipe({...recipe, isFavorite: true} as Recipe)
  }

  const removeFromFavorites = () => {
    deleteFavorite(recipe!);
    setRecipe({...recipe, isFavorite: false} as Recipe)
  }

  return { recipe, error, isLoading, setError, loadRecipeById, unsetRecipe, addToFavorites, removeFromFavorites };
}

export default useRecipe;