import { makeAutoObservable } from "mobx";
import uuid from "../helpers/uuid";
import PointData from "./PointData";

export class RegionData {
  public id: string;
  constructor(
    public points: PointData[],
    public colour: string = "#2b6cb0",
    public opacity: number = 0.6
  ) {
    this.id = uuid();
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export default RegionData;
