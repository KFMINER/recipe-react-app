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
import { useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../services/recipe-service";
import useFavorites from "../hooks/useFavorites";

interface Props {
  recipe: Recipe;
  onFavoriteChange: (isFavorite: boolean) => void;
}

const RecipeCard = ({ recipe, onFavoriteChange }: Props) => {
  const [isHovered, setHovered] = useState(false);

  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const { createFavorite, deleteFavorite, isFavorite, setRecipe } =
    useFavorites();

  useEffect(() => {
    setRecipe(recipe);
  }, [recipe.id]);

  useEffect(() => {
    onFavoriteChange(isFavorite);
  }, [isFavorite]);

  return (
    <Card
      borderRadius={10}
      width="250px"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      cursor={isHovered ? "pointer" : "default"}
      onClick={() => {
        if (isHovered) {
          navigate(`/recipes/${recipe.id}`);
        }
      }}
    >
      <CardBody>
        <Image
          src={
            "https://recipe-express-app-production.up.railway.app/images/" +
            recipe.image
          }
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
                onClick={() => {
                  //console.log(isFavorite);
                  isFavorite ? deleteFavorite(recipe) : createFavorite(recipe);
                }}
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
