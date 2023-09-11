import {
  Box,
  Divider,
  HStack,
  Link,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsFillBox2HeartFill, BsFillBoxFill } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SideNavButton from "./SideNavButton";
import { FaClipboardList, FaHome, FaPlus } from "react-icons/fa";
import UserInfo from "./UserInfo";
import SearchBar from "./SearchBar";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";

const TitleBar = () => {
  const navigate = useNavigate();
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
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
        zIndex={2}
      >
        <Box width="30px" cursor="pointer" {...getButtonProps()}>
          <MdMenu color="white" fontSize="30px" />
        </Box>

        <HStack onClick={() => navigate("/")} flexBasis="auto" cursor="pointer">
          <Box width="30px">
            <BsFillBoxFill color="white" fontSize="30px" />
          </Box>

          <Text
            fontSize="2xl"
            color="white"
            marginTop={-1}
            className="prevent-select"
          >
            Recipe<b>Box</b>
          </Text>
        </HStack>

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
          overflow: "hidden",
          whiteSpace: "nowrap",
          position: "fixed",
          left: "0",
          top: "60px",
          height: "calc(100vh - 60px)",
          zIndex: 1,
          boxShadow: "0 4px 12px 0 rgba(0,0,0,0.05)",
        }}
      >
        <VStack
          alignItems="start"
          justifyContent="space-between"
          height="100%"
          paddingX={5}
          paddingTop={7}
        >
          <VStack gap={6} width="100%">
            <SearchBar />

            <Divider />

            <SideNavButton
              icon={<FaHome />}
              label="Startseite"
              onClick={() => {
                onClose();
                navigate("/recipes");
              }}
            />

            {isAuthenticated() && (
              <SideNavButton
                icon={<FaClipboardList />}
                label="Meine Rezepte"
                onClick={() => {
                  onClose();
                  navigate(`/recipes?userId=${auth()?.id}`);
                }}
              />
            )}

            {isAuthenticated() && (
              <SideNavButton
                icon={<BsFillBox2HeartFill />}
                label="Favoriten"
                onClick={() => {
                  onClose();
                  navigate(`/recipes?favorites=true`);
                }}
              />
            )}

            {isAuthenticated() && (
              <SideNavButton
                icon={<FaPlus />}
                label="Neu..."
                onClick={() => {
                  onClose();
                  navigate("/recipeform");
                }}
              />
            )}
          </VStack>
          <VStack alignItems="start" gap={6} width="100%" paddingBottom="30px">
            <Divider />
            {isAuthenticated() && (
              <UserInfo
                color="gray.700"
                iconColor="green.500"
                marginLeft="12px"
              />
            )}
            {!isAuthenticated() && (
              <Text>
                <Link
                  color="green.500"
                  onClick={() => {
                    onClose();
                    navigate("/login");
                  }}
                >
                  Anmelden
                </Link>{" "}
                oder{" "}
                <Link
                  color="green.500"
                  onClick={() => {
                    onClose();
                    navigate("/signup");
                  }}
                >
                  Registrieren
                </Link>
              </Text>
            )}
          </VStack>
        </VStack>
      </motion.div>
    </>
  );
};

export default TitleBar;
