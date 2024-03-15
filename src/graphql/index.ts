import { queryResolvers } from "./resolvers/query";
import { mutationResolvers } from "./mutations";
export const resolvers = {
    Query: queryResolvers,
    Mutation: mutationResolvers,
};
