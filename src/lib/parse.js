export default function parse(input) {

  // break into lines
  const lines = input.split('\n');

  // get indents
  const result = [];
  for (const line of lines) {
    const tokens = [];
    for (let i = 0; i < line.length; i++) {
      if (line[i] === ' ') {
        tokens.push({
          text: '',
          class: 'indent'
        })
      } else {
        tokens.push({
          text: line.substr(i),
          class: undefined
        })
        result.push(tokens);
        break;
      }
    }
  }

  // get tags
  for (const tokens of result) {
    for (let i = 0; i < tokens.length; i++) {
      if (!tokens[i].class) { // string waiting to be parsed
        const newTokens = [];
        const string = tokens[i].text;
        let buffer = [];
        let first = false;
        let tagOpen = false;
        for (let j = 0; j < string.length; j++) {
          if (string[j] === '<' && tagOpen === false) { // tag starts
            if (buffer.length) {
              newTokens.push({
                text: buffer.join(''),
                class: undefined
              });
              buffer = [];
            }
            newTokens.push({
              text: '<',
              class: 'symbol'
            });
            if (string[j+1] === '/') {
              j = j + 1;
              newTokens.push({
                text: '/',
                class: 'symbol'
              });
            }
            first = true;
            tagOpen = true;
          } else if (string[j] === ' '  && tagOpen === true) { // space inside tag
            newTokens.push({
              text: buffer.join(''),
              class: first ? 'tag' : 'attr'
            });
            first = false;
            buffer = [];
            newTokens.push({
              text: ' ',
              class: 'space'
            });
          } else if (string[j] === '>' && tagOpen === true) { // tag ends
            newTokens.push({
              text: buffer.join(''),
              class: first ? 'tag' : 'attr'
            });
            first = false;
            buffer = [];
            newTokens.push({
              text: '>',
              class: 'symbol'
            });
            tagOpen = false;
          } else {
            buffer.push(string[j]);
          }
        }
        if (buffer.length) {
          newTokens.push({
            text: buffer.join(''),
            class: undefined
          });
          buffer = [];
        }
        tokens.splice(i, 1, ...newTokens);
      }
    }
  }

  // find styles to parse
  let foundStylesToParse = false
  let inRuleBlock = false;
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      if (!foundStylesToParse) {
        if (result[i][j].class === 'tag' && result[i][j].text === 'style') {
          foundStylesToParse = true;
        }
      } else {
        // parse the styles
        if (!result[i][j].class) { // find unfinished string
          const newTokens = [];
          let string = result[i][j].text;
          let buffer = [];
          for (let k = 0; k < string.length; k++) {
            if (string[k] === '{') { // signals end of specifier, empty buffer as the specifier
              newTokens.push({
                text: buffer.join(''),
                class: 'specifier'
              });
              newTokens.push({
                text: '{',
                class: 'symbol'
              });
              buffer = [];
              inRuleBlock = true;
            } else if (string[k] === '}') { // end of rule block. empty buffer as a css value
              if (buffer.length) {
                newTokens.push({
                  text: buffer.join(''),
                  class: 'value'
                });
                buffer = [];
              }
              newTokens.push({
                text: '}',
                class: 'symbol'
              });
              inRuleBlock = false;
            } else if (string[k] === ':' && inRuleBlock) { // signifies seperator for css property and css value
              newTokens.push({
                text: buffer.join(''),
                class: 'key'
              });
              newTokens.push({
                text: ':',
                class: 'symbol'
              });
              buffer = [];
            } else if (string[k] === ';' && inRuleBlock) { // signifies end of 
              newTokens.push({
                text: buffer.join(''),
                class: 'value'
              });
              newTokens.push({
                text: ';',
                class: 'symbol'
              });
              buffer = [];
            } else {
              buffer.push(string[k]);
            }
          }
          if (buffer.length) {
            newTokens.push({
              text: buffer.join(''),
              class: 'value'
            });
            buffer = [];
          }
          result[i].splice(j, 1, ...newTokens);
        }
      }
    }
  }
  return result;
}