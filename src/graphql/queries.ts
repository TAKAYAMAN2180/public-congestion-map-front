/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const fetchAllCongestions = /* GraphQL */ `
  query FetchAllCongestions {
    fetchAllCongestions {
      storeID
      congestionLevel
      editAt
      __typename
    }
  }
`;
export const fetchStoreCongestionByStoreID = /* GraphQL */ `
  query FetchStoreCongestionByStoreID($storeID: ID!) {
    fetchStoreCongestionByStoreID(storeID: $storeID) {
      storeID
      congestionLevel
      editAt
      __typename
    }
  }
`;
export const fetchStoreDeductionsByStoreID = /* GraphQL */ `
  query FetchStoreDeductionsByStoreID($storeID: ID!) {
    fetchStoreDeductionsByStoreID(storeID: $storeID) {
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
export const fetchStoreByUserID = /* GraphQL */ `
  query FetchStoreByUserID($userID: String!) {
    fetchStoreByUserID(userID: $userID) {
      storeID
      areaNum
      __typename
    }
  }
`;
export const fetchStoreByStoreID = /* GraphQL */ `
  query FetchStoreByStoreID($storeID: String!) {
    fetchStoreByStoreID(storeID: $storeID) {
      storeID
      areaNum
      __typename
    }
  }
`;
