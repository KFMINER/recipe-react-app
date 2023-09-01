import {
  Input,
  InputGroup,
  InputLeftElement,
  Center,
  FormControl,
  FormErrorMessage,
  VStack,
  Box,
  Text,
  Link,
} from "@chakra-ui/react";
import { FormEvent, useRef, useState } from "react";
import { BiSolidUser } from "react-icons/bi";
import { FaKey } from "react-icons/fa";
import useSignIn from "react-auth-kit/dist/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import userService, { User } from "../../services/user-service";
import { useTranslation } from "react-i18next";

const PageLogin = () => {
  const [error, setError] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const signIn = useSignIn();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!usernameRef.current?.value || !passwordRef.current?.value) {
      return;
    }
    const { request, cancel } = userService.get<User>(
      usernameRef.current!.value,
      passwordRef.current!.value
    );
    request
      .then((res) => {
        signIn({
          token: res.data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: {
            id: res.data.id,
            username: res.data.username,
          },
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  return (
    <Box bg="gray.100" minHeight="calc(100vh - 60px)">
      <Center>
        <Box
          w="500px"
          bg="white"
          marginTop={10}
          paddingY="70px"
          borderRadius={20}
        >
          <Center>
            <form onSubmit={handleSubmit}>
              <VStack gap={2}>
                <FormControl isInvalid={error}>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="Username"
                      ref={usernameRef}
                    />
                    <InputLeftElement>
                      <BiSolidUser size={20} color="gray" />
                    </InputLeftElement>
                  </InputGroup>
                </FormControl>

                <FormControl isInvalid={error}>
                  <InputGroup>
                    <Input
                      type="password"
                      placeholder="Password"
                      ref={passwordRef}
                    />
                    <InputLeftElement>
                      <FaKey size={16} color="gray" />
                    </InputLeftElement>
                  </InputGroup>
                  <FormErrorMessage>
                    Invalid username or password.
                  </FormErrorMessage>
                </FormControl>

                <Input
                  type="submit"
                  value="Login"
                  bg="green.400"
                  color="white"
                  marginTop={3}
                />
                <Text fontSize="sm">
                  Noch kein Account?{" "}
                  <Link color="green.600">Jetzt registrieren</Link>
                </Text>
              </VStack>
            </form>
          </Center>
        </Box>
      </Center>
    </Box>
  );
};

export default PageLogin;
