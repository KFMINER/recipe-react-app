import { Box } from "@chakra-ui/react";
import React from "react";

interface Props {
  onClick: () => void;
  onWheel: () => void;
  isEnabled: boolean;
}

const Overlay = ({ onClick, onWheel, isEnabled = false }: Props) => {
  return (
    <Box
      width="100%"
      height="calc(100vh - 60px)"
      bg="rgba(0,0,0,0.7)"
      position="fixed"
      zIndex={1}
      onClick={onClick}
      onWheel={onWheel}
      display={isEnabled ? "block" : "none"}
    />
  );
};

export default Overlay;
