import * as React from "react";
import { observer } from "mobx-react-lite";

import PageData from "../data/PageData";
import PlanAnnotator from "./PlanAnnotator";

function Demo() {
  const getPages = React.useCallback(() => [new PageData(1, [], [])], []);

  return <PlanAnnotator src="/sample.pdf" getPages={getPages} />;
}

export default observer(Demo);
