const express = require('express');
const next = require('next');
const url = require('url');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const nextHandler = app.getRequestHandler();
const port = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(express.static('public'));

    // Default catch-all renders Next app
    server.get('*', (req, res) => {
      // res.set({
      //   'Cache-Control': 'public, max-age=3600'
      // });
      const parsedUrl = url.parse(req.url, true);
      nextHandler(req, res, parsedUrl);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on port ${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
