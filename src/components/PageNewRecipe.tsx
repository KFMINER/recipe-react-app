import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import IngredientInput from "./IngredientInput";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import ImageSelectButton from "./ImageSelectButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";

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
  const [image, setImage] = useState<File>();
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const auth = useAuthUser();

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const recipe = {
      name: nameRef.current?.value,
      ingredients: ingredients,
      steps: steps,
    };
    //console.log(recipe);
    //console.log(image);

    const formData = new FormData();
    formData.append("userId", auth()!.id);
    formData.append("name", nameRef.current!.value);
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("steps", JSON.stringify(steps));

    if (image) {
      formData.append("image", image!);
    }
    console.log(image);
    console.log(formData);
    console.log(auth());

    axios
      .post("http://localhost:3000/api/recipes", formData)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Center>
        <VStack width="700px" marginTop={10}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder="Tasty Bolognese" ref={nameRef} />
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

          <FormControl>
            <FormLabel>Image</FormLabel>
            <HStack>
              <ImageSelectButton
                onFileSelect={(file: File) => {
                  setImage(file);
                }}
              />
            </HStack>
          </FormControl>

          <HStack width="100%" marginTop={10}>
            <Button type="submit" colorScheme="green">
              Create Recipe
            </Button>
            <Button onClick={() => navigate("/")}>Cancel</Button>
          </HStack>
        </VStack>
      </Center>
    </form>
  );
};

export default PageNewRecipe;
