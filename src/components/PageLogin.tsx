import { Button } from "@chakra-ui/button";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Center,
} from "@chakra-ui/react";
import { FormEvent, useRef } from "react";
import { BiSolidUser } from "react-icons/bi";
import { FaKey } from "react-icons/fa";

const PageLogin = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(usernameRef.current?.value + " " + passwordRef.current?.value);
  };

  return (
    <Center marginTop={10}>
      <form onSubmit={handleSubmit}>
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

        <Input type="submit" value="submit" bg="green.400" color="white" />
      </form>
    </Center>
  );
};

export default PageLogin;
