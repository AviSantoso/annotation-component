import React from "react";
import { observer } from "mobx-react-lite";
import { RepeatIcon, MinusIcon, AddIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/react";

import IconButtonTooltip from "../components/IconButtonTooltip";
import TransformState from "../state/TransformState";

function TransformControls({ state }: { state: TransformState }) {
  const { zoomIn, zoomOut, resetTransform } = state;

  return (
    <HStack
      opacity={0.6}
      _hover={{ opacity: 1 }}
      bg="white"
      position="absolute"
      bottom={2}
      right={2}
      rounded={4}
      p={1}
      spacing={1}
      zIndex={15}
    >
      <IconButtonTooltip
        label="Reset"
        colorScheme="blue"
        icon={<RepeatIcon />}
        onClick={resetTransform}
      />
      <IconButtonTooltip
        label="Zoom Out"
        colorScheme="blue"
        icon={<MinusIcon />}
        onClick={zoomOut}
      />
      <IconButtonTooltip
        label="Zoom In"
        colorScheme="blue"
        icon={<AddIcon />}
        onClick={zoomIn}
      />
    </HStack>
  );
}

export default observer(TransformControls);
