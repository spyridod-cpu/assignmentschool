const { ApolloServer, gql } = require('apollo-server');
const { typeDefs } = require("./typeDefs");
const { Account } = require("./resolvers/Account");
const { Client } = require("./resolvers/Client");
const { Credit } = require("./resolvers/Credit");
const { eBanking } = require("./resolvers/eBanking");
const { Movement } = require("./resolvers/Movement");
const { Mutation } = require("./resolvers/Mutation");
const { Query } = require("./resolvers/Query");


  
  const server = new ApolloServer({ typeDefs, resolvers:{
    Client,
    Account,
    Credit,
    eBanking,
    Movement,
    Mutation,
    Query
  } });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });



