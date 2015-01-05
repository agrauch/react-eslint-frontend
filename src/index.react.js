/** @jsx React.DOM */

'use strict';

(function() {
  var React = require('react');
  var Hello = require('./Hello.react');

  React.renderComponent(<Hello />, document.getElementById('content'));
})();
