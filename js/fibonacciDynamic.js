function fib(pos, memo = {}) {
    if (pos in memo) return memo[pos];
    if (pos <= 2) return 1;
    memo[pos] = fib(pos - 1, memo) + fib(pos - 2, memo);
    return memo[pos];
}

console.log(fib(20));
console.log(fib(30));
console.log(fib(100));