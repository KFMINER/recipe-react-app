import { Button, HStack } from "@chakra-ui/react";
import { BiSolidUser } from "react-icons/bi";
import { MdLogin } from "react-icons/md";
import { Link as ReactRouterLink } from "react-router-dom";

interface Props {
  onLogin: () => void;
  onSignup: () => void;
}

const NavLogin = ({ onLogin, onSignup }: Props) => {
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
          Login
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
          Sign Up
        </Button>
      </ReactRouterLink>
    </HStack>
  );
};

export default NavLogin;
