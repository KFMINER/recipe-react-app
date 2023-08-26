import {
  Box,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";
import { Recipe } from "./PageMyRecipes";
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import LikeIconButton from "./LikeIconButton";
import axios from "axios";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";

interface Props {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: Props) => {
  const [isHovered, setHovered] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();

  useEffect(() => {
    if (recipe.isFavorite !== null && recipe.isFavorite !== undefined) {
      setFavorite(recipe.isFavorite);
    }
  }, []);

  const addToFavorites = () => {
    setFavorite(true);
    const favorite = {
      userId: auth()?.id,
      recipeId: recipe.id,
    };
    axios
      .post("http://localhost:3000/api/recipes/favorites", favorite)
      .catch((err) => {
        setFavorite(false);
        console.log(err);
      });
  };

  const removeFromFavorites = () => {
    setFavorite(false);
    axios
      .delete(
        `http://localhost:3000/api/recipes/favorites/${auth()?.id}/${recipe.id}`
      )
      .catch((err) => {
        setFavorite(true);
        console.log(err);
      });
  };

  return (
    <Card
      borderRadius={10}
      width="250px"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      cursor={isHovered ? "pointer" : "default"}
    >
      <CardBody>
        <Image
          src={"http://localhost:3000/images/" + recipe.image}
          borderRadius="lg"
          width="100%"
          height="250px"
          fit="cover"
        />
        <VStack marginTop={3}>
          <HStack w="100%" justifyContent="space-between">
            <Heading
              size="md"
              fontWeight="semibold"
              w="100%"
              color={isHovered ? "green.400" : "gray.700"}
              transitionProperty="common"
              transitionDuration="fast"
            >
              {recipe.name}
            </Heading>
            {isAuthenticated() && (
              <LikeIconButton
                onMouseEnter={() => setHovered(false)}
                onMouseLeave={() => setHovered(true)}
                onClick={() =>
                  isFavorite ? removeFromFavorites() : addToFavorites()
                }
                active={isFavorite}
              />
            )}
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default RecipeCard;
