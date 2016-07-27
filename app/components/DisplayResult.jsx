var React = require('react');

var DisplayResult = React.createClass({
  render: function() {

    return (
      <div>
        {
          this.props.data.map(function(item, index) {
            return <h4 className="hashtag" key={index}>{item}</h4>
          })
        }
      </div>);
  }
});


module.exports = DisplayResult;
