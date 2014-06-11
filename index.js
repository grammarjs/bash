
/**
 * Module dependencies.
 */

var Grammar = require('grammarjs-grammar');
var Token = require('grammarjs-token');
var punctuation = require('grammarjs-punctuation');
var grammar = new Grammar('bash');
var rule = grammar.rule;
var value = Token.value;
var passthrough = Token.passthrough;

/**
 * Expose `grammar`.
 */

module.exports = grammar;

/**
 * Plugins.
 */

grammar.use(punctuation());

/**
 * Bash 2.0.
 */

rule('bash')
  .match(':pipeline', passthrough);

/**
 * Pipeline.
 */

/**
 * Define keyword rule.
 *
 * @param {String} name
 * @api private
 */

function keyword(name) {
  return rule('keyword.' + name).match(name, value);
}

function log() {
  console.log(JSON.stringify(arguments));
}