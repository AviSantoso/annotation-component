import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { FaLayerGroup } from "react-icons/fa";

import ImageAnnotatorState from "../state/ImageAnnotatorState";
import IconButtonTooltip from "../components/IconButtonTooltip";

function SelectRegions({ state }: { state: ImageAnnotatorState }) {
  const { regions, selectRegion, createRegion } = state;

  return (
    <HStack bg="white" spacing={1}>
      <IconButtonTooltip
        label="Show Regions"
        variant="outline"
        icon={<FaLayerGroup />}
      />
      {regions.map((region, i) => (
        <IconButtonTooltip
          label={"Select Region " + (i + 1)}
          key={region.id}
          bg={region.colour}
          color="white"
          icon={<>{i + 1}</>}
          onClick={() => selectRegion(region)}
        />
      ))}
      {regions.length < 9 && (
        <IconButtonTooltip
          label="Create Region"
          icon={<AddIcon />}
          onClick={createRegion}
        />
      )}
    </HStack>
  );
}

export default observer(SelectRegions);
