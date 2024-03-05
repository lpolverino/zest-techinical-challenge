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

function handleError(error, errorMessage, setError) {
  console.log(error);
  setError(errorMessage)
}

export default {
  delay,
  parseToUnderscores,
  pageOffset,
  getLastPage,
  handleError
}

