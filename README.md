## Steps for running the code:

1. npm install
2. npm run test

Should run the test suite with coverage shown.

## Notes:
  Caching here was probably completely unecessary, but I implemented it before I tested if it improved performance in any significant way, so I kept it in. Comments are in JSDoc format, but JSDoc isn't installed because I didn't think it was necessary, so I didn't generated proper docs.

  I tried to get good coverage of the code, and identify some possible edge cases. All the requirements, including bonuses, should be covered.

  Feels as though the way I've used replace to remove chars in a few spots is pretty hacky and slow. The solution is possibly better RegEx with .split, but my RegEx is pretty rusty so given the amount of time I felt like this was a reasonable first pass.
