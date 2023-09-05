import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

interface Props {
  onConfirm: () => void;
  onClose: () => void;
  isOpen: boolean;
}

/**
 * A component, which serves as a popup alert dialog,
 * to ask the user if he really wants to delete the current recipe.
 * @returns DeleteDialog component
 * @author Kevin Friedrichs
 */
const DeleteDialog = ({ onConfirm, isOpen, onClose }: Props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t("deleteDialogHeader")}
            </AlertDialogHeader>

            <AlertDialogBody>{t("deleteDialogBody")}</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  onClose();
                }}
              >
                {t("deleteDialogButtonCancel")}
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  onConfirm();
                }}
                ml={3}
              >
                {t("deleteDialogButtonConfirm")}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteDialog;
