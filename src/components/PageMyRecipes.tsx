import { Grid, GridItem, List, ListItem } from "@chakra-ui/react";
import SideNav from "./sideNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";

interface Ingredient {
  name: string;
  amount: string;
}

interface Recipe {
  name: string;
  ingredients: Ingredient[];
  steps: string[];
  image: File;
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
        console.log(recipes);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid templateAreas={`"aside main"`} gridTemplateColumns={"250px 1fr"}>
      <GridItem area="aside">
        <SideNav />
      </GridItem>
      <GridItem area="main">
        <List>
          {recipes.map((recipe, index) => (
            <ListItem key={index}>{recipe.name}</ListItem>
          ))}
        </List>
      </GridItem>
    </Grid>
  );
};

export default PageMyRecipes;
