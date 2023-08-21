import { Box, HStack, Text } from "@chakra-ui/react";
import { BsFillBox2HeartFill, BsFillBoxFill } from "react-icons/bs";
import SearchBar from "./SearchBar";
import UserInfo from "./UserInfo";
import NavButton from "./NavButton";
import { FaClipboardList, FaHome } from "react-icons/fa";

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

      <HStack marginX={115} gap="30px">
        <NavButton label="Home">
          <FaHome />
        </NavButton>

        <NavButton label="My Recipes">
          <FaClipboardList />
        </NavButton>

        <NavButton label="Favorites">
          <BsFillBox2HeartFill />
        </NavButton>
      </HStack>

      <UserInfo />
    </HStack>
  );
};

export default NavBar;
