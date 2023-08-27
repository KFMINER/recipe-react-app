import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import { Recipe } from "./PageRecipes";
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
} from "@chakra-ui/react";

const PageRecipe = () => {
  const [recipe, setRecipe] = useState<Recipe>();
  const { recipeId } = useParams();
  const auth = useAuthUser();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/recipes/${recipeId}`, {
        params: { authUserId: auth()?.id },
      })
      .then((res) => setRecipe(res.data))
      .catch((err) => console.log(err));
  }, []);

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
                  {step}
                </Text>
              ))}
            </VStack>
          </Center>
        </Box>
      </Center>
    </Box>
  );
};

export default PageRecipe;
