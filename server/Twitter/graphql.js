const { gql } = require('apollo-server-express');

const TwitterGraphql = {
  typeDefs: gql`
    type Tweet {
      text: String
    }
  `
};

module.exports = TwitterGraphql;
