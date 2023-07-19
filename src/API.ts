/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CongestionInput = {
  storeID: string,
  congestionLevel: number,
};

export type Congestion = {
  __typename: "Congestion",
  storeID: string,
  congestionLevel: number,
  editAt: string,
};

export type DeductionInput = {
  storeID: string,
  deductionIndex: number,
  status: number,
};

export type Deduction = {
  __typename: "Deduction",
  storeID: string,
  deductionID: string,
  deductionIndex: number,
  status: number,
  createAt: string,
  editAt: string,
};

export type Store = {
  __typename: "Store",
  storeID: string,
  areaNum: number,
};

export type UpdateStoreCongestionByStoreIDMutationVariables = {
  input: CongestionInput,
};

export type UpdateStoreCongestionByStoreIDMutation = {
  updateStoreCongestionByStoreID?:  {
    __typename: "Congestion",
    storeID: string,
    congestionLevel: number,
    editAt: string,
  } | null,
};

export type CreateStoreDeductionMutationVariables = {
  input: DeductionInput,
};

export type CreateStoreDeductionMutation = {
  createStoreDeduction?:  {
    __typename: "Deduction",
    storeID: string,
    deductionID: string,
    deductionIndex: number,
    status: number,
    createAt: string,
    editAt: string,
  } | null,
};

export type UpdateStoreDeductionMutationVariables = {
  input: DeductionInput,
};

export type UpdateStoreDeductionMutation = {
  updateStoreDeduction:  {
    __typename: "Deduction",
    storeID: string,
    deductionID: string,
    deductionIndex: number,
    status: number,
    createAt: string,
    editAt: string,
  },
};

export type FetchAllCongestionsQuery = {
  fetchAllCongestions:  Array< {
    __typename: "Congestion",
    storeID: string,
    congestionLevel: number,
    editAt: string,
  } >,
};

export type FetchStoreCongestionByStoreIDQueryVariables = {
  storeID: string,
};

export type FetchStoreCongestionByStoreIDQuery = {
  fetchStoreCongestionByStoreID?:  {
    __typename: "Congestion",
    storeID: string,
    congestionLevel: number,
    editAt: string,
  } | null,
};

export type FetchStoreDeductionsByStoreIDQueryVariables = {
  storeID: string,
};

export type FetchStoreDeductionsByStoreIDQuery = {
  fetchStoreDeductionsByStoreID:  Array< {
    __typename: "Deduction",
    storeID: string,
    deductionID: string,
    deductionIndex: number,
    status: number,
    createAt: string,
    editAt: string,
  } | null >,
};

export type FetchStoreByUserIDQueryVariables = {
  userID: string,
};

export type FetchStoreByUserIDQuery = {
  fetchStoreByUserID:  {
    __typename: "Store",
    storeID: string,
    areaNum: number,
  },
};

export type FetchStoreByStoreIDQueryVariables = {
  storeID: string,
};

export type FetchStoreByStoreIDQuery = {
  fetchStoreByStoreID?:  {
    __typename: "Store",
    storeID: string,
    areaNum: number,
  } | null,
};
