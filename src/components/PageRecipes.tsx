import { Grid, GridItem, Flex, Center } from "@chakra-ui/react";
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
    <Grid templateAreas={`"aside main"`} gridTemplateColumns={"250px 1fr"}>
      <GridItem area="aside">
        <SideNav />
      </GridItem>
      <GridItem area="main" bg="gray.100">
        <Center>
          <Flex gap={10} padding={10} width="90%" flexWrap="wrap">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </Flex>
        </Center>
      </GridItem>
    </Grid>
  );
};

export default PageRecipes;
