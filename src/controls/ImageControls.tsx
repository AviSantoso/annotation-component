import React from "react";
import { CloseIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Stack,
  HStack,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  AlertDialog
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import {
  FaDownload,
  FaSave,
  FaSortAmountDown,
  FaSortAmountUp
} from "react-icons/fa";
import html2canvas from "html2canvas";

import IconButtonTooltip from "../components/IconButtonTooltip";
import ImageAnnotatorState from "../state/ImageAnnotatorState";

function ImageControls({
  state,
  exportRef,
  onSave,
  onExit
}: {
  state: ImageAnnotatorState;
  exportRef: React.RefObject<HTMLDivElement>;
  onSave: () => void;
  onExit: () => void;
}) {
  const cancelRef = React.useRef(null);
  const {
    isOpen: dialogOpen,
    onOpen: openDialog,
    onClose: closeDialog
  } = useDisclosure();
  const { resetIconSize, decIconSize, incIconSize } = state;

  async function exportPhoto() {
    const div = exportRef.current;

    if (!div) {
      return;
    }

    const canvas = await html2canvas(div, { useCORS: true });

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "annotation.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  }

  function exit() {
    closeDialog();
    onExit();
  }

  return (
    <Stack
      opacity={0.6}
      _hover={{ opacity: 1 }}
      bg="white"
      position="absolute"
      right={2}
      top={2}
      rounded={4}
      p={1}
      spacing={1}
      zIndex={15}
    >
      <HStack spacing={1}>
        <IconButtonTooltip
          label="Export Image"
          variant="outline"
          icon={<FaDownload />}
          onClick={exportPhoto}
        />
        <IconButtonTooltip
          label="Save Image"
          aria-label="save-image"
          variant="outline"
          icon={<FaSave />}
          onClick={onSave}
        />
        <IconButtonTooltip
          label="Exit"
          variant="outline"
          icon={<CloseIcon />}
          onClick={openDialog}
        />
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={dialogOpen}
          onClose={closeDialog}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Close Image
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure? You'll lose your progress so far.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={closeDialog}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={exit} ml={3}>
                  Close
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </HStack>
      <HStack spacing={1}>
        <IconButtonTooltip
          label="Reset Icon Size"
          variant="outline"
          onClick={resetIconSize}
          icon={<RepeatIcon />}
        />
        <IconButtonTooltip
          label="Decrease Icon Size"
          variant="outline"
          icon={<FaSortAmountDown />}
          onClick={decIconSize}
        />
        <IconButtonTooltip
          label="Increase Icon Size"
          variant="outline"
          icon={<FaSortAmountUp />}
          onClick={incIconSize}
        />
      </HStack>
    </Stack>
  );
}

export default observer(ImageControls);
