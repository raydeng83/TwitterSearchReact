var React = require('react');
var Search = require('SearchForm');
var twitterSearch = require('twitterSearch');
var wordSuggest = require('wordSuggest')
var SearchForm = require('SearchForm');
var DisplayResult = require('DisplayResult');

var hashtags=new Set();
var suggested = false;

var Main = React.createClass({

  handleSearch: function (word) {
    var that = this;
    hashtags.clear();

    twitterSearch.getHashtags(word).then(function (res) {

      for (var i in res.statuses) {
        for (var j in res.statuses[i].entities.hashtags) {
          hashtags.add(res.statuses[i].entities.hashtags[j].text);
        }
      }

      if (hashtags.size) {
        that.setState({
          result: Array.from(hashtags)
        });
      } else {
        suggested=true;
        wordSuggest.getWord(word).then(function (word) {
          that.handleSearch(word);
        }, function (errorMessage) {
          alert(errorMessage);
        })
      }

    }, function (errorMessage) {
      alert(errorMessage);
    });
  },

  render: function () {
    if (this.state) {
      var result = this.state.result;
    }

    function renderMessage() {

      if (suggested){
        suggested=false;
        return <h5>No Hashtags matched your search, here are some suggestions from <a href="http://dictionary.com">dictionary.com</a></h5>
      } else {
        return <h5>Displaying results from <a href="http://twitter.com">twitter.com</a></h5>
      }
    }

    function renderResult () {
      if (result) {
        return (
          <div>
            {renderMessage()}
            <DisplayResult data={result} />
          </div>
        );
      }
    }

    return (
      <div className="container text-center">
        <h1 className="page-title">Twitter API Search</h1>
        <h4>Enter a word</h4>
        <h6>Enter a search term and we will give you a bunch of stuff!</h6>
        <SearchForm onSearch={this.handleSearch}/>
        {renderResult()}
      </div>
    )
  }
});

module.exports = Main;
