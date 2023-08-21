import { Button, HStack, Text, Link } from "@chakra-ui/react";
import { BiSolidUser } from "react-icons/bi";
import { MdLogin } from "react-icons/md";

interface Props {
  onLogin: () => void;
  onSignup: () => void;
}

const NavLogin = ({ onLogin, onSignup }: Props) => {
  return (
    <HStack>
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
    </HStack>
  );
};

export default NavLogin;
