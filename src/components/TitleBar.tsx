import { Box, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SideMenu from "./SideMenu";
import Overlay from "./Overlay";
import Logo from "./Logo";

/**
 * A component which will be displayed instead of the NavBar (on small screen width).
 * Contains the Logo and and expandable side-menu for the navigation.
 * @returns TitleBar component
 * @author Kevin Friedrichs
 */
const TitleBar = () => {
  const { isOpen, getButtonProps, getDisclosureProps, onClose } =
    useDisclosure();
  const [isHidden, setHidden] = useState(!isOpen);

  return (
    <>
      <HStack
        paddingX={5}
        bg="green.400"
        height="60px"
        width="100%"
        justifyContent="space-between"
        position="sticky"
        top="0"
        zIndex={3}
      >
        <Box width="30px" cursor="pointer" {...getButtonProps()}>
          <MdMenu color="white" fontSize="30px" />
        </Box>

        <Logo />

        <Box width="30px" />
      </HStack>
      <motion.div
        {...getDisclosureProps()}
        hidden={isHidden}
        initial={false}
        onAnimationStart={() => setHidden(false)}
        onAnimationComplete={() => setHidden(!isOpen)}
        animate={{ width: isOpen ? 250 : 0 }}
        style={{
          background: "white",
          overflowX: "hidden",
          whiteSpace: "nowrap",
          position: "fixed",
          left: "0",
          top: "60px",
          height: "calc(100vh - 60px)",
          zIndex: 2,
          boxShadow: "0 4px 12px 0 rgba(0,0,0,0.05)",
        }}
      >
        <SideMenu onClose={onClose} />
      </motion.div>

      <Overlay isEnabled={isOpen} onClick={onClose} onWheel={onClose} />
    </>
  );
};

export default TitleBar;
