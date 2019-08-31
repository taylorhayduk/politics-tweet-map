var TwitterClient = require('twitter');

var client = new TwitterClient({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});

class Twitter {
  static async getTweets(screen_name, count = 10) {
    const tweets = await client.get('statuses/user_timeline', {
      screen_name,
      count
    });
    return tweets;
  }
}

module.exports = Twitter;
