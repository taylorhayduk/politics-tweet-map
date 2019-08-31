const axios = require('axios');
const baseURL = 'http://twitter.com';
const cheerio = require('cheerio');

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

class Twitter {
  static async getTweets(userId) {
    return api.get(`/${userId}`).then(({ data: html }) => {
      // NOTE: I didn't have time to get proper Twitter API credentials.
      // I'm just manually screen scraping with cheerio - an html parsing library.
      // DO NOT this approach in production.

      const $ = cheerio.load(html);

      const tweets = [];
      $('p.tweet-text').each((i, element) => {
        const tweet = {
          text: $(element).text()
        };
        tweets.push(tweet);
      });

      return tweets;
    });
  }
}

Twitter.getTweets('realdonaldtrump').catch(err => console.log(err));

module.exports = Twitter;
