import {API, graphqlOperation} from "aws-amplify";
import * as Queries from "@/src/graphql/queries";
import {GraphQLResult} from "@aws-amplify/api-graphql";
import {
    Congestion,
    Deduction,
    FetchStoreByUserIdQuery,
    FetchStoreCongestionByStoreIDQuery,
    FetchStoreDeductionsByStoreIDQuery,
    Store
} from "@/src/API";

export const fetchStoreByUserId = async (userID: string) => {
    const response = (await API.graphql(graphqlOperation(Queries.fetchStoreByUserId, {
        userID: userID
    }))) as {
        data: FetchStoreByUserIdQuery;
    };
    return response.data.fetchStoreByUserId as Store;
}

export const fetchStoreDeductionsByStoreID = async (storeID: string) => {
    const response = (await API.graphql(graphqlOperation(Queries.fetchStoreDeductionsByStoreID, {
        storeID: storeID
    }))) as {
        data: FetchStoreDeductionsByStoreIDQuery;
    };
    return response.data.fetchStoreDeductionsByStoreID as Deduction[];
}

export const fetchStoreCongestionByStoreID = async (storeID: string) => {
    const response = (await API.graphql(graphqlOperation(Queries.fetchStoreCongestionByStoreID, {
        storeID: storeID
    }))) as {
        data: FetchStoreCongestionByStoreIDQuery;
    }

    return response.data.fetchStoreCongestionByStoreID as Congestion;
}