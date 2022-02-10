import { makeAutoObservable } from "mobx";

import uuid from "../helpers/uuid";
import PinData from "./PinData";
import RegionData from "./RegionData";

export class PageData {
  public id: string;
  constructor(
    public pageNum: number,
    public pins: PinData[],
    public regions: RegionData[]
  ) {
    this.id = uuid();
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export default PageData;
