/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'HelloReact',

  propTypes: {
    className: React.PropTypes.string
  },

  render() {
    return (<div className={ this.props.className }>Hello React</div>);
  }
});
