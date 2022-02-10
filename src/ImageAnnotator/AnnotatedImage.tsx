import * as React from "react";
import * as d3 from "d3";
import { Box, Image, IconButton, BoxProps } from "@chakra-ui/react";
import { FaCrosshairs, FaMapMarkerAlt } from "react-icons/fa";
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";

import PinData from "./data/PinData";
import RegionData from "./data/RegionData";
import Dimension from "./data/Dimension";

type AnnotatedImageProps = BoxProps & {
  src: string;
  pins: PinData[];
  regions: RegionData[];
  iconSize: number;
  exportRef: React.RefObject<HTMLDivElement> | null;
};

function AnnotatedImage({
  exportRef,
  src,
  regions,
  pins,
  iconSize,
  ...props
}: AnnotatedImageProps) {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [{ height, width }, setDim] = React.useState<Dimension>({
    width: 0,
    height: 0
  });

  autorun(() => {
    function initSvg() {
      const svg = svgRef.current;
      if (!svg) {
        return;
      }
      const svgEl = d3.select(svg);
      svgEl.selectAll("*").remove();
      const group = svgEl.append("g");

      for (let i = 0; i < regions.length; i++) {
        const region = regions[i];
        const svgPoints = region.points
          .map((p) => `${p.x * width},${p.y * height}`)
          .join(" ");

        group
          .append("polygon")
          .attr("points", svgPoints)
          .attr("fill", region.colour)
          .attr("opacity", region.opacity);
      }
    }
    initSvg();
  });

  return (
    <Box ref={exportRef} position="relative" boxSizing="border-box" {...props}>
      {pins.map((pin) => {
        if (!pin.point) {
          return null;
        }
        const w = width * pin.point.x + "px";
        const h = height * pin.point.y + "px";
        return (
          <IconButton
            key={pin.id}
            rounded="full"
            aria-label=""
            left={w}
            top={h}
            transform="translate(-50%, -75%)"
            bg="transparent"
            position="absolute"
            size="lg"
            fontSize={Math.pow(2, iconSize + 1) + "px"}
            icon={<FaMapMarkerAlt />}
            zIndex={10}
            pointerEvents="none"
            color={pin.colour}
            opacity={pin.opacity}
          />
        );
      })}
      {regions.map((region) =>
        region.points.map((point) => {
          const w = width * point.x + "px";
          const h = height * point.y + "px";
          return (
            <IconButton
              key={point.id}
              rounded="full"
              aria-label=""
              left={w}
              top={h}
              transform="translate(-50%, -50%)"
              bg="transparent"
              position="absolute"
              size="sm"
              fontSize={Math.pow(2, iconSize) + "px"}
              icon={<FaCrosshairs />}
              zIndex={10}
              pointerEvents="none"
              color={region.colour}
              opacity={region.opacity}
            />
          );
        })
      )}
      <svg
        ref={svgRef}
        style={{
          position: "absolute",
          width: width,
          height: height,
          pointerEvents: "none",
          zIndex: 5
        }}
      />
      <Image
        src={src}
        maxHeight="none"
        maxWidth="none"
        onLoad={(e) => {
          const img = e.target as HTMLImageElement;
          const dim = { width: img.naturalWidth, height: img.naturalHeight };
          setDim(dim);
        }}
      />
    </Box>
  );
}

export default observer(AnnotatedImage);
