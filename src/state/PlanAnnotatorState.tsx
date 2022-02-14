import { makeAutoObservable } from "mobx";

import PageData from "../data/PageData";
import PlanAnnotatorPageState from './PlanAnnotatorPageState'

class PlanAnnotatorState {
    private _selectedPage: PageData | null;
    public _pageState: PlanAnnotatorPageState | null;
    public iconSize: number;

    constructor(public pages: PageData[]) {
        this._pageState = null;
        this._selectedPage = null;
        this.iconSize = 4;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    public get pageState(): PageData | null {
        return this._selectedPage;
    }

    public setSelectedPage(data: PageData | null) {
        this._selectedPage = data;
        this._pageState = data ? new PlanAnnotatorPageState(data) : null;
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

export default PlanAnnotatorState;
