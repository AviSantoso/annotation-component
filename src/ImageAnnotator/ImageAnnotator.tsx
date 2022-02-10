import * as React from "react";
import { Box } from "@chakra-ui/react";
import { useGesture } from "@use-gesture/react";
import { observer, useLocalObservable } from "mobx-react-lite";

import ImageAnnotatorState from "./state/ImageAnnotatorState";
import TransformState from "./state/TransformState";
import SelectEntities from "./select/SelectEntities";
import EditEntity from "./edit/EditEntity";
import ImageControls from "./controls/ImageControls";
import TransformControls from "./controls/TransformControls";
import AnnotatedImage from "./AnnotatedImage";
import PinData from "./data/PinData";
import RegionData from "./data/RegionData";

interface ImageAnnotatorProps {
  src: string;
  getPins: () => PinData[];
  getRegions: () => RegionData[];
}

function ImageAnnotator({ src, getPins, getRegions }: ImageAnnotatorProps) {
  const appState = React.useMemo(() => new ImageAnnotatorState(getPins(), getRegions()), [
    getPins,
    getRegions
  ]);
  const ref = React.useRef<HTMLDivElement>(null);
  const exportRef = React.useRef<HTMLDivElement>(null);
  const { iconSize, pins, regions, isEditing, handleTap } = appState;

  const transformState = useLocalObservable(() => new TransformState());
  const { x, y, s, setDim, setCoords, setScale } = transformState;

  const bind = useGesture(
    {
      onDrag: ({ event: e, tap, delta: [dx, dy] }) => {
        e.preventDefault();
        if (isEditing) {
          const el = e.target as HTMLImageElement;
          if (el && tap) {
            const rect = el.getBoundingClientRect();
            const cx = (e as any)["clientX"];
            const cy = (e as any)["clientY"];
            if (cx && cy) {
              const x = (cx - rect.x) / rect.width;
              const y = (cy - rect.y) / rect.height;
              handleTap(x, y);
            }
          }
        } else {
          setCoords(x + dx, y + dy);
        }
      },
      onPinch: ({ delta: [d] }) => {
        if (d === 0) {
          return;
        }
        const multiplier = d > 0 ? 1.01 : 0.99;
        setScale(s * multiplier);
      },
      onWheel: ({ event, delta }) => {
        event.preventDefault();
        const d = delta[0] + delta[1];
        if (d === 0) {
          return;
        }
        const multiplier = d < 0 ? 1.1 : 0.9;
        setScale(s * multiplier);
      }
    },
    {
      eventOptions: { passive: false }
    }
  );

  return (
    <Box
      ref={ref}
      m="auto"
      mt="5vh"
      height="80vh"
      width="80vw"
      bg="#3f434c"
      overflow="hidden"
      position="relative"
      onLoad={(e) => {
        const el = e.target as HTMLDivElement;
        setDim({ width: el.clientWidth, height: el.clientHeight });
      }}
    >
      <EditEntity state={appState} />
      <ImageControls
        state={appState}
        exportRef={exportRef}
        onSave={() => alert("Saved")}
        onExit={() => alert("Exited")}
      />
      <SelectEntities state={appState} />
      <TransformControls state={transformState} />
      <AnnotatedImage
        {...bind()}
        exportRef={exportRef}
        src={src}
        pins={pins}
        regions={regions}
        iconSize={iconSize}
        style={{
          position: "relative",
          left: x + "px",
          top: y + "px",
          transform: `scale(${s})`,
          touchAction: "none"
        }}
      />
    </Box>
  );
}

export default observer(ImageAnnotator);
