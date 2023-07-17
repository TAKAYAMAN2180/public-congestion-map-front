/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateStoreCongestionByStoreID = /* GraphQL */ `
  mutation UpdateStoreCongestionByStoreID($input: CongestionInput!) {
    updateStoreCongestionByStoreID(input: $input) {
      storeID
      congestionLevel
      editAt
      __typename
    }
  }
`;
export const createStoreDeduction = /* GraphQL */ `
  mutation CreateStoreDeduction($input: DeductionInput!) {
    createStoreDeduction(input: $input) {
      storeID
      deductionID
      deductionIndex
      status
      createAt
      editAt
      __typename
    }
  }
`;
export const updateStoreDeduction = /* GraphQL */ `
  mutation UpdateStoreDeduction($input: DeductionInput!) {
    updateStoreDeduction(input: $input) {
      storeID
      deductionID
      deductionIndex
      status
      createAt
      editAt
      __typename
    }
  }
`;
