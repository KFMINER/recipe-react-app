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

      <Text fontSize="2xl" color="white" marginTop={-1} marginRight={100}>
        Recipe<b>Box</b>
      </Text>

      <SearchBar />

      <HStack marginRight={100} marginLeft={10} gap="15px">
        <NavButton label="Home" onClick={() => console.log("home")}>
          <FaHome />
        </NavButton>

        <NavButton label="My Recipes" onClick={() => console.log("my recipes")}>
          <FaClipboardList />
        </NavButton>

        <NavButton label="Favorites" onClick={() => console.log("favorites")}>
          <BsFillBox2HeartFill />
        </NavButton>
      </HStack>

      <UserInfo />
    </HStack>
  );
};

export default NavBar;
