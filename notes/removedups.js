
const removeDups = (array)=> {

    const seen = {}
    const map = new Map();
    const uniqueArray = [];

    array.forEach((item)=> {
            
        if(!map.get(item)) {
            uniqueArray.push(item);
            map.set(item, true);
        }
    })

    console.log(map);

    map.forEach((key,val)=> {
        console.log(key,val)
    })
     
    return uniqueArray;
}

let remarr= removeDups([1,2,3,1,1,1]);
console.log(remarr)

const stringArray = ['apple', 'banana', 'apple', 'orange', 'banana'];
const uniqueStringArray = [...new Set(stringArray)];
console.log(uniqueStringArray);
