import { useCookies } from "react-cookie";
import {
  DeductionInfoType,
  DeductionsSummaryType,
} from "@/src/lib/type/DeductionDataType";
import { Congestion as APICongestionType } from "@/src/graphql/API";
import StoresInfoType from "@/src/lib/type/StoresInfoType";

export const COOKIE_NAMES = [
  "bkc_fes_databaseValue",
  "bkc_fes_storeIndex",
] as const;
type COOKIE_NAMES_TYPE = (typeof COOKIE_NAMES)[number];

export type DatabaseValueCookieKeptType = {
  deductionsSummary: DeductionsSummaryType;
  congestion: APICongestionType;
  deductionsInfo: DeductionInfoType[];
};

export type StoreIndexCookieKeptType = {
  storeInfo: StoresInfoType;
  storeID: string;
};

type CookieType = { bkc_fes_databaseValue?: any; bkc_fes_storeIndex?: any };
