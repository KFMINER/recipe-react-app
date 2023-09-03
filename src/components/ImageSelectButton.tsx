import { Box, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaImage } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface Props {
  onFileSelect: (file: File) => void;
}

const ImageSelectButton = ({ onFileSelect }: Props) => {
  const [fileName, setFileName] = useState<string>();
  const [isHovered, setHovered] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <label htmlFor="inputFile">
        <HStack gap={0}>
          <Box
            bg={isHovered ? "gray.200" : "gray.100"}
            cursor={isHovered ? "pointer" : "default"}
            color="gray.800"
            padding={2}
            paddingInline={4}
            borderRadius="md"
            lineHeight="1.2"
            height={10}
            width="165px"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            transitionProperty="common"
            transitionDuration="normal"
          >
            <HStack>
              <Box marginTop={0}>
                <FaImage size={20} />
              </Box>
              <Text fontSize="md" fontWeight="semibold">
                {t("imageSelectButton")}
              </Text>
            </HStack>
          </Box>
          <Box
            boxShadow="inset -1px 0px 0px 0px lightgray, inset 0px 1px 0px 0px lightgray, inset 0px -1px 0px 0px lightgray"
            marginLeft={-1}
            padding={2}
            paddingInline={4}
            borderRightRadius="md"
            display={fileName ? "block" : "none"}
          >
            <Text>{fileName}</Text>
          </Box>
        </HStack>
      </label>
      <input
        type="file"
        id="inputFile"
        accept=".png,.PNG,.jpg,.JPG,.JPEG"
        onChange={(e) => {
          const allowedTypes = ["image/jpeg", "image/png"];
          if (allowedTypes.includes(e.target.files![0].type)) {
            setFileName(e.target.files![0].name);
            onFileSelect(e.target.files![0]);
          }
        }}
      />
    </>
  );
};

export default ImageSelectButton;
