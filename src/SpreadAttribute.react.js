'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  propTypes: {

  },

  render: function() {
    var x = (arg) => {
      return arg;
    };

    return <div {...this.props} />;
  }
});
