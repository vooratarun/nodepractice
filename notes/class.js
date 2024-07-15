class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet(){
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
        return 10;
    }
}

const person1 = new Person("tar",30);
let data = person1.greet()
console.log(data)


class Animal {
    constructor(name) {
      this.name = name;
    }
  
    speak() {
      console.log(`${this.name} makes a sound.`);
    }
  }
  
 
  class Dog extends Animal {
    constructor(name,breed) {
        super(name);
        this.breed = breed;
    }

    speak(){
        console.log(`${this.breed} barks.`)
    }
  }

  const dog1  = new Dog("Buddy","Golden retriever");
  dog1.speak()



  class Rectangle {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }
  
    // Getter
    get area() {
      return this.width * this.height;
    }
  
    // Setter
    set area(value) {
      const ratio = this.width / this.height;
      this.width = Math.sqrt(value * ratio);
      this.height = Math.sqrt(value / ratio);
    }
  }
  
  const rect = new Rectangle(10, 5);
  console.log(rect.area); // 50
  rect.area = 100;
  console.log(rect.width); // New width based on the area setter logic
  console.log(rect.height); // New height based on the area setter logic
  