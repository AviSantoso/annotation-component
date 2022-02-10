import * as React from "react";
import { Box, Spinner } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Document } from "react-pdf";

import AnnotatedPage from "./AnnotatedPage";
import PageData from "../data/PageData";
import PlanAnnotatorState from "../state/PlanAnnotatorState";

function bto64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

interface PlanAnnotatorProps {
  src: string;
  getPages: () => PageData[];
}

function PlanAnnotator({ src, getPages }: PlanAnnotatorProps) {
  const [b64, setB64] = React.useState<string>();
  const [numPages, setNumPages] = React.useState<number>();
  const state = React.useMemo(() => new PlanAnnotatorState(getPages()), [
    getPages
  ]);
  const { iconSize, pages } = state;

  React.useEffect(() => {
    async function init() {
      const response = await fetch(src);
      const blob = await response.blob();
      const b64 = (await bto64(blob)) as string;
      setB64(b64);
    }
    init();
  }, [src]);

  if (!b64) {
    return (
      <Spinner
        m={4}
        thickness="4px"
        speed="0.5s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

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
      <Document file={b64} onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}>
        {numPages ? renderPages() : "Loading..."}
      </Document>
    </Box>
  );
}

export default observer(PlanAnnotator);
