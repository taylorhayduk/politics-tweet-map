require('dotenv').config();
const CivicInformationApi = require('./server/CivicInformation/api');
const TwitterApi = require('./server/Twitter/api');
const express = require('express');
const next = require('next');
const url = require('url');

const { ApolloServer, gql } = require('apollo-server-express');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dir: '.', dev });
const nextHandler = nextApp.getRequestHandler();
const port = process.env.PORT || 3000;

// GraphQL schema
var typeDefs = gql(`
  type Query {
      officials(address: String!, channelType: String, limit: Int): [Official]
  },
  type Official {
    name: String
    address: [Address]
    party: String
    phones: [String]
    urls: [String]
    photoUrl: String
    emails: [String]
    channels: [Channel]
    tweets(limit: Int): [Tweet]
  },
  type Address {
    locationName: String
    line1: String
    line2: String
    line3: String
    city: String
    state: String
    zip: String
  }
  type Channel {
    type: String
    id: String
  }
  type Tweet {
    text: String
  }
`);

const getOfficials = async (_parent, args, _context) => {
  const { address, channelType, limit } = args;
  const { officials } = await CivicInformationApi.representativeInfoByAddress(
    address
  );
  if (limit) {
    officials.splice(limit);
  }
  if (channelType) {
    officials.map(official => {
      official.channels =
        official.channels &&
        official.channels.filter(channel => channel.type === channelType);
      return official;
    });
  }
  return officials;
};

var resolvers = {
  Query: {
    officials: getOfficials
  },
  Official: {
    tweets: async (parent, args, _context) => {
      const { limit } = args;
      let twitterId =
        parent.channels &&
        (parent.channels.find(channel => channel.type === 'Twitter') || {}).id;
      let tweets = [];
      if (twitterId) {
        tweets = await TwitterApi.getTweets(twitterId, limit);
      }
      tweets.splice(limit);
      return tweets;
    }
  }
};

nextApp
  .prepare()
  .then(() => {
    const app = express();
    app.use(express.static('public'));

    const server = new ApolloServer({ typeDefs, resolvers });
    server.applyMiddleware({ app });

    // Default catch-all renders Next nextApp
    app.get('*', (req, res) => {
      const parsedUrl = url.parse(req.url, true);
      nextHandler(req, res, parsedUrl);
    });

    app.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on port ${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
