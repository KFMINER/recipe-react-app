import { Flex, Center, Box } from "@chakra-ui/react";
import { useAuthUser } from "react-auth-kit";
import RecipeCard from "./RecipeCard";
import { useSearchParams } from "react-router-dom";
import useRecipes from "../hooks/useRecipes";

const PageRecipes = () => {
  const [searchParams] = useSearchParams();
  const auth = useAuthUser();

  const params = {
    userId: searchParams.get("userId"),
    authUserId: auth()?.id,
  };

  const { recipes } = useRecipes(params);

  return (
    <Box bg="gray.100" minHeight="calc(100vh - 60px)">
      <Center>
        <Flex gap={10} width="80%" flexWrap="wrap" marginTop={10}>
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </Flex>
      </Center>
    </Box>
  );
};

export default PageRecipes;
