import { VStack, Text, Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { FaHome } from "react-icons/fa";

interface Props {
  children: ReactNode;
  label: string;
}

const NavButton = ({ children, label }: Props) => {
  return (
    <VStack spacing="0">
      <Box width="20px" fontSize="20px" color="white">
        {children}
      </Box>
      <Text fontSize="sm" color="white" whiteSpace="nowrap">
        {label}
      </Text>
    </VStack>
  );
};

export default NavButton;
