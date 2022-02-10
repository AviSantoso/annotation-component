import * as React from "react";
import { observer } from "mobx-react-lite";

import PinData from "../data/PinData";
import RegionData from "../data/RegionData";
import PointData from "../data/PointData";
import ImageAnnotator from "./ImageAnnotator";

function Demo() {
  const getPins = React.useCallback(
    () => [new PinData(new PointData(0.1, 0.1))],
    []
  );
  const getRegions = React.useCallback(
    () => [
      new RegionData([
        new PointData(0.2, 0.2),
        new PointData(0.3, 0.2),
        new PointData(0.3, 0.3),
        new PointData(0.2, 0.3)
      ])
    ],
    []
  );
  return (
    <ImageAnnotator
      src="https://i.imgur.com/jjjgolC.jpeg"
      getPins={getPins}
      getRegions={getRegions}
    />
  );
}

export default observer(Demo);
