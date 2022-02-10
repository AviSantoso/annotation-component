import { makeAutoObservable } from "mobx";
import uuid from "../helpers/uuid";

export class PointData {
  public id: string;
  constructor(public x: number, public y: number) {
    this.id = uuid();
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export default PointData;
