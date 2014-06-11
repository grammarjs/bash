
/**
 * Module dependencies.
 */

var Grammar = require('grammarjs-grammar');
var Token = require('grammarjs-token');
var punc = require('grammarjs-punctuation');
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

grammar.use(punc());

/**
 * Bash 2.0.
 */

rule('bash')
  .match(':pipeline', passthrough);

/**
 * Pipeline.
 */

rule('pipeline')
  .match(
    ':pipeline',
    ':punctuation.pipe',
    ':list.newline',
    ':pipeline', 
    passthrough)
  .match(
    ':command', 
    passthrough);

/**
 * Command.
 */

rule('command')
  .match(
    ':command.simple',
    passthrough)
  .match(
    ':command.shell',
    passthrough)
  .match(
    ':command.shell',
    ':list.direction',
    passthrough);

/**
 * Shell command.
 */

rule('command.shell')
  .match(':command.for', passthrough)
  .match(':command.case', passthrough)
  .match(':command.while', passthrough)
  .match(':command.until', passthrough)
  .match(':command.select', passthrough)
  .match(':command.if', passthrough)
  .match(':subshell', passthrough)
  .match(':command.group', passthrough)
  .match(':function', passthrough);

/**
 * Group.
 */

rule('command.group')
  .match('{', ':list', '}', passthrough);

rule('list.newline')
  .match(':list.newline', '\n', passthrough);

/**
 * for loop.
 */

rule('command.for')
  .match(':keyword.for', ':identifier', ':list.newline', ':keyword.do', ':list.compound', ':keyword.done', passthrough)
  .match(':keyword.for', ':identifier', ':list.newline', '{', ':list.compound', '}', passthrough)
  .match(':keyword.for', ':identifier', ';', ':list.newline', ':keyword.do', ':list.compound', ':keyword.done', passthrough)
  .match(':keyword.for', ':identifier', ';', ':list.newline', '{', ':list.compound', '}', passthrough)
  .match(':keyword.for', ':identifier', ':list.newline', ':keyword.in', ':identifier_list', ':list_terminator', passthrough)
  .match(':keyword.for', ':list.newline', ':keyword.do', ':list.compound', ':keyword.done', passthrough)
  .match(':keyword.for', ':identifier', ':list.newline', ':keyword.in', ':identifier_list', ':list_terminator', ':list.newline', '{', ':list.compound', '}', passthrough);

/**
 * `case` command.
 */

rule('command.case')
  .match(':keyword.case', ':identifier', ':newline_list', ':keyword.in', ':newline_list', ':keyword.esac', passthrough)
  .match(':keyword.case', ':identifier', ':newline_list', ':keyword.in', ':case_clause_sequence', ':newline_list', ':keyword.esac', passthrough)
  .match(':keyword.case', ':identifier', ':newline_list', ':keyword.in', ':case_clause', ':esac', passthrough);

/**
 * `while` command.
 */

rule('command.while')
  .match(
    ':keyword.while',
    ':list.compound',
    ':keyword.do',
    ':list.compound',
    ':keyword.done', 
    passthrough);

/**
 * `until` command.
 *
 * TODO: this is exactly the same as `while`.
 */

rule('command.until')
  .match(
    ':keyword.until',
    ':list.compound', 
    ':keyword.do', 
    ':list.compound', 
    ':keyword.done', 
    passthrough);

/**
 * `select` command.
 */

rule('command.select')
  .match(':keyword.select', ':word', ':newline_list', ':keyword.do', ':list', ':keyword.done', passthrough)
  .match(':keyword.select', ':word', ':newline_list', '{', ':list', '}', passthrough)
  .match(':keyword.select', ':word', ';', ':newline_list', ':keyword.do', ':list', ':keyword.done', passthrough)
  .match(':keyword.select', ':word', ';', ':newline_list', '{', ':list', '}', passthrough)
  .match(':keyword.select', ':word', ':newline_list', ':keyword.in', ':word_list', ':list_terminator', ':newline_list', ':keyword.do', ':list', ':keyword.done', passthrough)
  .match(':keyword.select', ':word', ':newline_list', ':keyword.in', ':word_list', ':list_terminator', ':newline_list', '{', ':list', '}', passthrough);

/**
 * `if` command.
 */

rule('command.if')
  .match(':keyword.if', ':list.compound', ':keyword.then', ':list.compound', ':keyword.fi', passthrough)
  .match(':keyword.if', ':list.compound', ':keyword.then', ':list.compound', ':keyword.else', ':list.compound', ':keyword.fi', passthrough)
  .match(':keyword.if', ':list.compound', ':keyword.then', ':list.compound', ':elif_clause', ':keyword.fi', passthrough);

/**
 * Simple command.
 */

rule('command.simple')
  .match(':command.simple_element', passthrough)
  .match(':command.simple', ':command.simple_element', passthrough);

rule('command.simple_element')
  .match(':identifier', passthrough)
  .match(':assignment', passthrough)
  .match(':redirection', passthrough);

rule('word.list')
  .match(
    ':identifier+', 
    passthrough);

/**
 * Assignment.
 */

rule('assignment')
  .match(
    ':identifier', 
    ':operator.equal', 
    ':identifier', 
    passthrough);

/**
 * Output redirection.
 */

