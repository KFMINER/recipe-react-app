import { useNavigate } from "react-router-dom";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import { FaClipboardList, FaHome, FaPlus } from "react-icons/fa";
import { BsFillBox2HeartFill } from "react-icons/bs";
import SearchBar from "./SearchBar";
import UserInfo from "./UserInfo";
import NavButton from "./NavButton";
import NavLogin from "./NavLogin";
import { Flex, HStack } from "@chakra-ui/react";
import Logo from "./Logo";

/**
 * A component, which serves as a Navigation Bar.
 * Contains a Logo, a SearchBar, NavButtons and the UserInfo, or signup and login buttons.
 * @returns NavBar component
 * @author Kevin Friedrichs
 */
const NavBar = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const auth = useAuthUser();
  const { t } = useTranslation();

  return (
    <HStack paddingX={5} bg="green.400" height="60px">
      <Logo />

      <SearchBar marginLeft="80px" />

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
        {isAuthenticated() ? (
          <UserInfo color="white" iconColor="white" />
        ) : (
          <NavLogin />
        )}
      </Flex>
    </HStack>
  );
};

export default NavBar;
