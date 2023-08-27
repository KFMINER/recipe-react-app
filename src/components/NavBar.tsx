import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { BsFillBox2HeartFill, BsFillBoxFill } from "react-icons/bs";
import SearchBar from "./SearchBar";
import UserInfo from "./UserInfo";
import NavButton from "./NavButton";
import { FaClipboardList, FaHome, FaPlus } from "react-icons/fa";
import NavLogin from "./NavLogin";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const auth = useAuthUser();

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

        <NavButton
          label="My Recipes"
          onClick={() => navigate(`/recipes?userId=${auth()?.id}`)}
        >
          <FaClipboardList />
        </NavButton>

        <NavButton label="Favorites" onClick={() => console.log("favorites")}>
          <BsFillBox2HeartFill />
        </NavButton>

        <NavButton label="New..." onClick={() => navigate("/newRecipe")}>
          <FaPlus />
        </NavButton>
      </HStack>

      <Flex width="400px" justifyContent="flex-end">
        {isAuthenticated() ? (
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
