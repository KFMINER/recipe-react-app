import { useState } from "react";
import { Recipe } from "../services/recipe-service";
import { CanceledError } from "../services/api-client";
import favoriteService from "../services/favorite-service";
import { useAuthUser } from "react-auth-kit";

/**
 * A hook to set or unset the favorite state for the current user on a specified recipe.
 * @returns createFavorite(), deleteFavorite(), error
 * @author Kevin Friedrichs
 */
const usefavorites = () => {
  const [error, setError] = useState("");
  const auth = useAuthUser();

  const createFavorite = (recipe: Recipe) => {
    const favorite = {
      userId: auth()?.id,
      recipeId: recipe.id,
    };

    recipe.isFavorite = true;

    const { request, cancel } = favoriteService.create(favorite);
    request
    .catch((err) => {
      if (err instanceof CanceledError) return;
      recipe.isFavorite = false;
      setError(err.message);
    });

    return () => cancel();
  }

  const deleteFavorite = (recipe: Recipe) => {
    recipe.isFavorite = false;

    const { request, cancel } = favoriteService.delete(auth()?.id.toString(), recipe.id.toString())
    request
    .catch((err) => {
      if (err instanceof CanceledError) return;
      recipe.isFavorite = true;
      setError(err.message);
    });

    return () => cancel();
  }

  return { createFavorite, deleteFavorite, error };
}

export default usefavorites;