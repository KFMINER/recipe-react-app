import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import IngredientInput from "../IngredientInput";
import { FormEvent, useEffect, useRef, useState } from "react";
import ImageSelectButton from "../ImageSelectButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import recipeService, { Ingredient, Step } from "../../services/recipe-service";
import useRecipe from "../../hooks/useRecipe";
import StepInput from "../StepInput";
import { useTranslation } from "react-i18next";
import ControlledInputCharCount from "../ControlledInputCharCount";

const PageRecipeForm = () => {
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { recipe, isLoading, loadRecipeById, unsetRecipe } = useRecipe();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [canAddIngredient, setCanAddIngredient] = useState(false);
  const [canAddStep, setCanAddStep] = useState(false);
  const [image, setImage] = useState<File>();
  const nameRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  // Authentication required for this page
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [isAuthenticated()]);

  // Check for empty ingredients and steps, so that no new input fields can be added for these while there are still empty ones
  useEffect(() => {
    checkForEmptyIngredients();
    checkForEmptySteps();
  });

  // Load Recipe by recipe-id from params or unset existing recipe if no id was set
  // (Happens if user switches from edit-form to new-form)
  useEffect(() => {
    if (searchParams.get("recipeId")) {
      loadRecipeById(searchParams.get("recipeId")!);
    } else {
      unsetRecipe();
    }
  }, [searchParams.get("recipeId")]);

  // Fill in (or clear) input values if recipe changes
  useEffect(() => {
    if (recipe && recipe?.user_id === auth()?.id) {
      nameRef.current!.value = recipe!.name;
      setIngredients(recipe!.ingredients);
      setSteps(recipe!.steps);
    }

    if (!recipe) {
      nameRef.current!.value = "";
      setIngredients([]);
      setSteps([]);
      setImage(undefined);
    }
  }, [recipe]);

  // Check if list contains empty ingredients. Can't add new entry if empty ingredient exists
  const checkForEmptyIngredients = () => {
    setCanAddIngredient(true);
    ingredients.forEach((ingredient: Ingredient) => {
      if (ingredient.name.trim().length === 0) {
        setCanAddIngredient(false);
      }
    });
  };

  // Check if list contains empty steps. Can't add new entry if empty step exists
  const checkForEmptySteps = () => {
    setCanAddStep(true);
    steps.forEach((step: Step) => {
      if (step.text.trim().length === 0) {
        setCanAddStep(false);
      }
    });
  };

  // Add empty ingredient to list
  const addEmptyIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };

  // Add empty step to list
  const addEmptyStep = () => {
    setSteps([...steps, { id: 0, text: "" }]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", auth()!.id);
    formData.append("name", nameRef.current!.value);
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("steps", JSON.stringify(steps));

    if (image) {
      formData.append("image", image!);
    }

    // Edit existing recipe
    if (recipe !== undefined && recipe !== null) {
      formData.append("recipeId", recipe.id.toString());
      const { request, cancel } = recipeService.update(recipe.id, formData);
      request.then(() => navigate("/")).catch((err) => setError(err.message));
    } else {
      const { request, cancel } = recipeService.create(formData);
      request
        .then((res) => navigate("/"))
        .catch((err) => setError(err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
                <FormControl isRequired>
                  <FormLabel>{t("recipeFormLabelName")}</FormLabel>
                  <ControlledInputCharCount
                    placeholder={t("recipeFormPlaceholderName")}
                    reference={nameRef}
                    maxLength={30}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>{t("recipeFormLabelIngredients")}</FormLabel>
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
                    onClick={addEmptyIngredient}
                  >
                    {t("recipeFormButtonAddIngredient")}
                  </Button>
                </FormControl>

                <FormControl>
                  <FormLabel>{t("recipeFormLabelSteps")}</FormLabel>
                  <Flex direction="column" gap={3}>
                    {steps.map((step, index) => (
                      <StepInput
                        key={index}
                        text={step.text}
                        onChange={(e) => {
                          const list = [...steps];
                          list[index].text = e.target.value;
                          setSteps(list);
                        }}
                        onDelete={() => {
                          const list = [...steps];
                          list.splice(index, 1);
                          setSteps(list);
                        }}
                      />
                    ))}
                  </Flex>
                  <Button
                    marginTop={3}
                    isDisabled={!canAddStep}
                    onClick={addEmptyStep}
                  >
                    {t("recipeFormButtonAddStep")}
                  </Button>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>{t("recipeFormLabelImage")}</FormLabel>
                  <ImageSelectButton
                    onFileSelect={(file: File) => {
                      setImage(file);
                      setError("");
                    }}
                    onError={(message: string) => {
                      setError(message);
                    }}
                  />
                </FormControl>

                <Text color="red.500">{error}</Text>

                <HStack width="100%" marginTop={10}>
                  <Button type="submit" colorScheme="green">
                    {recipe
                      ? t("recipeFormButtonEdit")
                      : t("recipeFormButtonCreate")}
                  </Button>
                  <Button onClick={() => navigate("/")}>
                    {t("recipeFormButtonCancel")}
                  </Button>
                </HStack>
              </VStack>
            </Center>
          </Box>
        </Center>
      </Box>
    </form>
  );
};

export default PageRecipeForm;
