import React from "react";
import {
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@chakra-ui/react";
import { AlphaPicker, GithubPicker } from "react-color";
import { FaTrashAlt, FaTint, FaMapMarkerAlt } from "react-icons/fa";
import { MdOpacity } from "react-icons/md";
import { observer } from "mobx-react-lite";

import ImageAnnotatorState from "../state/ImageAnnotatorState";
import IconButtonTooltip from "../components/IconButtonTooltip";

function EditRegion({ state }: { state: ImageAnnotatorState }) {
  const { pins, selectedPin, clearSelected, startEditing } = state;

  if (!selectedPin) {
    return null;
  }

  function onDelete() {
    if (selectedPin) {
      const i = pins.findIndex((x) => x.id === selectedPin.id);
      clearSelected();
      pins.splice(i, 1);
    }
  }

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
        label="Delete Pin"
        variant="outline"
        icon={<FaTrashAlt />}
        onClick={onDelete}
      />
      <Popover placement="right">
        <PopoverTrigger>
          <IconButtonTooltip
            label="Change Pin Opacity"
            variant="outline"
            icon={<MdOpacity />}
          />
        </PopoverTrigger>
        <PopoverContent w="100%">
          <AlphaPicker
            onChange={(colour) => (selectedPin.opacity = colour.rgb.a!)}
          />
        </PopoverContent>
      </Popover>
      <Popover placement="right">
        <PopoverTrigger>
          <IconButtonTooltip
            label="Change Pin Colour"
            variant="outline"
            icon={<FaTint />}
          />
        </PopoverTrigger>
        <PopoverContent w="100%">
          <GithubPicker
            triangle="hide"
            color={selectedPin.colour}
            onChange={(colour) => (selectedPin.colour = colour.hex)}
          />
        </PopoverContent>
      </Popover>
      <IconButtonTooltip
        label="Start Editing Pin"
        variant="outline"
        icon={<FaMapMarkerAlt />}
        onClick={startEditing}
      />
    </Stack>
  );
}

export default observer(EditRegion);
