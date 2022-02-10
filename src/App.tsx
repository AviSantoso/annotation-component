import * as React from "react";
import { observer } from "mobx-react-lite";
import { configure } from "mobx";

import { Demo } from "./PlanAnnotator";

configure({
  enforceActions: "never"
});

function App() {
  return <Demo />;
}

export default observer(App);
