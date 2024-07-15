
let arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];


let maxSoFar = 0;
let maxEndingHere = 0;

for(let i = 0; i< arr.length;i++){

    maxEndingHere = maxEndingHere + arr[i];
    
    maxEndingHere = Math.max(maxEndingHere,0);

    maxSoFar = Math.max(maxSoFar,maxEndingHere);

}

console.log(maxSoFar)