rule('redirection')
  .match(
    ':operator.bracket.angle.begin', 
    ':identifier', 
    passthrough)
  .match(
    '<', 
    ':identifier', 
    passthrough)
  .match(
    ':literal.number', 
    '>', 
    ':identifier', 
    passthrough)
  .match(
    ':literal.number', 
    '<', 
    ':identifier', 
    passthrough)
  .match(
    '>>', 
    ':identifier', 
    passthrough)
  .match(
    ':literal.number', 
    '>>', 
    ':identifier', 
    passthrough)
  .match(
    '<<', 
    ':identifier', 
    passthrough)
  .match(
    ':literal.number', 
    '<<', 
    ':identifier', 
    passthrough)
  .match(
    '<&', 
    ':literal.number', 
    passthrough)
  .match(
    ':literal.number', 
    '<&', 
    ':literal.number', 
    passthrough)
  .match(
    '>&', 
    ':literal.number', 
    passthrough)
  .match(
    ':literal.number', 
    '>&', 
    ':literal.number', 
    passthrough)
  .match(
    '<&', 
    ':identifier', 
    passthrough)
  .match(
    ':literal.number', 
    '<&', 
    ':identifier', 
    passthrough)
  .match(
    '>&', 
    ':identifier', 
    passthrough)
  .match(
    ':literal.number', 
    '>&', 
    ':identifier', 
    passthrough)
  .match(
    '<<-', 
    ':identifier', 
    passthrough)
  .match(
    ':literal.number', 
    '<<-', 
    ':identifier', 
    passthrough)
  .match(
    '>&', 
    '-', 
    passthrough)
  .match(
    ':literal.number', 
    '>&', 
    '-', 
    passthrough)
  .match(
    '<&', 
    '-', 
    passthrough)
  .match(
    ':literal.number', 
    '<&', 
    '-', 
    passthrough)
  .match(
    '&>', 
    ':identifier', 
    passthrough)
  .match(
    ':literal.number', 
    '<>', 
    ':identifier', passthrough)
  .match(
    '<>', 
    ':identifier', 
    passthrough)
  .match(
    '>|', 
    ':identifier', 
    passthrough)
  .match(
    ':literal.number', 
    '>|', 
    ':identifier', 
    passthrough);

rule('redirection_list')
  .match(':redirection', passthrough)
  .match(':redirection_list', ':redirection', passthrough);

rule('list.compound')
  .match(':list.newline', ':list1')
  .match(':list');

rule('list0')
  .match(
    ':list1',
    '\n',
    ':list.newline',
    passthrough)
  .match(
    ':list1',
    '&',
    ':list.newline',
    passthrough)
  .match(
    ':list1',
    ';',
    ':list.newline',
    passthrough);

rule('list1')
  .match(
    ':list1', 
    '&&', 
    ':list.newline', 
    ':list1', 
    passthrough)
  .match(
    ':list1', 
    '||', 
    ':list.newline', 
    ':list1', 
    passthrough)
  .match(
    ':list1', 
    '&', 
    ':list.newline', 
    ':list1', 
    passthrough)
  .match(
    ':list1', 
    ';', 
    ':list.newline', 
    ':list1', 
    passthrough)
  .match(
    ':list1', 
    '\n', 
    ':list.newline', 
    ':list1', 
    passthrough)
  .match(
    ':pipeline_command', 
    passthrough);

rule('list.terminator')
  .match('\n', value)
  .match(':punctuation.semicolon', passthrough);

/**
 * Pattern.
 */

rule('pattern')
  .match(
    ':identifier', 
    passthrough)
  .match(
    ':pattern',
    ':operator.pipe', 
    ':identifier', 
    passthrough);

/**
 * Subshell.
 */

rule('subshell')
  .match(
    ':punctuation.bracket.parenthesis.begin',
    ':list.compound',
    ':punctuation.bracket.parenthesis.end', 
    passthrough);

/**
 * Function.
 */

rule('function')
  .match(
    ':identifier',
    ':punctuation.bracket.parenthesis.begin',
    ':punctuation.bracket.parenthesis.end',
    ':list.newline',
    ':command.group',
    passthrough)
  .match(
    ':keyword.function',
    ':identifier',
    ':punctuation.bracket.parenthesis.begin',
    ':punctuation.bracket.parenthesis.end',
    ':list.newline',
    ':command.group',
    passthrough)
  .match(
    ':keyword.function',
    ':identifier',
    ':list.newline',
    ':command.group',
    passthrough)

/**
 * Keywords.
 */

keyword('while');
keyword('until');
keyword('do');
keyword('if');
keyword('fi');
keyword('done');
keyword('for');
keyword('function');
keyword('case');
keyword('esac');
keyword('else');
keyword('elif');
keyword('in');
keyword('then');
keyword('select');

/**
 * Number.
 */

rule('literal.number')
  .match(/[0-9]+/, passthrough);

/**
 * Identifier.
 */

rule('identifier')
  .match(/[a-zA-Z_]+/, value);

/**
 * Operators.
 */

operator('equal', '=');
operator('bracket.angle.begin', '<');
operator('pipe', '|');

/**
 * Punctuation.
 */

punc('pipe', '|');

/**
 * Define keyword rule.
 *
 * @param {String} name
 * @api private
 */

function keyword(name) {
  return rule('keyword.' + name).match(name, value);
}

function operator(name, symbol) {
  return rule('operator.' + name).match(symbol, value);
}

function punc(name, symbol) {
  return rule('punctuation.' + name).match(symbol, value);
}

function log() {
  console.log(JSON.stringify(arguments));
}