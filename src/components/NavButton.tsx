import { ReactNode, useState } from "react";
import { VStack, Text, Box } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
  label: string;
  onClick: () => void;
}

/**
 * A component, which acts as a vertical icon button with text.
 * Used in NavBar component.
 * @returns NavButton component
 * @author Kevin Friedrichs
 */
const NavButton = ({ children, label, onClick }: Props) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <VStack
      spacing="0"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      bg={isHovered ? "green.300" : "transparent"}
      cursor={isHovered ? "pointer" : "default"}
      color="white"
      padding={1}
      borderRadius={5}
      width="100px"
    >
      <Box width="20px" fontSize="20px">
        {children}
      </Box>
      <Text fontSize="sm" whiteSpace="nowrap">
        {label}
      </Text>
    </VStack>
  );
};

export default NavButton;
