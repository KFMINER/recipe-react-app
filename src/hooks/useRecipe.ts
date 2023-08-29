import { useEffect, useState } from "react";
import recipeService, { Recipe } from "../services/recipe-service";
import { CanceledError } from "../services/api-client";

const useRecipe = (id: string, params?: object) => {
  const [recipe, setRecipe] = useState<Recipe>();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = recipeService.get<Recipe>(id, undefined, params);
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
  }, []);

  return { recipe, error, isLoading, setRecipe, setError };
}

export default useRecipe;