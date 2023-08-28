import {
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";
import { FormEvent, useRef, useState } from "react";
import { BiSolidUser } from "react-icons/bi";
import { FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import userService from "../services/user-service";

const PageSignup = () => {
  const [error, setError] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const user = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };

    const { request, cancel } = userService.create(user);
    request
      .then(() => navigate("/login"))
      .catch((err) => setError(err.message));
  };

  return (
    <Center marginTop={10}>
      <form onSubmit={handleSubmit}>
        <VStack>
          <InputGroup>
            <Input type="text" placeholder="Username" ref={usernameRef} />
            <InputLeftElement>
              <BiSolidUser size={20} color="gray" />
            </InputLeftElement>
          </InputGroup>

          <InputGroup>
            <Input type="password" placeholder="Password" ref={passwordRef} />
            <InputLeftElement>
              <FaKey size={16} color="gray" />
            </InputLeftElement>
          </InputGroup>

          <InputGroup>
            <Input
              type="password"
              placeholder="Confirm password"
              ref={confirmPasswordRef}
            />
            <InputLeftElement>
              <FaKey size={16} color="gray" />
            </InputLeftElement>
          </InputGroup>

          <Input type="submit" value="Sign up" bg="green.400" color="white" />
        </VStack>
      </form>
    </Center>
  );
};

export default PageSignup;
