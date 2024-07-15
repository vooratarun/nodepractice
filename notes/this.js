function showThis() {
    console.log(this);
}
  
//   showThis(); // Output: window object (in a browser environment)
  
const person = {
firstName: 'John',
lastName: 'Doe',
fullName() {
    console.log(this.firstName + ' ' + this.lastName);
}
};

// person.fullName(); // Output: John Doe


function greet() {
console.log(`Hello, ${this.name}!`);
}

const obj = { name: 'Alice' };

greet.call(obj); // Output: Hello, Alice!
greet.apply(obj)  



const person2 = {
    firstName: 'John',
    lastName: 'Doe',
    fullName: () => {
      console.log(this.firstName + ' ' + this.lastName);
    },
    fullName2: function(){
        console.log(this.firstName + ' ' + this.lastName);  
    }
  };
  
  person2.fullName(); // Output: undefined undefined (arrow function's `this` refers to global `this`)
  person2.fullName2();


function Person(name) {
this.name = name;
}

const john = new Person('John');
console.log(john.name); // Output: John
