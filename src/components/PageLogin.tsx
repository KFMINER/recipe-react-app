import {
  Input,
  InputGroup,
  InputLeftElement,
  Center,
  FormControl,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";
import { FormEvent, useRef, useState } from "react";
import { BiSolidUser } from "react-icons/bi";
import { FaKey } from "react-icons/fa";
import axios from "axios";
import useSignIn from "react-auth-kit/dist/hooks/useSignIn";
import { useNavigate } from "react-router-dom";

const PageLogin = () => {
  const [isError, setError] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const user = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };
    axios
      .post("http://localhost:3000/api/users/auth", user)
      .then((res) => {
        signIn({
          token: res.data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { username: user.username },
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
        setError(true);
      });
  };

  return (
    <Center marginTop={10}>
      <form onSubmit={handleSubmit}>
        <VStack>
          <FormControl isInvalid={isError}>
            <InputGroup>
              <Input type="text" placeholder="Username" ref={usernameRef} />
              <InputLeftElement>
                <BiSolidUser size={20} color="gray" />
              </InputLeftElement>
            </InputGroup>
          </FormControl>

          <FormControl isInvalid={isError}>
            <InputGroup>
              <Input type="password" placeholder="Password" ref={passwordRef} />
              <InputLeftElement>
                <FaKey size={16} color="gray" />
              </InputLeftElement>
            </InputGroup>
            <FormErrorMessage>Invalid username or password.</FormErrorMessage>
          </FormControl>

          <Input type="submit" value="Login" bg="green.400" color="white" />
        </VStack>
      </form>
    </Center>
  );
};

export default PageLogin;
