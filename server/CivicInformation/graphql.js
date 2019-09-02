const CivicInformationApi = require('./api');
const TwitterApi = require('../Twitter/api');
const { gql } = require('apollo-server-express');

const CivicInformationGraphql = {
  typeDefs: gql`
    type Query {
      officials(
        address: String!
        channelType: String
        limit: Int
        levels: Levels
        roles: Roles
      ): [Official]
    }
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
    }
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
    enum Levels {
      administrativeArea1
      administrativeArea2
      country
      international
      locality
      regional
      special
      subLocality1
      subLocality2
    }
    enum Roles {
      deputyHeadOfGovernment
      executiveCouncil
      governmentOfficer
      headOfGovernment
      headOfState
      highestCourtJudge
      judge
      legislatorLowerBody
      legislatorUpperBody
      schoolBoard
      specialPurposeOfficer
    }
  `,
  Official: {
    tweets: async (parent, args, _context) => {
      const { limit } = args;
      let twitterId =
        parent.channels &&
        (parent.channels.find(channel => channel.type === 'Twitter') || {}).id;
      let tweets = [];
      if (twitterId) {
        tweets = await TwitterApi.getTweets(twitterId, limit).catch(err => []); // return empty array on error.  I believe is due to incorrect twitter handles
      }
      tweets.splice(limit);
      return tweets;
    }
  },
  getOfficials: async (_parent, args, _context) => {
    const { address, channelType, limit, levels, roles } = args;
    const {
      officials = []
    } = await CivicInformationApi.representativeInfoByAddress(
      address,
      levels,
      roles
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
  }
};

module.exports = CivicInformationGraphql;
