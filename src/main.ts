export const NegativeNumErr = Error("Negative numbers not permitted");
export default class StringCalc {
  //Map used to cache add results for larger calculations.
  private static cache = new Map();

  /**
 * Public method used to convert a string to a single return number.
 * @public
 * 
 * @param {string} String by user to be converted to an integer.
 * @return {number | error} String converted to a single number, or method throws an error.
 */
  public add(numberString: string): number | Error {
    /**
    * Sets up base cases.
    * If the string is empty, or the passed string exists as a key in the cache then return 0, or the value, respectively.
    */
    if(numberString === "") return 0;
    if(StringCalc.cache.has(numberString)) return StringCalc.cache.get(numberString);

    const delimiters: string[] = this.getDelimiters(numberString)
    const numberArray: number[] = this.stringToNumArray(this.trimDelimiters(numberString), delimiters);

    return this.calculateSum(numberArray, numberString);
  }

  /**
  * Public method used to convert a string to a single return number.
  * @public
  * 
  * @param {string} String by user to be converted to an integer.
  * @return {boolean} Returns a boolean based on if map contains string.
  */
  public hasCachedValue(string:string): boolean {
    return StringCalc.cache.has(string);
  }

  /**
  * Private method that uses regex to identify if custom delimiters exist and creates an array of them.
  * @name getDelimiters
  * @private
  * @function
  * 
  * @param {string} Accepts a string argument to test again.
  * 
  * @return {Array<string>} Returns an array of strings that represent all the delimiters.
  */
  private getDelimiters(string: string): string[] {
    //Regex expression that identifies delimiters between // and \n.
    const regex = new RegExp('\/\/(.*)\\n', 'g')
    //Base case, this returns if no other conditions are met at the end of the function.
    let delimiters: string[] = [","];
    let matches = regex.exec(string)

    /**
    * If RegEx is matched, check if there are 1 or more delimiters within the substring.
    * If more than one, split the string into an array of delimiter substrings.
    * If one, and not the default , then create an array with the single delimiter.
    */
    if(matches) {
      if(matches[1].length > 1) delimiters = matches[1].split(",");
      if(matches[1].length == 1 && matches[1] !== ",") delimiters = [matches[1]]
    }

    return delimiters;
  }

  /**
  * Private method that converts the trimmed user string into an array of numbers.
  * @name stringToNumArray
  * @private
  * @function
  * 
  * @param {string} Takes a substring of the userinput string returned by trimDelimiters.
  * @param {Array<string>} Array of delimiters used to remove all delimiters from the substring.
  * 
  * @return {Array<number>} Returns a substring of the main string, with the delimiters removed, converted to integers.
  */
  private stringToNumArray(numberString: string, delimiters: string[]): number[] {
    //Removes all the white space & new lines from string.
    numberString = numberString.replace(/ /g,"").replace(/(\n)/g,"");

    //Loops over the delimiters array and removes any delimiters found in the string.
    delimiters.forEach( delim => {
      numberString = numberString.replaceAll(delim," ");
    })

    //Splits the string based on the white space created by the loop above and converts the values to integers and returns it.
    return numberString.split(" ").map( num => parseInt(num));
  }

  /**
  * Private method that removes the custom delimiter substring.
  * @name trimDelimiters
  * @private
  * @function
  * 
  * @param {string} Passed string originally passed to the add method by user.
  * 
  * @return {string} Returns a substring of the main string, with the delimiters removed.
  */
  private trimDelimiters(string: string): string {
    //Regex for getting any delimiters between // & \n.
    const regex = new RegExp('\/\/(.*)\\n', 'g')
    let stringNoDelimiters = string.replace(regex,"")

    return stringNoDelimiters;
  }

  /**
  * Private method that takes the original string that has been converted to an array of numbers, and returns a single value.
  * Throws as error if this function finds a negative value. Caches the value it generates.
  * @name calculateSum
  * @private
  * @function
  * 
  * @param {Array<number>} Array of numbers to be reduced to a single value
  * @param {string} Original string input by user used as a key to cache the results.
  * 
  * @return {Error} Throws error if it finds a negative value.
  * @return {number} Returns a single numerical value.
  */
  private calculateSum(numbers: number[], originalString: string): number | Error {
    //Counter used to throw error if above 0.
    let negativeCount = 0;

    /**
    * Receives an array of numbers, adds them together and returns a single value.
    * Increments counter if any values are negative.
    * Ignores values over 1000
    */
    const sumOfNumbers = numbers.reduce( (total, val) => {
      if(val >= 1000) return total;
      if(val < 0) negativeCount++;
      return total + val
    });
    //Caches value based with key as user input string.
    StringCalc.cache.set(originalString, sumOfNumbers);

    //Throws error if negativeCount has incremented in the reducer function.
    if(negativeCount > 0) return NegativeNumErr;
    return sumOfNumbers;
  }
}
