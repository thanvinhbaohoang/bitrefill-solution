/*

  CHALLENGE:
  
  FORK this Pen. 

  Finish the "mustachify" function so that the console output should be something like:
  { duration: X,
    result: "A:Alpha, Y:xY, B:xB1 and xB2, Z:xZ C:xC1, xC2, xF1 and xF2 D:Delta."
    answeredCorrectly: true }

  When you're done, send in this CodePen to continue the process.

  You'll be evaluated on code quality and performance

*/

async function getData(key) {
    switch (key){
      case 'A': return 'Alpha';
      case 'BB': return '{{B1}} and {{B2}}';
      case 'C': return '{{C1}}, {{C2}}, {{EE}}';
      case 'DD': return 'Delta';
      case 'EE': return '{{F1}} and {{F2}}';
    }

    await new Promise(r => { setTimeout(r, 1000); });
    return `x${key}`;
  }
  

// 2. Create filterBracket(string) (This could be 1 line of code but make it a function to abstract for sake of explanation and easy access)
function filterBracket(input){
    let filteredString = input.replace(/[\])}[{(]/g,'')
    return filteredString
}

async function mustachify(inputString, callback) {
// TODO: FINISH THIS FUNCTION
  // 1. Create new bracketArray with items that are in bracket (use this regex: \{.*?\}} ) 
  // [https://stackoverflow.com/questions/26856867/regex-value-inside-double-square-brackets]
  const  bracketArray = inputString.match(/\{.*?\}}/g)

   // Base Case
  if (!bracketArray) { 
    return inputString; 
  }

  // Create Dictionary Key-Value Pair Of Current bracketItem
  const dict = {}
  await Promise.all(bracketArray.map(async key => (
    value = await callback(filterBracket(key)),
    // Update Dictionary With getData()'s Return
    dict[key] = value
  )));

  // Update Current inputString into newString
  let newString = inputString;
  for(const key in dict) {
    var value = dict[key];
    newString = newString.replace(key, value);
  }
  
  // Recursive Call
  newString = await mustachify(newString, callback);
  return newString;
}

async function run() {
    // ORIGINAL RUN TEST
    let startTime = Date.now();
    let result = await mustachify(`A:{{A}}, Y:{{Y}}, B:{{BB}}, Z:{{Z}} C:{{C}} D:{{DD}}.`, getData);
    let answeredCorrectly = (result === 'A:Alpha, Y:xY, B:xB1 and xB2, Z:xZ C:xC1, xC2, xF1 and xF2 D:Delta.');
    let duration = Date.now() - startTime;

    console.log({duration,result,answeredCorrectly});
    }

run();
