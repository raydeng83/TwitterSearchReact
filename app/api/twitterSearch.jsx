var axios = require("axios");

const TWITTER_SEARCH_URL= "http://localhost:8080/https://api.twitter.com/1.1/search/tweets.json?q=%23";

module.exports = {
  getHashtags: function (word) {
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer AAAAAAAAAAAAAAAAAAAAAK7nwAAAAAAA%2BKwPqL2dZ7YCrQci9j8ejKPBDTo%3DKbXIoAVDYglb6NxbQtciZGS31RAwhpdYgl7PrdNZxv8qbGrX0I'
      }
    };

    var requestUrl = TWITTER_SEARCH_URL + word;

    return axios.get(requestUrl, config).then(function (res) {
      return res.data;
    }, function (res) {
      console.log('failure');
      return res.data.message;
    });
  }
}
