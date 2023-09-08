import { useEffect, useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import LikeIconButton from "./LikeIconButton";
import { Recipe } from "../services/recipe-service";
import useFavorites from "../hooks/useFavorites";
import defaultImage from "../assets/default.png";
import { Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react";

interface Props {
  recipe: Recipe;
  onFavoriteChange: (isFavorite?: boolean) => void;
}

/**
 * A component, on which a single recipe is displayed as a card.
 * Contains the image, the title and a like button.
 * @returns RecipeCard component
 * @author Kevin Friedrichs
 */
const RecipeCard = ({ recipe, onFavoriteChange }: Props) => {
  const [isHovered, setHovered] = useState(false);
  const [isFavorite, setFavorite] = useState(recipe.isFavorite);

  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const { createFavorite, deleteFavorite } = useFavorites();

  useEffect(() => {
    setFavorite(recipe.isFavorite);
    onFavoriteChange(recipe.isFavorite);
  }, [recipe.isFavorite]);

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
          fallbackSrc={defaultImage}
          borderRadius="lg"
          width="100%"
          height="250px"
          fit="cover"
        />
        <HStack
          w="100%"
          justifyContent="space-between"
          marginTop={3}
          alignItems="start"
        >
          <Heading
            size="md"
            fontWeight="semibold"
            w="170px"
            color={isHovered ? "green.400" : "gray.700"}
            transitionProperty="common"
            transitionDuration="fast"
            className="prevent-select"
          >
            {recipe.name}
          </Heading>
          {isAuthenticated() && (
            <LikeIconButton
              onMouseEnter={() => setHovered(false)}
              onMouseLeave={() => setHovered(true)}
              onClick={() => {
                setFavorite(!isFavorite);
                isFavorite ? deleteFavorite(recipe) : createFavorite(recipe);
              }}
              active={recipe.isFavorite!}
            />
          )}
        </HStack>
      </CardBody>
    </Card>
  );
};

export default RecipeCard;
