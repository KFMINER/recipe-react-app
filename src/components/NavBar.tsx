import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { BsFillBox2HeartFill, BsFillBoxFill } from "react-icons/bs";
import SearchBar from "./SearchBar";
import UserInfo from "./UserInfo";
import NavButton from "./NavButton";
import { FaClipboardList, FaHome, FaPlus } from "react-icons/fa";
import NavLogin from "./NavLogin";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const auth = useAuthUser();
  const { t } = useTranslation();

  return (
    <HStack paddingX={5} bg="green.400" height="60px">
      <Box width="30px">
        <BsFillBoxFill color="white" fontSize="30px" />
      </Box>

      <Text fontSize="2xl" color="white" marginTop={-1} marginRight={100}>
        Recipe<b>Box</b>
      </Text>

      <SearchBar isDisabled />

      <HStack marginX={10} gap="15px">
        <NavButton label={t("navHome")} onClick={() => navigate("/recipes")}>
          <FaHome />
        </NavButton>

        {isAuthenticated() && (
          <NavButton
            label={t("navMyRecipes")}
            onClick={() => navigate(`/recipes?userId=${auth()?.id}`)}
          >
            <FaClipboardList />
          </NavButton>
        )}

        {isAuthenticated() && (
          <NavButton
            label={t("navFavorites")}
            onClick={() => navigate(`/recipes?favorites=true`)}
          >
            <BsFillBox2HeartFill />
          </NavButton>
        )}

        {isAuthenticated() && (
          <NavButton
            label={t("navNewRecipe")}
            onClick={() => navigate("/recipeform")}
          >
            <FaPlus />
          </NavButton>
        )}
      </HStack>

      <Flex justifyContent="flex-end">
        {isAuthenticated() ? <UserInfo /> : <NavLogin />}
      </Flex>
    </HStack>
  );
};

export default NavBar;
