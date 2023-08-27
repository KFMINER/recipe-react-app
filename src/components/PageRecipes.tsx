import { Grid, GridItem, Flex, Center, Box } from "@chakra-ui/react";
import SideNav from "./sideNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import RecipeCard from "./RecipeCard";
import { useSearchParams } from "react-router-dom";

interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
  steps: string[];
  image: File;
  isFavorite?: boolean;
}

const PageRecipes = () => {
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const auth = useAuthUser();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/recipes/", {
        params: {
          authUserId: auth()?.id,
          ...(searchParams.get("userId")
            ? { userId: searchParams.get("userId") }
            : {}),
        },
      })
      .then((res) => {
        setRecipes(res.data.recipes);
      })
      .catch((err) => console.log(err));
  }, [searchParams.get("userId")]);

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
