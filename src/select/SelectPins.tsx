import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { FaMapMarkerAlt } from "react-icons/fa";

import ImageAnnotatorState from "../state/ImageAnnotatorState";
import IconButtonTooltip from "../components/IconButtonTooltip";

function SelectPins({ state }: { state: ImageAnnotatorState }) {
  const { pins, selectPin, createPin } = state;
  return (
    <HStack bg="white" spacing={1}>
      <IconButtonTooltip
        label="Show Pins"
        variant="outline"
        icon={<FaMapMarkerAlt />}
      />
      {pins.map((pin, i) => (
        <IconButtonTooltip
          label={"Select Pin " + (i + 1)}
          key={pin.id}
          bg={pin.colour}
          color="white"
          icon={<>{i + 1}</>}
          onClick={() => selectPin(pin)}
        />
      ))}
      {pins.length < 9 && (
        <IconButtonTooltip
          label="Create Pin"
          icon={<AddIcon />}
          onClick={createPin}
        />
      )}
    </HStack>
  );
}

export default observer(SelectPins);
