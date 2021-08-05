export const NegativeNumErr = Error("Negative numbers not permitted");
export default class StringCalc {
  private static cache = new Map();

  public add(numberString: string): number | Error {
    if(numberString === "") return 0;
    if(StringCalc.cache.has(numberString)) return StringCalc.cache.get(numberString);


    const delimiters = this.getDelimiters(numberString)

/*     let delimiterRegEx = new RegExp(`[${delimiters}]`);
    stringCopy = this.trimDelimiters(numberString).split(delimiterRegEx); */
  
    const numberArray: number[] = this.stringToNumArray(this.trimDelimiters(numberString), delimiters);

    return this.calculateSum(numberArray, numberString);
  }

  public hasCachedValue(string:string): boolean {
    return StringCalc.cache.has(string);
  }

  private getDelimiters(string: string): string[] {
    const regex = new RegExp('\/\/(.*)\\n', 'g')
    let delimiters: string[] = [","];
    let matches = regex.exec(string)

    if(matches) {
      if(matches[1].length > 1) delimiters = matches[1].split(",");
      if(matches[1].length == 1 && matches[1] !== ",") delimiters = [matches[1]]
    }

    return delimiters;
  }

  private stringToNumArray(numberString: string, delimiters: string[]): number[] {
    numberString = numberString.replace(/ /g,"").replace(/(\n)/g,"");

    delimiters.forEach( delim => {
      numberString = numberString.replaceAll(delim," ");
    })

    return numberString.split(" ").map( num => parseInt(num));
  }

  private trimDelimiters(string: string): string {
    const regex = new RegExp('\/\/(.*)\\n', 'g')
    let stringNoDelimiters = string.replace(regex,"")

    return stringNoDelimiters;
  }

  private calculateSum(numbers: number[], originalString: string): number | Error {
    let negativeCount = 0;

    const sumOfNumbers = numbers.reduce( (total, val) => {
      if(val >= 1000) return total;
      if(val < 0) negativeCount++;
      return total + val
    });
    StringCalc.cache.set(originalString, sumOfNumbers);

    if(negativeCount > 0) return NegativeNumErr;
    return sumOfNumbers;
  }
}
