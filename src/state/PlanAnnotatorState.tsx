import { makeAutoObservable } from "mobx";

import PageData from "../data/PageData";
import PinData from "../data/PinData";
import PointData from "../data/PointData";
import RegionData from "../data/RegionData";

class ImageAnnotatorState {
  public selectedPin: PinData | null;
  public selectedRegion: RegionData | null;
  public iconSize: number;
  public isEditing: boolean;

  constructor(public pages: PageData[]) {
    this.selectedPin = null;
    this.selectedRegion = null;
    this.iconSize = 4;
    this.isEditing = false;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  handleTap(x: number, y: number) {
    if (!this.isEditing) {
      return;
    }
    if (this.selectedPin) {
      this.selectedPin.point = new PointData(x, y);
      this.stopEditing();
    }
    if (this.selectedRegion) {
      this.selectedRegion.points.push(new PointData(x, y));
    }
  }

  clearSelected() {
    this.selectedPin = null;
    this.selectedRegion = null;
  }

  startEditing() {
    this.isEditing = true;
  }

  stopEditing() {
    this.isEditing = false;
  }

  createPin() {
    const newPin = new PinData();
    this.pins.push(newPin);
    this.selectPin(newPin);
    this.startEditing();
  }

  selectPin(pin: PinData) {
    this.clearSelected();
    this.selectedPin = pin;
  }

  selectRegion(region: RegionData) {
    this.clearSelected();
    this.selectedRegion = region;
  }

  createRegion() {
    const newRegion = new RegionData([]);
    this.regions.push(newRegion);
    this.selectRegion(newRegion);
    this.startEditing();
  }

  resetIconSize() {
    this.iconSize = 4;
  }

  incIconSize() {
    if (this.iconSize >= 7) {
      return;
    }
    this.iconSize++;
  }

  decIconSize() {
    if (this.iconSize <= 1) {
      return;
    }
    this.iconSize--;
  }
}

export default ImageAnnotatorState;
