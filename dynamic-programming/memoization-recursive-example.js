//use memoization to store already found solutions to reduce time complexity
//O(n) time, O(n log n) space??

const fib = (n, memo=[undefined,1,1]) => {
 if(!memo[n]) {memo[n] = fib(n-1,memo) + fib(n-2,memo);}
  return memo[n];
}