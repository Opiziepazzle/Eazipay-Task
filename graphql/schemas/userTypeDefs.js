// graphql/schemas/productSchema.js
const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type Product {
    _id: ID!
    name: String!
    price: Float!
    description: String
  }

  input ProductInput {
    name: String!
    price: Float!
    description: String
  }

  extend type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  extend type Mutation {
    createProduct(input: ProductInput!): Product!
    updateProduct(id: ID!, input: ProductInput!): Product!
    deleteProduct(id: ID!): Product!
  }
`;

module.exports = userTypeDefs;
