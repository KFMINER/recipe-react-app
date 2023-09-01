import { Box, Button, Grid, GridItem, HStack, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useTranslation } from "react-i18next";

interface Props {
  name?: string;
  amount?: string;
  onChangeName?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeAmount?: (event: ChangeEvent<HTMLInputElement>) => void;
  onDelete?: () => void;
}

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
            onChange={onChangeName ? (e) => onChangeName(e) : () => {}}
          />
        </GridItem>

        <GridItem>
          <Input
            type="text"
            placeholder={t("ingredientInputPlaceholderAmount")}
            value={amount}
            onChange={onChangeAmount ? (e) => onChangeAmount(e) : () => {}}
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
