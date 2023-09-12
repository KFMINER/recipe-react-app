import { Divider, Link, VStack, Text } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import SideNavButton from "./SideNavButton";
import { FaClipboardList, FaHome, FaPlus } from "react-icons/fa";
import { BsFillBox2HeartFill } from "react-icons/bs";
import UserInfo from "./UserInfo";
import { useNavigate } from "react-router-dom";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";

interface Props {
  onClose: () => void;
}

/**
 * A component which is used as a vertical navigation menu.
 * Contains all navigation links, the searchbar, the user-info of the currently loggin in user
 * or links to login and signup pages if not logged in.
 * @returns SideMenu component
 * @author Kevin Friedrichs
 */
const SideMenu = ({ onClose }: Props) => {
  const navigate = useNavigate();
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();

  return (
    <VStack
      alignItems="start"
      justifyContent="space-between"
      height="100%"
      paddingX={5}
      paddingTop={7}
    >
      <VStack gap={6} width="100%">
        <SearchBar />

        <Divider />

        <SideNavButton
          icon={<FaHome />}
          label="Startseite"
          onClick={() => {
            onClose();
            navigate("/recipes");
          }}
        />

        {isAuthenticated() && (
          <SideNavButton
            icon={<FaClipboardList />}
            label="Meine Rezepte"
            onClick={() => {
              onClose();
              navigate(`/recipes?userId=${auth()?.id}`);
            }}
          />
        )}

        {isAuthenticated() && (
          <SideNavButton
            icon={<BsFillBox2HeartFill />}
            label="Favoriten"
            onClick={() => {
              onClose();
              navigate(`/recipes?favorites=true`);
            }}
          />
        )}

        {isAuthenticated() && (
          <SideNavButton
            icon={<FaPlus />}
            label="Neu..."
            onClick={() => {
              onClose();
              navigate("/recipeform");
            }}
          />
        )}
      </VStack>
      <VStack alignItems="start" gap={6} width="100%" paddingBottom="30px">
        <Divider />
        {isAuthenticated() && (
          <UserInfo color="gray.700" iconColor="green.500" marginLeft="12px" />
        )}
        {!isAuthenticated() && (
          <Text>
            <Link
              color="green.500"
              onClick={() => {
                onClose();
                navigate("/login");
              }}
            >
              Anmelden
            </Link>{" "}
            oder{" "}
            <Link
              color="green.500"
              onClick={() => {
                onClose();
                navigate("/signup");
              }}
            >
              Registrieren
            </Link>
          </Text>
        )}
      </VStack>
    </VStack>
  );
};

export default SideMenu;
