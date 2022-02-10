import React from "react";
import {
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@chakra-ui/react";
import { AlphaPicker, GithubPicker } from "react-color";
import { FaTrashAlt, FaTint, FaCrosshairs } from "react-icons/fa";
import { MdOpacity } from "react-icons/md";

import ImageAnnotatorState from "../state/ImageAnnotatorState";
import { observer } from "mobx-react-lite";
import IconButtonTooltip from "../components/IconButtonTooltip";

function EditRegion({ state }: { state: ImageAnnotatorState }) {
  const { regions, selectedRegion, clearSelected, startEditing } = state;

  if (!selectedRegion) {
    return null;
  }

  function onDelete() {
    if (selectedRegion) {
      const i = regions.findIndex((x) => x.id === selectedRegion.id);
      clearSelected();
      regions.splice(i, 1);
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
        label="Delete Region"
        variant="outline"
        icon={<FaTrashAlt />}
        onClick={onDelete}
      />
      <Popover placement="right">
        <PopoverTrigger>
          <IconButtonTooltip
            label="Change Region Opacity"
            variant="outline"
            icon={<MdOpacity />}
          />
        </PopoverTrigger>
        <PopoverContent w="100%">
          <AlphaPicker
            onChange={(colour) => (selectedRegion.opacity = colour.rgb.a!)}
          />
        </PopoverContent>
      </Popover>
      <Popover placement="right">
        <PopoverTrigger>
          <IconButtonTooltip
            label="Change Region Colour"
            variant="outline"
            icon={<FaTint />}
          />
        </PopoverTrigger>
        <PopoverContent w="100%">
          <GithubPicker
            triangle="hide"
            color={selectedRegion.colour}
            onChange={(colour) => (selectedRegion.colour = colour.hex)}
          />
        </PopoverContent>
      </Popover>
      <IconButtonTooltip
        label="Clear Region"
        variant="outline"
        icon={<>C</>}
        onClick={() => (selectedRegion.points = [])}
      />
      <IconButtonTooltip
        label="Start Editing Region"
        variant="outline"
        icon={<FaCrosshairs />}
        onClick={startEditing}
      />
    </Stack>
  );
}

export default observer(EditRegion);
