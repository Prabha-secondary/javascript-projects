function createCounter() {
  let count = 0;  // ← this is the "private" variable

  return function () {
    count++;               // ← inner function uses it
    console.log(count);
  };
}

const myCounter = createCounter(); // closure starts here
myCounter(); // 1
myCounter(); // 2
myCounter(); // 3

const counterA = createCounter();
const counterB = createCounter();

counterA(); // 1
counterA(); // 2

counterB();

// createCounter() runs, and creates a variable count = 0.

// It returns an inner function that increases count and prints it.

// You store that returned function in myCounter.

// Now, every time you run myCounter(), it increases and remembers the count.

// Even though createCounter() has finished running, myCounter() still 
// remembers the count inside it. That memory is the closure.

// -----------------------------------------------------------------------

// What Makes This a Closure?
// The returned function closes over the variable count.

// That variable is not global, not passed in — yet it’s still accessible.

// It's stored in the function’s "backpack" of memory.

// -----------------------------------------------------------------------

// Scenario	                  Variable Access	          Memory Preserved
// 
// Normal inner function	        ✅ Yes	                    ❌ No
// Closure (stored access)	      ✅ Yes	                    ✅ Yes