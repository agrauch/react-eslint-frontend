/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'JsLintErrors',

  propTypes: {
    className: React.PropTypes.string
  },

  render() {
    var unused = 'I am an unused variable'
    return (<div className={ this.props.className }>Hello React</div>);
  }
});
