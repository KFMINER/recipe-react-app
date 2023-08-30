import { Box, Button, HStack, Textarea } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";

interface Props {
  text: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const StepInput = ({ text, onChange }: Props) => {
  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  useEffect(() => {
    setValue(text);
  }, []);

  return (
    <HStack alignItems="top">
      <Textarea
        ref={textAreaRef}
        value={value}
        resize="none"
        overflow="hidden"
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e);
        }}
      />
      <Button colorScheme="red" size="md" height="42px">
        <Box>
          <RiDeleteBin6Fill />
        </Box>
      </Button>
    </HStack>
  );
};

export default StepInput;
