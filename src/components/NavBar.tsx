import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { BsFillBoxFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import SearchBar from "./SearchBar";

const NavBar = () => {
  return (
    <HStack paddingX={5} bg="green.400" height="60px">
      <Box width="30px">
        <BsFillBoxFill color="white" fontSize="30px" />
      </Box>

      <Text fontSize="2xl" color="white" marginTop={-1}>
        Recipe<b>Box</b>
      </Text>

      <SearchBar />

      <Box width="30px" marginLeft={5}>
        <FaUserCircle color="white" fontSize="30px" />
      </Box>
      <Text color="white" marginTop={-1}>
        KFMINER
      </Text>
    </HStack>
  );
};

export default NavBar;
