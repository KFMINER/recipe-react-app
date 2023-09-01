import { useNavigate, useParams } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import {
  Box,
  Center,
  Heading,
  VStack,
  Image,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Divider,
  Text,
  HStack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { BsFillHeartbreakFill, BsHeartFill } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useRecipe from "../hooks/useRecipe";
import useFavorites from "../hooks/useFavorites";
import { useEffect, useState } from "react";
import recipeService from "../services/recipe-service";
import useDate from "../hooks/useDate";
import DeleteDialog from "./DeleteDialog";
import { useTranslation } from "react-i18next";

const PageRecipe = () => {
  const auth = useAuthUser();
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { recipe, isLoading, loadRecipeById } = useRecipe();
  const { createFavorite, deleteFavorite, setRecipe, isFavorite } =
    useFavorites();
  const { getDateFromSecondsFormatted } = useDate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  // Load Recipe by recipe-id from params
  useEffect(() => {
    if (recipeId) {
      loadRecipeById(recipeId);
    }
  }, [recipeId]);

  // Set Recipe for Favorites-hook
  useEffect(() => {
    if (recipe) {
      setRecipe(recipe);
    }
  }, [recipe]);

  const handleDelete = () => {
    const { request, cancel } = recipeService.delete(recipe!.id);
    request.then(() => navigate("/"));
  };

  return (
    <Box bg="gray.100" minHeight="calc(100vh - 60px)">
      <Center>
        <Box
          w="900px"
          bg="white"
          marginTop={10}
          paddingY={10}
          borderRadius={20}
        >
          <Center>
            <VStack alignItems="start" gap={6} width="642px">
              <Heading fontWeight="semibold">{recipe?.name}</Heading>
              <Image
                src={"http://localhost:3000/images/" + recipe?.image}
                borderRadius={10}
                width="642px"
                height="428px"
                fit="cover"
              />

              <HStack w="100%" justifyContent="space-between">
                <HStack>
                  <Box width="40px" color="green.400">
                    <FaUserCircle fontSize="40px" />
                  </Box>
                  <Text fontSize="18px">{auth()?.username}</Text>
                  <Text>-</Text>
                  <Text fontSize="14px" color="gray.500">
                    {getDateFromSecondsFormatted(recipe?.updated)}
                  </Text>
                </HStack>
                <HStack>
                  <Button leftIcon={<FaFilePdf />} isDisabled>
                    {t("recipePageButtonExportPDF")}
                  </Button>
                  {isFavorite ? (
                    <Button
                      leftIcon={<BsFillHeartbreakFill />}
                      colorScheme="red"
                      onClick={() => deleteFavorite(recipe!)}
                    >
                      {t("recipePageButtonRemove")}
                    </Button>
                  ) : (
                    <Button
                      leftIcon={<BsHeartFill />}
                      colorScheme="red"
                      onClick={() => createFavorite(recipe!)}
                    >
                      {t("recipePageButtonSave")}
                    </Button>
                  )}
                </HStack>
              </HStack>

              <Divider />
              <Heading fontWeight="semibold" size="lg">
                {t("recipePageHeadingIngredients")}
              </Heading>
              <TableContainer w="100%" borderRadius={10}>
                <Table variant="striped" colorScheme="green">
                  <Thead>
                    <Tr>
                      <Th>{t("recipePageTableIngredientsColName")}</Th>
                      <Th>{t("recipePageTableIngredientsColAmount")}</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {recipe?.ingredients.map((ingredient, index) => (
                      <Tr key={index}>
                        <Td>{ingredient.name}</Td>
                        <Td>{ingredient.amount}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>

              <Divider />
              <Heading fontWeight="semibold" size="lg">
                {t("recipePageHeadingSteps")}
              </Heading>
              {recipe?.steps.map((step, index) => (
                <Text key={index} wordBreak={"break-word"}>
                  {step.text}
                </Text>
              ))}

              {auth()?.id === recipe?.user_id && (
                <>
                  <Divider />
                  <HStack w="100%" justifyContent="right">
                    <Button
                      leftIcon={<AiFillEdit />}
                      onClick={() =>
                        navigate(`/recipeform?recipeId=${recipe?.id}`)
                      }
                    >
                      {t("recipePageButtonEdit")}
                    </Button>
                    <Button
                      leftIcon={<RiDeleteBin6Fill />}
                      colorScheme="red"
                      onClick={onOpen}
                    >
                      {t("recipePageButtonDelete")}
                    </Button>
                    <DeleteDialog
                      onClose={onClose}
                      isOpen={isOpen}
                      onConfirm={handleDelete}
                    />
                  </HStack>
                </>
              )}
            </VStack>
          </Center>
        </Box>
      </Center>
    </Box>
  );
};

export default PageRecipe;
