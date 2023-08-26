import {
  Grid,
  GridItem,
  List,
  ListItem,
  Image,
  Flex,
  Card,
  SimpleGrid,
  CardBody,
  VStack,
  Heading,
  Center,
} from "@chakra-ui/react";
import SideNav from "./sideNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import RecipeCard from "./RecipeCard";

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

const PageMyRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const auth = useAuthUser();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/recipes/", {
        params: { userId: auth()?.id },
      })
      .then((res) => {
        setRecipes(res.data.recipes);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid templateAreas={`"aside main"`} gridTemplateColumns={"250px 1fr"}>
      <GridItem area="aside">
        <SideNav />
      </GridItem>
      <GridItem area="main" bg="gray.100">
        <Center>
          <SimpleGrid
            minChildWidth="250px"
            spacing={5}
            padding={10}
            width="90%"
          >
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </SimpleGrid>
        </Center>
      </GridItem>
    </Grid>
  );
};

export default PageMyRecipes;
