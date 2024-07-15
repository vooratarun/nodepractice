// Import named exports
import { myFunction as fun, myVariable } from './myModule.js';

console.log(fun()); // Output: Hello, world!
console.log(myVariable); // Output: Node.js

// Import default export
import defaultExport from './myModule.js';

console.log(defaultExport()); // Output: This is the default export.
