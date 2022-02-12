const { gql } = require("apollo-server");

//type definitions for graphql schema.
const typeDefs = gql`
 """
 A client of the bank.
 """
type Client {
  #id of client
  ID: ID!
  #name of client
  name: String!
  #surname of client
  surname: String!
  #patronym of client
  patronym: String!
  #ΑΦΜ of client
  AFM: Int!
  #ΑΤ Client
  AT: String!
  #the city in which the client resides
  city: String!
  #the adress of the client
  street: String!
  number: Int!
  TK: Int!
  #accounts that this client owns
  accounts:[Account]
  #eBanking account that this client owns
  eBanking:eBanking
  #phone_numbers that this client owns
  phone_numbers:[Phone_numbers]
  
  
}


type Account{
  #id of an account
    ID:ID!
    #type of an account
    type: String!
    #funds currently in an account
    current_balance: Float!
    #client who owns the account
    client: Client
    #credit cards that this account is linked to
    credits:[Credit]
    #movements of funds that this account took part in
    movements:[Movement]
}

#A credit card in the database.
type Credit{
  #id of the credit card
  ID: ID!
  #PIN of the credit card to gain access.
  PIN: Int!
  #expiry date of the credit card
  expiry_date: String!
  #accounts that this credit card is linked to
  accounts:[Account]
}
#eBanking account in the database
type eBanking{
  #id of the account
  ID: ID!
  #username that is used to log in
  username: String!
  #password that is used to log in
  password: String!
  #email associated with the account
  email: String!
  #client who owns the account
  client: Client!
}
#An employee of the bank
type Employee{
  #id number of the employee
  ID: ID!
  #name of the employee
  name: String!
  #surname of the employee
  surname: String!
  #A phone number of the employee
  phone_number: String!
  #City in which the employee resides
  city: String!
  #adress of the employee
  street: String!
  number: Int!
  TK: Int!

}
#movement of funds from and to an account
type Movement{
  #id of a movement
  ID: ID!
  #type of a movement (to and from)
  type: String!
  #date that the movement took place
  date: String!
  #amount of funds transfered
  amount: Float!
  #account that took part in the movement
  account: Account!
}
# Phone numbers of a client
type Phone_numbers{
  #the actual phone number
  phone_number:String!
  #the client to which it belongs to
  client: Client!

}




#root type Query, used to fetch data for all entities.
type Query {
  #returns all clients in the database.
  clients: [Client!]!
  #returns a client by id
  client(id: ID!): Client!
  #returns all accounts in the database
  accounts: [Account!]!
  #returns an account by id
  account(id: ID!): Account!
  #returns all credit cards in the database
  credits: [Credit!]!
  #returns a credit card by id
  credit(id:ID!): Credit!
  #returns all eBanking accounts in the database
  eBankings: [eBanking!]!
  #returns an eBanking account by id
  eBanking (id: ID!): eBanking!
  #returns all employees in the database
  employees:[Employee]
  #retuns an employee by id
  employee(id:ID!): Employee
  #returns all movements in the database
  movements: [Movement]
  #returns a movement by id
  movement(id:ID!): Movement!
  
}

#Root type mutation, used to insert or update data in the database
type Mutation {
  #inserts a new client in the database, returns said client.
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
  #inserts a new Employee in the database, returns said Employee
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
#inserts a new eBanking account in the database, returns said account.
  createeBanking(
  ID: ID!
  username: String!
  password: String!
  email: String!
  client_id:ID!
  ):eBanking

#inserts a new Account in the database, returns said account.
  createAccount(
    ID:ID!
    type: String!
    current_balance: Float!
    client_id:ID!
  ):Account

#inserts a new movement in the database, returns said movement.
  createMovement(
    ID: ID!
    type: String!
    date: String!
    amount: Float!
    account_id: ID!
  ):Movement
#inserts a credit card in the database, returns said credit card.
  createCredit(
    ID: ID!
    PIN: Int!
    expiry_date: String!
  ):Credit
#inserts a Link between an account and a credit card in the database. Returns the credit card. 
    createLink(
      account_id: ID!
      credit_id: ID!
    ):Credit
    #inserts a new phone for a client in the database, returns the client.
    createPhoneForClient(
      phone_number:String!
      client_id:ID!
    ):Client
#updates any number of client information. Returns the client.
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

    #updates any number of account information. Returns the account.
    updateAccount(
      ID:ID!
      type: String
      current_balance: Float
    ):Account


#updates any number of credit card information. Returns the credit card.
    updateCredit(
    ID: ID!
    PIN: Int
    expiry_date: String
    ):Credit
    #updates any number of eBanking account information. Returns the eBanking account.
    updateeBanking(
      ID:ID!
      username: String
      password: String
      email: String
    ):eBanking


#updates any number of the information of an employee. Returns the employee
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

      #updates any number of movement information. Returns the movement.
    updateMovement (
      ID :ID!
      type: String
      date: String
      amount: Float
    ):Movement

}

`;
module.exports = {typeDefs};