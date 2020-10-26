
function createInlineRegex(path) {
  if (undefined === path) {
    return /(\[[^\[]*\]\()(\/?[a-zA-Z0-9_.\-\/]*\.md)/g
  }

  return new RegExp('(\\[[^\\[]*\\]\\()' + path, 'g');
}

function matchInline(source) {
  return Array.from(source.matchAll(inline)).map(result => result[2]);
}

function replaceInline(source, value) {
  return source.replace(inline, '$1' + value);
}

const ref = /(\[[^\[]*\]\:\s*)(\/?[a-zA-Z0-9_.\-\/]*\.md)/g;


function createInlineRegex(path) {
  if (undefined === path) {
    return /(\[[^\[]*\]\:\s*)(\/?[a-zA-Z0-9_.\-\/]*\.md)/g
  }

  return new RegExp('(\\[[^\\[]*\\]\\:\\s*)' + path, 'g');
}

function matchRef(source) {
  return Array.from(source.matchAll(ref)).map(result => result[2]);
}

function replaceRef(source, value) {
  return source.replace(ref, '$1' + value);
}

exports.match = function(source) {
  return matchInline(source).concat(matchRef(source));
}

exports.replace = function(source, value) {
  source = replaceInline(source, value);
  return replaceRef(source, value);
}