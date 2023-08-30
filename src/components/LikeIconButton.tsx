import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

interface Props {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  active: boolean;
}

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
