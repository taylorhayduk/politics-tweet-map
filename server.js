require('dotenv').config();
const CivicInformationApi = require('./server/CivicInformation/api');
const express = require('express');
const next = require('next');
const url = require('url');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dir: '.', dev });
const nextHandler = nextApp.getRequestHandler();
const port = process.env.PORT || 3000;

// GraphQL schema
var schema = buildSchema(`
    type Query {
        officials(address: String!): [Official]
    },
    type Official {
      name: String
      address: [Address]
      party: String
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
`);

const getOfficials = async function({ address }) {
  const { officials } = await CivicInformationApi.representativeInfoByAddress(
    address
  );
  return officials;
};

var root = {
  officials: getOfficials
};

nextApp
  .prepare()
  .then(() => {
    const app = express();
    app.use(express.static('public'));

    // Create a GraphQL endpoint
    app.use(
      '/graphql',
      express_graphql({
        schema: schema,
        rootValue: root,
        graphiql: true
      })
    );

    // Default catch-all renders Next nextApp
    app.get('*', (req, res) => {
      // res.set({
      //   'Cache-Control': 'public, max-age=3600'
      // });
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
