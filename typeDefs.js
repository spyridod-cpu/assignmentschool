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
  eBanking:eBanking
  phone_numbers:[Phone_numbers]
  
  
}


type Account{
    ID:ID!
    type: String!
    current_balance: Float!
    client: Client
    credits:[Credit]
    movements:[Movement]
}


type Credit{
  ID: ID!
  PIN: Int!
  expiry_date: String!
  accounts:[Account]
}

type eBanking{
  ID: ID!
  username: String!
  password: String!
  email: String!
  client: Client!
}

type Employee{
  ID: ID!
  name: String!
  surname: String!
  phone_number: String!
  city: String!
  street: String!
  number: Int!
  TK: Int!

}
type Movement{
  ID :ID!
  type: String!
  date: String!
  amount: Float!
  account: Account!
}

type Phone_numbers{
  phone_number:String!
  client: Client!

}





type Query {
  clients: [Client!]!
  client(id: ID!): Client!
  accounts: [Account!]!
  account(id: ID!): Account!
  credits: [Credit!]!
  credit(id:ID!): Credit!
  eBankings: [eBanking!]!
  eBanking (id: ID!): eBanking!
  employees:[Employee]
  employee(id:ID!): Employee
  movements: [Movement]
  movement(id:ID!): Movement!
  
}


type Mutation {
  createClient (
  ID:ID!
  name: String!
  surname: String!
  patronym: String!
  AFM: Int!
  AT: String!
  city: String!
  street: String!
  number: Int!
  TK: Int!
  ):Client

  createEmployee(
    ID:ID!
    name:String!
    surname:String!
    phone_number:String!
    city:String!
    street:String!
    number:Int!
    TK:Int!
  ):Employee

  createeBanking(
  ID: ID!
  username: String!
  password: String!
  email: String!
  client_id:ID!
  ):eBanking


  createAccount(
    ID:ID!
    type: String!
    current_balance: Float!
    client_id:ID!
  ):Account


  createMovement(
    ID: ID!
    type: String!
    date: String!
    amount: Float!
    account_id: ID!
  ):Movement

  createCredit(
    ID: ID!
    PIN: Int!
    expiry_date: String!
  ):Credit

    createLink(
      account_id: ID!
      credit_id: ID!
    ):Credit

    createPhoneForClient(
      phone_number:String!
      client_id:ID!
    ):Client

    updateClient(
      ID:ID
      name: String
      surname: String
      patronym: String
      AFM: Int
      AT: String
      city: String
      street: String
      number: Int
      TK: Int

    ):Client

    updateAccount(
      ID:ID!
      type: String
      current_balance: Float
    ):Account



    updateCredit(
    ID: ID!
    PIN: Int
    expiry_date: String
    ):Credit

    updateeBanking(
      ID:ID!
      username: String
      password: String
      email: String
    ):eBanking



    updateEmployee(
    ID: ID!
    name: String
    surname: String
    phone_number: String
    city: String
    street: String
    number: Int
    TK: Int
    ):Employee


    updateMovement (
      ID :ID!
      type: String
      date: String
      amount: Float
    ):Movement




    updatePhone_numbers(
      ID:ID!
      phone_number:String!
      CLIENT_ID:ID
    ):Phone_numbers






}

`;
module.exports = {typeDefs};