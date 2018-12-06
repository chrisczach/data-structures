// saves time and space by approaching problem from the bottom up, starting at fib(1) up until fib(num)
// O(1) space, O(n) time

const fib = num => {
  let min2 = 0;
  let min1 = 1;
  let current = 1

  for(let i = 0; i < num; i++) {
    current = min2 + min1
    min2 = min1;
    min1 = current;
    
  }
  return current
}