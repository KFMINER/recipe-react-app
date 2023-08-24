import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import IngredientInput from "./IngredientInput";
import { useEffect, useState } from "react";

interface Ingredient {
  [key: string]: string | undefined;
  name: string;
  amount: string;
}

const PageNewRecipe = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", amount: "" },
  ]);
  const [canAddIngredient, setCanAddIngredient] = useState(false);

  useEffect(() => {
    checkForEmptyIngredients();
  });

  const checkForEmptyIngredients = () => {
    setCanAddIngredient(true);
    ingredients.forEach((ingredient: Ingredient) => {
      if (ingredient.name.trim().length === 0) {
        setCanAddIngredient(false);
        console.log("can not add: " + JSON.stringify(ingredient));
      }
    });
  };

  return (
    <form>
      <Center>
        <VStack width="700px" marginTop={10}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder="Tasty Bolognese" />
          </FormControl>

          <FormControl>
            <FormLabel>Ingredients</FormLabel>
            <Flex direction="column" gap={3} id="testcontainer">
              {ingredients.map((ingredient, index) => (
                <IngredientInput
                  key={index}
                  name={ingredient.name}
                  amount={ingredient.amount}
                  onChangeName={(e) => {
                    const list = [...ingredients];
                    list[index].name = e.target.value;
                    setIngredients(list);
                  }}
                  onChangeAmount={(e) => {
                    const list = [...ingredients];
                    list[index].amount = e.target.value;
                    setIngredients(list);
                  }}
                  onDelete={() => {
                    const list = [...ingredients];
                    list.splice(index, 1);
                    setIngredients(list);
                  }}
                />
              ))}
            </Flex>
            <Button
              marginTop={3}
              isDisabled={!canAddIngredient}
              onClick={() => {
                setIngredients([...ingredients, { name: "", amount: "" }]);
                setCanAddIngredient(false);
              }}
            >
              Add ingredient
            </Button>
          </FormControl>
        </VStack>
      </Center>
    </form>
  );
};

export default PageNewRecipe;
