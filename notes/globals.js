console.log(__dirname); // Output: /path/to/your/current/directory
console.log(__filename); // Output: /path/to/your/current/file.js

console.log(process.pid); // Output: Process ID of the Node.js process
console.log(process.platform); // Output: Operating system platform
console.log(process.cwd()); // Output: Current working directory

global.myVar = 'Hello, world!';
console.log(global.myVar); // Output: Hello, world!

console.log('Hello, console!');
console.error('Oops! An error occurred.');
console.warn('Warning! Proceed with caution.');

const buf = Buffer.from('hello', 'utf8');
console.log(buf.toString()); // Output: hello
