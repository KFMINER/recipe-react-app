import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import IngredientInput from "../IngredientInput";
import ImageSelectButton from "../ImageSelectButton";
import recipeService, { Ingredient, Step } from "../../services/recipe-service";
import useRecipe from "../../hooks/useRecipe";
import StepInput from "../StepInput";
import ControlledInputCharCount from "../ControlledInputCharCount";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";

/**
 * A page component, on which the user can create a new recipe,
 * or edit an exisiting one. When called with "recipeId" as searchParam,
 * the data of the existing recipe will be loaded into the input fields.
 * @returns Recipe-Form-Page component
 * @author Kevin Friedrichs
 */
const PageRecipeForm = () => {
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { recipe, loadRecipeById, unsetRecipe } = useRecipe();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [canAddIngredient, setCanAddIngredient] = useState(false);
  const [canAddStep, setCanAddStep] = useState(false);
  const [image, setImage] = useState<File>();
  const [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  // Authentication required for this page.
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [isAuthenticated()]);

  // Check for empty ingredients and steps, so that no new input fields can be added for these while there are still empty ones.
  useEffect(() => {
    checkForEmptyIngredients();
    checkForEmptySteps();
  });

  // Load recipe by recipe-id from params or unset existing recipe if no id was set.
  // (Happens if user switches from edit-form to new-form)
  useEffect(() => {
    if (searchParams.get("recipeId")) {
      loadRecipeById(searchParams.get("recipeId")!);
    } else {
      unsetRecipe();
    }
  }, [searchParams.get("recipeId")]);

  // Fill in (or clear) input values if recipe changes.
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

  /**
   * Check if list contains empty ingredients. Can't add a new entry if empty ingredient exists.
   */
  const checkForEmptyIngredients = () => {
    setCanAddIngredient(true);
    ingredients.forEach((ingredient: Ingredient) => {
      if (ingredient.name.trim().length === 0) {
        setCanAddIngredient(false);
      }
    });
  };

  /**
   * Check if list contains empty steps. Can't add new entry if empty step exists.
   */
  const checkForEmptySteps = () => {
    setCanAddStep(true);
    steps.forEach((step: Step) => {
      if (step.text.trim().length === 0) {
        setCanAddStep(false);
      }
    });
  };

  /**
   * Add an empty ingredient to the list.
   */
  const addEmptyIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };

  /**
   * Add an empty step to the list.
   */
  const addEmptyStep = () => {
    setSteps([...steps, { id: 0, text: "" }]);
  };

  /**
   * Send formData to the backend for creation/editing and storage of the recipe.
   * Redirects to "/" for a new recipe or to the recipe page for the edited recipe.
   * @param e Event-data
   */
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

    // Edit existing recipe, or create a new one.
    if (recipe !== undefined && recipe !== null) {
      formData.append("recipeId", recipe.id.toString());
      const { request } = recipeService.update(recipe.id, formData);
      request
        .then(() => navigate(`/recipes/${recipe.id}`))
        .catch((err) => setError(err.message));
    } else {
      const { request } = recipeService.create(formData);
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
