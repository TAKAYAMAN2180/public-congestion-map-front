import {atom} from "recoil";
import StorePaneType from "@/src/lib/type/StorePaneType";
import SpecialMarkPaneType from "@/src/lib/type/SpecialMarkPaneType";

export type AtomPaneStateType = {
    paneKindState: PaneKindStateEnum;

    // 数字が0ならCLOSEで、1以上なら店舗の区画番号、-1以下ならSpecialMark
    identifier: number | SpecialMarkKindEnum;

    //TODO: SpecialMark側の型も用意する
    info: StorePaneType | SpecialMarkPaneType | null;
}

export enum PaneKindStateEnum {
    CLOSE = 0,
    STORE_PANE = 1,
    SPECIAL_MARK = -1,
}

export enum SpecialMarkKindEnum {
    CENTRAL_STAGE = -1,
    BEING_STAGE = -2,
    LOTTERY = -3,
    FREE_MARKET = -4,
    BUS_STOP = -5,
    INFO_CENTER = -6,
    VOTING_STATION=-7,
    LOUNGE_UNION=-8,
    LOUNGE_LINK=-9,
    LOUNGE_COLEARNING=-10

}


export const atomPaneState = atom<AtomPaneStateType>({
    key: 'paneState',
    default: {
        paneKindState: PaneKindStateEnum.CLOSE,
        identifier: 0,
        info: null
    },
});

