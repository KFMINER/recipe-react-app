import { Link as ReactRouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BiSolidUser } from "react-icons/bi";
import { MdLogin } from "react-icons/md";
import { Button, HStack } from "@chakra-ui/react";

interface Props {
  onLogin?: () => void;
  onSignup?: () => void;
}

/**
 * A component, on which login and submit buttons are being displayed.
 * Used in NavBar component.
 * @returns NavLogin component
 * @author Kevin Friedrichs
 */
const NavLogin = ({ onLogin, onSignup }: Props) => {
  const { t } = useTranslation();

  return (
    <HStack>
      <ReactRouterLink to="/login">
        <Button
          variant="solid"
          size="sm"
          leftIcon={<MdLogin size={20} />}
          fontSize={14}
          color="green.400"
          bg="white"
          onClick={onLogin}
        >
          {t("navLoginButtonLogin")}
        </Button>
      </ReactRouterLink>

      <ReactRouterLink to="/signup">
        <Button
          variant="solid"
          size="sm"
          leftIcon={<BiSolidUser size={20} />}
          fontSize={14}
          color="green.400"
          bg="white"
          onClick={onSignup}
        >
          {t("navLoginButtonSignup")}
        </Button>
      </ReactRouterLink>
    </HStack>
  );
};

export default NavLogin;
