import { useEffect, useState } from "react";
import recipeService, { Recipe } from "../services/recipe-service";
import { CanceledError } from "../services/api-client";
import favoriteService, { Favorite } from "../services/favorite-service";

const usefavorites = () => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const create = (userId: string | number, recipeId: string | number) => {
    const favorite = {
      userId: userId,
      recipeId: recipeId,
    };

    const { request, cancel } = favoriteService.create(favorite);
    request.catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.message);
    });

    return () => cancel();
  }

  const del = (userId: string | number, recipeId: string | number) => {
    const { request, cancel } = favoriteService.delete(userId.toString(), recipeId.toString())
    request.catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.message);
    });

    return () => cancel();
  }

  return { create, del, error, isLoading, setError };
}

export default usefavorites;