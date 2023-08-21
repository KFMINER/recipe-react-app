import { Box, HStack, Text } from "@chakra-ui/react";
import { BsFillBoxFill } from "react-icons/bs";
import SearchBar from "./SearchBar";
import UserInfo from "./UserInfo";

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

      <UserInfo />
    </HStack>
  );
};

export default NavBar;
