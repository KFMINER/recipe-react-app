import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { Box } from "@chakra-ui/react";

interface Props {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  active: boolean;
}

/**
 * A component, which acts as a simple icon-button without text.
 * @returns LikeIconButton component
 * @author Kevin Friedrichs
 */
const LikeIconButton = ({
  onMouseEnter,
  onMouseLeave,
  onClick,
  active,
}: Props) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <Box
      fontSize="22px"
      cursor={isHovered ? "pointer" : "default"}
      color={isHovered || active ? "red.400" : "inherit"}
      transitionProperty="common"
      transitionDuration="fast"
      onMouseEnter={() => {
        onMouseEnter();
        setHovered(true);
      }}
      onMouseLeave={() => {
        onMouseLeave();
        setHovered(false);
      }}
      onClick={onClick}
    >
      {active ? <BsHeartFill /> : <BsHeart />}
    </Box>
  );
};

export default LikeIconButton;
