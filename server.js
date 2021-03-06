require('dotenv').config();
const express = require('express');
const next = require('next');
const url = require('url');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dir: '.', dev });
const nextHandler = nextApp.getRequestHandler();
const port = process.env.PORT || 3000;

const { ApolloServer } = require('apollo-server-express');
const CivicInformationGraphql = require('./server/CivicInformation/graphql');
const TwitterGraphql = require('./server/Twitter/graphql');

nextApp
  .prepare()
  .then(() => {
    const app = express();
    app.use(express.static('public'));

    const server = new ApolloServer({
      typeDefs: [CivicInformationGraphql.typeDefs, TwitterGraphql.typeDefs],
      resolvers: {
        Query: {
          ...CivicInformationGraphql.queries
        },
        ...CivicInformationGraphql.resolvers
      },
      playground: true,
      introspection: true
    });
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
