import { ChangeEvent, useEffect, useRef, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";
import { Box, Button, HStack, Textarea } from "@chakra-ui/react";

interface Props {
  text: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onDelete: () => void;
}

/**
 * A component, on which the user can input a new recipe-step.
 * Also contains a button to delete the current step.
 * @returns StepInput component
 * @author Kevin Friedrichs
 */
const StepInput = ({ text, onChange, onDelete }: Props) => {
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
      <Button colorScheme="red" size="md" height="42px" onClick={onDelete}>
        <Box>
          <RiDeleteBin6Fill />
        </Box>
      </Button>
    </HStack>
  );
};

export default StepInput;
