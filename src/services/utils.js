function delay(milliseconds){
      return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
      });
}

function parseToUnderscores(textToParse, stringToReplace, replaceString)  {
  return textToParse.split(stringToReplace).join(replaceString)
}
const pageOffset = 20

function getLastPage(total){
  return Math.ceil(total / pageOffset)
}

export default {
  delay,
  parseToUnderscores,
  pageOffset,
  getLastPage
}

