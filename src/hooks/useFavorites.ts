import { useEffect, useState } from "react";
import { Recipe } from "../services/recipe-service";
import { CanceledError } from "../services/api-client";
import favoriteService from "../services/favorite-service";
import { useAuthUser } from "react-auth-kit";

const usefavorites = () => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const [recipe, setRecipe] = useState<Recipe>();
  const auth = useAuthUser();

  useEffect(() => {
    if (recipe?.isFavorite !== null && recipe?.isFavorite !== undefined) {
      setFavorite(recipe.isFavorite);
    }
  }, [recipe]);

  const createFavorite = (recipeId: string | number) => {
    const favorite = {
      userId: auth()?.id,
      recipeId: recipeId,
    };

    const { request, cancel } = favoriteService.create(favorite);
    request.then(() => setFavorite(true)).catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.message);
    });

    return () => cancel();
  }

  const deleteFavorite = (recipeId: string | number) => {
    const { request, cancel } = favoriteService.delete(auth()?.id.toString(), recipeId.toString())
    request.then(() => setFavorite(false)).catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.message);
    });

    return () => cancel();
  }

  return { createFavorite, deleteFavorite, error, isFavorite, setRecipe };
}

export default usefavorites;