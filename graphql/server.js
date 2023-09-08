const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const userTypeDefs = require('./schemas/userTypeDefs');
const userResolver = require('./resolvers/userResolver');


// Combine schemas and resolvers
const typeDefs = mergeTypeDefs([userTypeDefs]);
const resolvers = mergeResolvers([userResolver]);

module.exports = { typeDefs, resolvers };
