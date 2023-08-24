import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
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
  const [steps, setSteps] = useState<string[]>([""]);
  const [canAddIngredient, setCanAddIngredient] = useState(false);
  const [canAddStep, setCanAddStep] = useState(false);

  useEffect(() => {
    checkForEmptyIngredients();
    checkForEmptySteps();
  });

  const checkForEmptyIngredients = () => {
    setCanAddIngredient(true);
    ingredients.forEach((ingredient: Ingredient) => {
      if (ingredient.name.trim().length === 0) {
        setCanAddIngredient(false);
      }
    });
  };

  const checkForEmptySteps = () => {
    setCanAddStep(true);
    steps.forEach((step: string) => {
      if (step.trim().length === 0) {
        setCanAddStep(false);
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
            <Flex direction="column" gap={3}>
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
              }}
            >
              Add ingredient
            </Button>
          </FormControl>

          <FormControl>
            <FormLabel>Steps</FormLabel>
            <Flex direction="column" gap={3}>
              {steps.map((step, index) => (
                <Textarea
                  key={index}
                  value={step}
                  resize="none"
                  overflow="hidden"
                  onChange={(e) => {
                    e.target.style.height = "5px";
                    e.target.style.height = e.target.scrollHeight + "px";
                    const list = [...steps];
                    list[index] = e.target.value;
                    setSteps(list);
                  }}
                />
              ))}
            </Flex>
            <Button
              marginTop={3}
              isDisabled={!canAddStep}
              onClick={() => {
                setSteps([...steps, ""]);
              }}
            >
              Add Step
            </Button>
          </FormControl>
        </VStack>
      </Center>
    </form>
  );
};

export default PageNewRecipe;
