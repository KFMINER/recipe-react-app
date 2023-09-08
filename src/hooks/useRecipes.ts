import { useEffect, useState } from "react";
import recipeService, { Recipe } from "../services/recipe-service";
import { CanceledError } from "../services/api-client";
import { Params } from "../components/pages/PageRecipes"

/**
 * A hook to load multiple recipes from the server.
 * @returns recipes, error, isLoading, setRecipes(), setError()
 * @author Kevin Friedrichs
 */
const useRecipes = (params?: Params) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = recipeService.getAll<Recipe>(params);
    request
      .then((res) => {
        setRecipes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, [params?.favorites, params?.userId, params?.search]);

  return { recipes, error, isLoading, setRecipes, setError };
}

export default useRecipes;