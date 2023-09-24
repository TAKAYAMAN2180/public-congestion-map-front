enum DeductionStatusEnum {
    // 0→処理中、1→取り消し、2→注意、3→減点
    PROCESS = 0,
    CANCEL = 1,
    ATTENTION = 2,
    DEDUCTION = 3
}

export type DeductionsSummaryType = {
    attentionTimes: number;
    deductionPoints: number;
}

export type DeductionInfoType = {
    index: number;
    points: number;
    content: string;
    status: DeductionStatusEnum;
}

const getDeductionStatusStr = (deductionStatusEnum: DeductionStatusEnum) => {
    let returnStr: string = "";
    switch (deductionStatusEnum) {
        case DeductionStatusEnum.PROCESS:
            returnStr = "処理中";
            break;
        case DeductionStatusEnum.CANCEL:
            returnStr = "取り消し";
            break;
        case DeductionStatusEnum.ATTENTION:
            returnStr = "注意";
            break;
        case DeductionStatusEnum.DEDUCTION:
            returnStr = "減点";
            break;
    }
    return returnStr;
}

export {
    DeductionStatusEnum,
    getDeductionStatusStr
}