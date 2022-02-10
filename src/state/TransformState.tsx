import _ from "lodash";
import { makeAutoObservable } from "mobx";

import Transform from "../data/Transform";
import Dimension from "../data/Dimension";

class TransformState {
  public x: number;
  public y: number;
  public s: number;

  private minScale: number;
  private maxScale: number;
  private zoomMult = 1.5;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.s = 1;
    this.minScale = 0.5;
    this.maxScale = 2;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setTransform(transform: Partial<Transform>) {
    this.x = transform.x ?? this.x;
    this.y = transform.y ?? this.y;
    this.s = transform.s ?? this.s;
  }

  resetTransform() {
    this.setTransform({ x: 0, y: 0, s: 1 });
  }

  setDim(dim: Dimension) {
    this.maxScale = Math.max(dim.width, dim.height) / 200;
  }

  setCoords(x: number, y: number) {
    // Can use for min max later
    this.setTransform({ x, y });
  }

  setScale(s: number) {
    // Need to find middle of image and then average it out
    // When zooming out
    // if (rScale < state.scale) {
    //   const x = (state.x + middle of image) / 2
    //   const y = (state.y + middle of image) / 2
    //   setCoords(x, y);
    // }

    this.setTransform({
      s: _.clamp(s, this.minScale, this.maxScale)
    });
  }

  zoomIn() {
    this.setScale(this.s * this.zoomMult);
  }

  zoomOut() {
    this.setScale(this.s / this.zoomMult);
  }
}

export default TransformState;
