import { makeAutoObservable } from "mobx";

import uuid from "../helpers/uuid";
import PointData from "./PointData";

export class PinData {
  public id: string;
  constructor(
    public point: PointData | null = null,
    public colour: string = "#2b6cb0",
    public opacity: number = 0.6
  ) {
    this.id = uuid();
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export default PinData;
