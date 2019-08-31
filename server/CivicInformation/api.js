const axios = require('axios');
const baseURL = 'https://www.googleapis.com/civicinfo/v2';
const key = process.env.CIVIC_INFORMATION_API_KEY;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  params: { key }
});

class CivicInformationApi {
  static representativeInfoByAddress(address, levels, roles) {
    return api
      .get(`/representatives`, {
        params: {
          address,
          levels,
          roles
        }
      })
      .then(({ data }) => data);
  }

  static representativeInfoByDivision(ocdId) {
    return api.get(`/representatives/${ocdId}`).then(({ data }) => data);
  }
}

module.exports = CivicInformationApi;
