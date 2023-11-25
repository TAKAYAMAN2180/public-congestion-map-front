export type CongestionDataType = {
  areaNum: number;
  congestionLevel: CongestionStatusEnum;
  updatedAt: number;
};

export enum CongestionStatusEnum {
  STOP = 0,
  EMPTY = 1,
  LITTLE_CROWDED = 2,
  CROWDED = 3,
}

export const getCongestionStatusStr = (
  congestionStatusEnum: CongestionStatusEnum,
) => {
  let returnStr = "";
  switch (congestionStatusEnum) {
    case CongestionStatusEnum.STOP:
      returnStr = "中止しています";
      break;
    case CongestionStatusEnum.EMPTY:
      returnStr = "空いています";
      break;
    case CongestionStatusEnum.LITTLE_CROWDED:
      returnStr = "少し混雑しています";
      break;
    case CongestionStatusEnum.CROWDED:
      returnStr = "混雑しています";
      break;
    default:
      returnStr = "混雑状況にエラーが発生しています";
      break;
  }
  return returnStr;
};
