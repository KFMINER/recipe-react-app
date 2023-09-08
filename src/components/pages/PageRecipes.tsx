import { Flex, Center, Box } from "@chakra-ui/react";
import { useAuthUser } from "react-auth-kit";
import RecipeCard from "../RecipeCard";
import { useSearchParams } from "react-router-dom";
import useRecipes from "../../hooks/useRecipes";
import RecipeCardSkeleton from "../RecipeCardSkeleton";

export interface Params {
  userId: string | null;
  favorites: string | null;
  authUserId: string;
  search: string | null;
}

/**
 * A page component, on which multiple recipes can be displayed via RecipeCard components.
 * The displayed reciped can be filtered with searchParams:
 * - **userId** returns the recipes for the corresponding user.
 * - **favorites** (bool) returns the favorite recipes for the current user if the **authUserId** is also set.
 * @returns Recipes-Page component.
 * @author Kevin Friedrichs
 */
const PageRecipes = () => {
  const [searchParams] = useSearchParams();
  const auth = useAuthUser();

  const params: Params = {
    userId: searchParams.get("userId"),
    favorites: searchParams.get("favorites"),
    authUserId: auth()?.id,
    search: searchParams.get("search"),
  };

  const { recipes, setRecipes, isLoading } = useRecipes(params);

  return (
    <Box bg="gray.100" minHeight="calc(100vh - 60px)">
      <Center>
        <Flex gap={10} width="100%" flexWrap="wrap" padding={10}>
          {isLoading && <RecipeCardSkeleton />}
          {!isLoading &&
            recipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                onFavoriteChange={(isFavorite) => {
                  if (!isFavorite && params.favorites) {
                    const recipesFiltered = recipes.filter((r) => r.isFavorite);
                    setRecipes(recipesFiltered);
                  }
                }}
              />
            ))}
        </Flex>
      </Center>
    </Box>
  );
};

export default PageRecipes;
