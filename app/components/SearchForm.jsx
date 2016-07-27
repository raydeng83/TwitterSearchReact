var React = require('react');

var SearchForm = React.createClass({
  onFormSubmit: function (event) {
    event.preventDefault();

    var word = this.refs.word.value;

    this.props.onSearch(word);
  },

  render: function () {
    return (
      <form className="search-form box" onSubmit={this.onFormSubmit}>
          <ul className="menu">
            <li><input type="search" placeholder="Search" ref="word"/></li>
            <li><button type="button" className="button">Search</button></li>
          </ul>
      </form>
    );
  }
});

module.exports = SearchForm;
