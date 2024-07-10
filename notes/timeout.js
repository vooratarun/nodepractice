let timeoutId = setTimeout(() => {
    console.log('Executed after 2 seconds');
  }, 2000);

//   clearTimeout(timeoutId);

const intervalId = setInterval(() => {
    console.log('Executed every 1 second');
  }, 1000);

console.log(typeof intervalId);
// clearInterval(intervalId)


setImmediate(() => {
    console.log('Executed immediately after I/O events');
  });
  

  process.nextTick(() => {
    console.log('Executed in the next iteration of the event loop');
  });
  