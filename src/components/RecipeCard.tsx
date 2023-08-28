import {
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LikeIconButton from "./LikeIconButton";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../services/recipe-service";
import useFavorites from "../hooks/useFavorites";

interface Props {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: Props) => {
  const [isHovered, setHovered] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const navigate = useNavigate();
  const favorites = useFavorites();

  useEffect(() => {
    if (recipe.isFavorite !== null && recipe.isFavorite !== undefined) {
      setFavorite(recipe.isFavorite);
    }
  }, []);

  const addToFavorites = () => {
    setFavorite(true);
    favorites.create(auth()?.id, recipe.id);
  };

  const removeFromFavorites = () => {
    setFavorite(false);
    favorites.del(auth()?.id, recipe.id);
  };

  return (
    <Card
      borderRadius={10}
      width="250px"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      cursor={isHovered ? "pointer" : "default"}
      onClick={() => navigate(`/recipe/${recipe.id}`)}
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
