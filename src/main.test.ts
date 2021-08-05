import StringCalc, { NegativeNumErr } from './main';
import { longStringOfNums } from './longNum'
const strcal = new StringCalc();


describe('1st requirement', () => {
  it('Empty string should return 0', () => {
    expect(strcal.add("")).toBe(0);
  })

  it('Should handle a basic string of numbers', () => {
    expect(strcal.add("1,2,3")).toBe(6);
  })

  it('Should handle a basic string of numbers with whitespace', () => {
    expect(strcal.add("1, 2, 3,     4")).toBe(10);
  })

  it('Should use the decorator', () => {
    for(let i = 0; i < 100; i++) {
      expect(strcal.add(longStringOfNums)).toBe(50000);
    }
  })
});

describe('2nd requirement', () => {
  it('Should handle new lines in input', () => {
    expect(strcal.add("10\n,15, 25")).toBe(50);
  });

  it('Should handle a new line before a number in input', () => {
    expect(strcal.add("\n10,15,25")).toBe(50);
  });

  it('Should handle a new line before a number in input anywhere in array', () => {
    expect(strcal.add("10,15,25,50,\n100")).toBe(200);
  });
})

describe('3rd requirement', () => {
  it('Should handle a custom delimiter', () => {
    expect(strcal.add("//;\n1;3;4")).toBe(8);
  })

  it('Should handle a custom delimiter that is same as default', () => {
    expect(strcal.add("//,\n1,3,4")).toBe(8);
  })

  it('Should handle multiple delimiters', () => {
    expect(strcal.add("//;,@,%,$\n1;3@4$5%6")).toBe(19);
  })

})

describe('4th requirement', () => {
  it('Should throw error with negative number', () => {
    expect(strcal.add("//;\n1;-3;4")).toBe(NegativeNumErr);
  })
})

describe('Bonus requirements', () => {
  it('Should handle a custom delimiter', () => {
    expect(strcal.add("//;\n1;1000;4")).toBe(5);
  })

  it('Should handle multiple delimiters', () => {
    expect(strcal.add("//***\n1***2***3")).toBe(6);
  })
})

describe('Additional coverage tests', () => {
  it('Test getDelimiters has been called', () => {
    const newStrCalc = new StringCalc();
    const testDelimiterCheck = jest.spyOn(StringCalc.prototype as any, 'getDelimiters');
    expect(newStrCalc.add("//,\n1,2,3,4")).toBe(10);
    expect(testDelimiterCheck).toHaveBeenCalled();
  })

  it('Check branch for cached value if statement', () => {
    expect(strcal.hasCachedValue("1,2,3,4,5,6")).toBe(false);
    expect(strcal.add("1,2,3,4,5,6")).toBe(21);
    expect(strcal.hasCachedValue("1,2,3,4,5,6")).toBe(true);
  })
})
