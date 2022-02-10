import React from "react";
import { observer } from "mobx-react-lite";

import ImageAnnotatorState from "../state/ImageAnnotatorState";
import EditControls from "./EditControls";
import EditPin from "./EditPin";
import EditRegion from "./EditRegion";

function EditEntity({ state }: { state: ImageAnnotatorState }) {
  const { isEditing, selectedPin, selectedRegion } = state;

  if (isEditing) {
    return <EditControls state={state} />;
  }
  if (selectedPin) {
    return <EditPin state={state} />;
  }
  if (selectedRegion) {
    return <EditRegion state={state} />;
  }
  return null;
}

export default observer(EditEntity);
