var React = require('react');
var Search = require('SearchForm');
var twitterSearch = require('twitterSearch');
var SearchForm = require('SearchForm');
var DisplayResult = require('DisplayResult');

var hashtags=new Set();

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

      that.setState({
        result: Array.from(hashtags)
      });

    }, function (errorMessage) {
      alert(errorMessage);
    });
  },

  render: function () {
    if (this.state) {
      var result = this.state.result;
    }

    function renderResult () {
      if (result) {
        return (
          <div>
          <h5>Displaying results from <a href="http://twitter.com">twitter.com</a></h5>
          <DisplayResult data={result} />
          </div>
        );
      }
    }

    return (
      <div className="container box text-center">
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
