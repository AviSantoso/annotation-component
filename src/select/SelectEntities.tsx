import React from "react";
import { Stack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

import ImageAnnotatorState from "../state/ImageAnnotatorState";
import SelectRegions from "./SelectRegions";
import SelectPins from "./SelectPins";

function SelectEntities({ state }: { state: ImageAnnotatorState }) {
  return (
    <Stack
      opacity={0.6}
      _hover={{ opacity: 1 }}
      bg="white"
      position="absolute"
      left={2}
      bottom={2}
      rounded={4}
      p={1}
      spacing={1}
      zIndex={15}
    >
      <SelectPins state={state} />
      <SelectRegions state={state} />
    </Stack>
  );
}

export default observer(SelectEntities);
