import * as React from "react";
import { observer } from "mobx-react-lite";
import { configure } from "mobx";

import PageData from "./data/PageData";
import PlanAnnotator from "./PlanAnnotator";

configure({
  enforceActions: "never"
});

function App() {
  const getPages = React.useCallback(() => [new PageData(1, [], [])], []);

  return (
    <PlanAnnotator
      src="https://www.anz.com.au/content/dam/anzcomau/pdf/ANZ-business-plan-template.pdf"
      getPages={getPages}
    />
  );
}

export default observer(App);
