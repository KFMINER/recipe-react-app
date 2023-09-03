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
}

const PageRecipes = () => {
  const [searchParams] = useSearchParams();
  const auth = useAuthUser();

  const params: Params = {
    userId: searchParams.get("userId"),
    favorites: searchParams.get("favorites"),
    authUserId: auth()?.id,
  };

  const { recipes, setRecipes, isLoading } = useRecipes(params);

  return (
    <Box bg="gray.100" minHeight="calc(100vh - 60px)">
      <Center>
        <Flex gap={10} width="80%" flexWrap="wrap" marginTop={10}>
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
