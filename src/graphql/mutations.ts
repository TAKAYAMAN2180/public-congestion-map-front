/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateCongestion = /* GraphQL */ `
  mutation UpdateCongestion($input: CongestionInput!) {
    updateCongestion(input: $input) {
      storeID
      congestionLevel
      editAt
      __typename
    }
  }
`;
export const createDeduction = /* GraphQL */ `
  mutation CreateDeduction($input: DeductionInput!) {
    createDeduction(input: $input) {
      storeID
      deductionID
      deductionIndex
      status
      createdAt
      editAt
      __typename
    }
  }
`;
export const updateDeduction = /* GraphQL */ `
  mutation UpdateDeduction($input: DeductionInput!) {
    updateDeduction(input: $input) {
      storeID
      deductionID
      deductionIndex
      status
      createdAt
      editAt
      __typename
    }
  }
`;
