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

const PageRecipe = () => {
  const auth = useAuthUser();
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { recipe, isLoading } = useRecipe(recipeId!, {
    authUserId: auth()?.id,
  });
  const { createFavorite, deleteFavorite, setRecipe, isFavorite } =
    useFavorites();

  useEffect(() => {
    setRecipe(recipe);
  }, [recipe]);

  const handleDelete = () => {
    const { request, cancel } = recipeService.delete(recipe!.id);
    request.then(() => navigate("/home"));
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
                  <Text fontSize="18px">KFMINER</Text>
                  <Text>-</Text>
                  <Text fontSize="14px" color="gray.500">
                    27.08.2023
                  </Text>
                </HStack>
                <HStack>
                  <Button leftIcon={<FaFilePdf />}>Export to PDF</Button>
                  {isFavorite ? (
                    <Button
                      leftIcon={<BsFillHeartbreakFill />}
                      colorScheme="red"
                      onClick={() => deleteFavorite(recipe!.id)}
                    >
                      Remove Recipe
                    </Button>
                  ) : (
                    <Button
                      leftIcon={<BsHeartFill />}
                      colorScheme="red"
                      onClick={() => createFavorite(recipe!.id)}
                    >
                      Save Recipe
                    </Button>
                  )}
                </HStack>
              </HStack>

              <Divider />
              <Heading fontWeight="semibold" size="lg">
                Ingredients
              </Heading>
              <TableContainer w="100%" borderRadius={10}>
                <Table variant="striped" colorScheme="green">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Amount</Th>
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
                Method
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
                      Edit
                    </Button>
                    <Button
                      leftIcon={<RiDeleteBin6Fill />}
                      colorScheme="red"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
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
