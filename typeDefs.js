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
    credits:[Credit]
}


type Credit{
  ID: ID!
  PIN: Int!
  expiry_date: String!
  accounts:[Account]
}


type Query {
  clients: [Client!]!
  client(id: ID!): Client!
  accounts: [Account!]!
  account(id: ID!): Account!
  credits: [Credit!]!
  credit(id:ID!): Credit!

}
`;
module.exports = {typeDefs};