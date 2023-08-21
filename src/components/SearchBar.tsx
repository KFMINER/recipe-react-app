import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  return (
    <InputGroup size="md" bg="white" borderRadius={8}>
      <Input
        placeholder="Search..."
        variant="filled"
        borderRadius={8}
        bg="white"
        focusBorderColor="green.500"
      />
      <InputRightElement children={<BsSearch color="gray" />} />
    </InputGroup>
  );
};

export default SearchBar;
