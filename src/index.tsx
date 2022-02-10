import * as React from "react";
import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { pdfjs } from "react-pdf";
import App from "./App";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const rootElement = document.getElementById("root");

render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  rootElement
);
