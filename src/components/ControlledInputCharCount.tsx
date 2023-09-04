import { Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { LegacyRef, useState } from "react";

interface Props {
  maxLength: number;
  reference?: LegacyRef<HTMLInputElement>;
  placeholder: string;
}

const ControlledInputCharCount = ({
  maxLength,
  reference,
  placeholder,
}: Props) => {
  const [count, setCount] = useState(0);

  return (
    <>
      <InputGroup>
        <Input
          type="text"
          maxLength={maxLength}
          ref={reference}
          placeholder={placeholder}
          onChange={(e) => {
            setCount(e.target.value.length);
          }}
        />
        <InputRightElement width="50px">
          <Text color="gray.400">
            {count}/{maxLength}
          </Text>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default ControlledInputCharCount;
