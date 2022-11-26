# bitrefill-solution
!["Output picture of Bitrefill JS Challenge by Harold"](https://github.com/thanvinhbaohoang/bitrefill-solution/blob/main/bitrefill-output.png "Solution to Bitrefill JS Challenge")

  ==========================================================================
  # Code Idea: First Thoughts
  ## Observation: 
  1. Keys with no switch case return itself 
    ===> JS already default to return key if has no associated value (YAY)
  2. Keys with bracketed Values return x{key}
  3. Keys with no bracket Values return its value Example: 'A:Alpha' (No x-prefix)
  4. case 'EE': return '{{F1}} and {{F2}}' but there is no 'EE' key-value in the input String
  ==> C how has to also return Value of 'EE'
  4. Not Every individual key-value pair in answer is separated by a comma
     ==> Has to iterate over the String instead filter original string into array of seperate individual inputs


=============================================================================
 ## ALGORITHM EXPLANATION:
  1. Create new bracketArray with items that are in bracket (use this regex: \{.*?\}} ) => bracketArray = [{{A}}, {{Y}}, {{BB}}, {{Z}}, {{C}}, {{DD}}]
        bracketArray = input.match(\[.*?\]])

  2. Create filterBracket(string) (This could be 1 line of code but make it a function to abstract for sake of explanation)
  => This function remove bracket from string (Ex: filterBracket({{A}}) ==> return "A" )

  3. Recurring: look for key from bracketArray in string and replace it with getData(filterBracket(key)) 
    for item in bracketArray:
        newString = newString.replace(item, getData(filterBracket(key)) )
         ==> newString = "A:Alpha, Y:xY, B:{{B1}} and {{B2}}, Z:xZ, C:{{C1}}, {{C2}}, {{EE}} D:Delta"         
    Refresh bracketArray with Empty Array (take O(1) time instead of having to O(n) popping individual in for-loop)
    Add new bracketed item from newString to bracketArray =[{{B1}}, {{B2}}, {{C1}}, {{C2}}, {{EE}}]

  Observation: The bracketed returned values need to remove bracket and add x-prefix

  4. Recurring: look for key from bracketArray and replace it with getData(bracketFilter(key)) 
        newString = "A:Alpha, Y:xY, B:xB1 and xB2, Z:xZ, C:xC1, xC2, {{F1}} and {{F2}} D:Delta" 
    Refresh bracketArray with Empty Array (take O(1) time instead of having to O(n) popping individual in for-loop)
    Add new bracketed item from newString to bracketArray =[{{B1}}, {{B2}}, {{C1}}, {{C2}}, {{EE}}]


  5. Recurring: look for key from bracketArray and replace it with getData(key) also pop() the item from arr
        newString = "A:Alpha, Y:xY, B:xB1 and xB2, Z:xZ, C:xC1, xC2, xF1 and xF2 D:Delta" 

RESULT: We get our result here as expected and the run time is roughly O(3n) or even O(n*logn) (Fact check me on this; I could be wrong ;]] )
so it is still technically O(n) and I get a passing grade. YAY
