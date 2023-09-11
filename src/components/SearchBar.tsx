import { BsSearch } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FormEvent, useRef } from "react";
import recipeService from "../services/recipe-service";
import { useNavigate } from "react-router-dom";

interface Props {
  isDisabled?: boolean;
  marginLeft?: string;
}

/**
 * A component, which acts like a Search input field.
 * @returns SearchBar component
 * @author Kevin Friedrichs
 */
const SearchBar = ({ isDisabled, marginLeft }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchRef.current) {
      navigate(`/recipes?search=${searchRef.current.value}`);
      searchRef.current.value = "";
      searchRef.current.blur();
    }
  };

  return (
    <Box w="100%" marginLeft={marginLeft}>
      <form onSubmit={handleSubmit}>
        <InputGroup size="md" bg="white" borderRadius={8}>
          <Input
            placeholder={t("searchBarPlaceholderInput")}
            variant="filled"
            borderRadius={10}
            border="1px solid lightgray"
            bg="white"
            focusBorderColor="green.500"
            isDisabled={isDisabled}
            ref={searchRef}
          />
          <InputRightElement children={<BsSearch color="gray" />} />
        </InputGroup>
      </form>
    </Box>
  );
};

export default SearchBar;
