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

// 3. Recurring: look for key from bracketArray in string and replace it with getData(filterBracket(key)) 
async function updateString(bracketArray, inputString, callback){
    console.log("Beep Boop...") // Loading Screen For UI/UX purpose
    let newString = inputString

    // Loop over bracketArray and replace inputString with getData()
    for (let i = 0; i < bracketArray.length; i++) {
        let key = bracketArray[i]
        let value = await callback(filterBracket(key))
        newString = newString.replace(key, value) 
    }
    return newString
}

// NOTE: Since I abstracted updateString() into a seperate function instead of implementing it in mustachify(), 
// there is no need need for callback() but I modified my original updateString() so that it can take `callback` anyway :D
async function mustachify(inputString, callback) {
// TODO: FINISH THIS FUNCTION
    // 1. Create new bracketArray with items that are in bracket (use this regex: \{.*?\}} ) 
    // [https://stackoverflow.com/questions/26856867/regex-value-inside-double-square-brackets]
    let bracketArray = inputString.match(/\{.*?\}}/g)
    
   // 3. Recurring: look for key from bracketArray in string and replace it with getData(filterBracket(key)) 
   let newString = inputString
   while (bracketArray != null) {
    let updatedString = await updateString(bracketArray, newString, callback)

    // Update newString and Reset bracketArray
    newString = updatedString
    bracketArray = updatedString.match(/\{.*?\}}/g) 
    }
    // Return Final Output
    return newString
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

//   =======================================================================================================================================================
//   Code Idea: First Thoughts
//   Observation: 
//   1. Keys with no switch case return itself 
//     ===> JS already default to return key if has no associated value (YAY)
//   2. Keys with bracketed Values return x{key}
//   3. Keys with no bracket Values return its value Example: 'A:Alpha' (No x-prefix)
//   4. case 'EE': return '{{F1}} and {{F2}}' but there is no 'EE' key-value in the input String
//   ==> C how has to also return Value of 'EE'
//   4. Not Every individual key-value pair in answer is separated by a comma
//      ==> Has to iterate over the String instead filter original string into array of seperate individual inputs


// ==========================================================================================================================================================
//   ALGORITHM EXPLANATION:
//   1. Create new bracketArray with items that are in bracket (use this regex: \{.*?\}} ) => bracketArray = [{{A}}, {{Y}}, {{BB}}, {{Z}}, {{C}}, {{DD}}]
//         bracketArray = input.match(\[.*?\]])

//   2. Create filterBracket(string) (This could be 1 line of code but make it a function to abstract for sake of explanation)
//   => This function remove bracket from string (Ex: filterBracket({{A}}) ==> return "A" )

//   3. Recurring: look for key from bracketArray in string and replace it with getData(filterBracket(key)) 
//     for item in bracketArray:
//         newString = newString.replace(item, getData(filterBracket(key)) )
//          ==> newString = "A:Alpha, Y:xY, B:{{B1}} and {{B2}}, Z:xZ, C:{{C1}}, {{C2}}, {{EE}} D:Delta"         
//     Refresh bracketArray with Empty Array (take O(1) time instead of having to O(n) popping individual in for-loop)
//     Add new bracketed item from newString to bracketArray =[{{B1}}, {{B2}}, {{C1}}, {{C2}}, {{EE}}]

//   Observation: The bracketed returned values need to remove bracket and add x-prefix

//   4. Recurring: look for key from bracketArray and replace it with getData(bracketFilter(key)) 
//         newString = "A:Alpha, Y:xY, B:xB1 and xB2, Z:xZ, C:xC1, xC2, {{F1}} and {{F2}} D:Delta" 
//     Refresh bracketArray with Empty Array (take O(1) time instead of having to O(n) popping individual in for-loop)
//     Add new bracketed item from newString to bracketArray =[{{F1}}, {{F2}}]


//   5. Recurring: look for key from bracketArray and replace it with getData(key) also pop() the item from arr
//         newString = "A:Alpha, Y:xY, B:xB1 and xB2, Z:xZ, C:xC1, xC2, xF1 and xF2 D:Delta" 

// RESULT: We get our result here as expected and the run time is roughly O(3n) or even O(n*logn) (Fact check me on this; I could be wrong ;]] )
// so it is still technically O(n) and I get a passing grade. YAY
