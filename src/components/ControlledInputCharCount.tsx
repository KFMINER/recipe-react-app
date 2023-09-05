import { LegacyRef, useState } from "react";
import { Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";

interface Props {
  maxLength: number;
  reference?: LegacyRef<HTMLInputElement>;
  placeholder: string;
}

/**
 * A component like a text-input-field,
 * but in this component the current length of the text input is displayed.
 * @returns ControlledInputCharCount component
 * @author Kevin Friedrichs
 */
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
