var axios = require("axios");

const DICT_URL= "http://localhost:8080/http://www.dictionary.com/misspelling?term=";

module.exports = {

  getWord: function (word) {
    var requestUrl = DICT_URL + word;

    var config = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    return axios.get(requestUrl, config).then(function () {
    }, function (text) {
        let htmlContent = text.data;
        var newWord = $(htmlContent).find('.closest-result').find('span').text();

        return newWord;
    });
  }
}
