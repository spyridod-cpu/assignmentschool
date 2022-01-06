const { gql } = require("apollo-server");


const typeDefs = gql`
 
type Client {
  ID: ID!
  name: String!
  surname: String!
  patronym: String!
  AFM: Int!
  AT: String!
  city: String!
  street: String!
  number: Int!
  TK: Int!
  accounts:[Account]
}
type Account{
    ID:ID!
    type: String!
    current_balance: Float!
    client: Client
}


type Query {
  clients: [Client!]!
  client(id: ID!): Client!
  accounts: [Account!]!
  account(id: ID!): Account!

}
`;
module.exports = {typeDefs};