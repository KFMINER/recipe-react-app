import { ChangeEvent } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { Box, Button, Grid, GridItem, HStack, Input } from "@chakra-ui/react";

interface Props {
  name?: string;
  amount?: string;
  onChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeAmount: (event: ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
}

/**
 * A component, on which the user can input a new ingredient.
 * An Ingredient consists of a name and an amount.
 * Also this component contains a button to delete the current ingredient.
 * @returns IngredientInput component
 * @author Kevin Friedrichs
 */
const IngredientInput = ({
  name,
  amount,
  onChangeName,
  onChangeAmount,
  onDelete,
}: Props) => {
  const { t } = useTranslation();

  return (
    <HStack>
      <Grid width="100%" templateColumns={"3fr 1fr"} gap={2}>
        <GridItem>
          <Input
            type="text"
            placeholder={t("ingredientInputPlaceholderName")}
            value={name}
            onChange={onChangeName}
          />
        </GridItem>

        <GridItem>
          <Input
            type="text"
            placeholder={t("ingredientInputPlaceholderAmount")}
            value={amount}
            onChange={onChangeAmount}
          />
        </GridItem>
      </Grid>
      <Button colorScheme="red" size="md" onClick={onDelete}>
        <Box>
          <RiDeleteBin6Fill />
        </Box>
      </Button>
    </HStack>
  );
};

export default IngredientInput;
