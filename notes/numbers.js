const numbers = [1, 2, 3, 4, 5];

numbers.forEach((number, index) => {
  console.log(`Index: ${index}, Value: ${number}`);
});

const doubled = numbers.map((item)=> {
    return item * 2
});

console.log(doubled)

const filterd = numbers.filter((item)=> item%2 == 0);
console.log(filterd);

const doubledEvenNums = numbers.filter(num => num %2 ==0 )
                        .map(item => item * 2);

 console.log(doubledEvenNums)                       