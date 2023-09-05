import { BsSearch } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";

interface Props {
  isDisabled?: boolean;
}

/**
 * A component, which acts like a Search input field.
 * @returns SearchBar component
 * @author Kevin Friedrichs
 */
const SearchBar = ({ isDisabled }: Props) => {
  const { t } = useTranslation();

  return (
    <InputGroup size="md" bg="white" borderRadius={8}>
      <Input
        placeholder={t("searchBarPlaceholderInput")}
        variant="filled"
        borderRadius={8}
        bg="white"
        focusBorderColor="green.500"
        isDisabled={isDisabled}
      />
      <InputRightElement children={<BsSearch color="gray" />} />
    </InputGroup>
  );
};

export default SearchBar;
