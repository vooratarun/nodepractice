const map = new Map();

map.set("name","Alcie");
map.set("age",20);

console.log(map.get("name"));
console.log(map.get("age"));

map.forEach((key,val)=>{
    console.log(key,val)
})