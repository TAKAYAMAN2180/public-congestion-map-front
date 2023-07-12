/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CongestionInput = {
  storeID: string,
  congestionLevel: number,
  editAt: string,
};

export type Congestion = {
  __typename: "Congestion",
  storeID: string,
  congestionLevel: number,
  editAt: number,
};

export type DeductionInput = {
  storeID: string,
  deductionID: string,
  deductionIndex: number,
  createdAt: number,
};

export type Deduction = {
  __typename: "Deduction",
  storeID: string,
  deductionID: string,
  deductionIndex: number,
  status: number,
  createdAt: string,
  editAt: string,
};

export type Store = {
  __typename: "Store",
  storeID: string,
  areaNum: number,
};

export type UpdateCongestionMutationVariables = {
  input: CongestionInput,
};

export type UpdateCongestionMutation = {
  updateCongestion:  {
    __typename: "Congestion",
    storeID: string,
    congestionLevel: number,
    editAt: number,
  },
};

export type CreateDeductionMutationVariables = {
  input: DeductionInput,
};

export type CreateDeductionMutation = {
  createDeduction:  {
    __typename: "Deduction",
    storeID: string,
    deductionID: string,
    deductionIndex: number,
    status: number,
    createdAt: string,
    editAt: string,
  },
};

export type UpdateDeductionMutationVariables = {
  input: DeductionInput,
};

export type UpdateDeductionMutation = {
  updateDeduction:  {
    __typename: "Deduction",
    storeID: string,
    deductionID: string,
    deductionIndex: number,
    status: number,
    createdAt: string,
    editAt: string,
  },
};

export type FetchAllCongestionsQuery = {
  fetchAllCongestions:  Array< {
    __typename: "Congestion",
    storeID: string,
    congestionLevel: number,
    editAt: number,
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
    editAt: number,
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
    createdAt: string,
    editAt: string,
  } | null >,
};

export type FetchStoreByUserIdQueryVariables = {
  userID: string,
};

export type FetchStoreByUserIdQuery = {
  fetchStoreByUserId:  {
    __typename: "Store",
    storeID: string,
    areaNum: number,
  },
};
