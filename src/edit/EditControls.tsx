import React from "react";
import { observer } from "mobx-react-lite";
import { CloseIcon } from "@chakra-ui/icons";
import { Stack } from "@chakra-ui/react";

import ImageAnnotatorState from "../state/ImageAnnotatorState";
import IconButtonTooltip from "../components/IconButtonTooltip";

function EditControls({ state }: { state: ImageAnnotatorState }) {
  const { stopEditing } = state;
  return (
    <Stack
      opacity={0.6}
      _hover={{ opacity: 1 }}
      bg="white"
      position="absolute"
      left={2}
      top={2}
      rounded={4}
      p={1}
      spacing={1}
      zIndex={15}
    >
      <IconButtonTooltip
        label="Stop Editing"
        variant="outline"
        icon={<CloseIcon />}
        onClick={stopEditing}
      />
    </Stack>
  );
}

export default observer(EditControls);
