import * as React from "react";
import { Box } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Document } from "react-pdf";

import samplePdf from "./sample.pdf";

import AnnotatedPage from "./AnnotatedPage";
import PageData from "./data/PageData";
import PlanAnnotatorState from "./state/PlanAnnotatorState";

interface PlanAnnotatorProps {
  src: string;
  getPages: () => PageData[];
}

function PlanAnnotator({ src, getPages }: PlanAnnotatorProps) {
  const [numPages, setNumPages] = React.useState<number>();
  const state = React.useMemo(() => new PlanAnnotatorState(getPages()), [
    getPages
  ]);
  const { iconSize, pages } = state;

  function renderPages() {
    return Array.from(new Array(numPages)).map((_, index) => {
      const pageNum = index + 1;
      const page = pages.find((x) => x.pageNum === pageNum);
      return (
        <AnnotatedPage
          key={pageNum}
          page={page}
          pageNum={pageNum}
          iconSize={iconSize}
        />
      );
    });
  }

  return (
    <Box>
      <Document
        file={samplePdf}
        onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}
      >
        {numPages ? renderPages() : "Loading..."}
      </Document>
    </Box>
  );
}

export default observer(PlanAnnotator);
