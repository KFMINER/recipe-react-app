import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { BsFillBox2HeartFill, BsFillBoxFill } from "react-icons/bs";
import SearchBar from "./SearchBar";
import UserInfo from "./UserInfo";
import NavButton from "./NavButton";
import { FaClipboardList, FaHome } from "react-icons/fa";
import NavLogin from "./NavLogin";

interface Props {
  isLoggedIn: boolean;
}

const NavBar = ({ isLoggedIn = false }: Props) => {
  return (
    <HStack paddingX={5} bg="green.400" height="60px">
      <Box width="30px">
        <BsFillBoxFill color="white" fontSize="30px" />
      </Box>

      <Text fontSize="2xl" color="white" marginTop={-1} marginRight={100}>
        Recipe<b>Box</b>
      </Text>

      <SearchBar />

      <HStack marginX={10} gap="15px">
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

      <Flex width="400px" justifyContent="flex-end">
        {isLoggedIn ? (
          <UserInfo />
        ) : (
          <NavLogin
            onLogin={() => console.log("login")}
            onSignup={() => console.log("signup")}
          />
        )}
      </Flex>
    </HStack>
  );
};

export default NavBar;
