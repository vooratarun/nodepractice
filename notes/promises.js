function wait() {
    const promise = new Promise((resolve,reject)=> {

        setTimeout(()=> {
            resolve(new Error("Error occured"))
        },1000)
    })

    return promise;
}

async function executeTask() {

    try {
        console.log("before data");
        let data = await wait();
        console.log("data here", data);
    }catch(e) {
        console.log("error here",e);
    }

}


// executeTask()


// const fs = require('fs').promises;
// import fs from "fs"

import { promises as fs } from 'fs'; // Native promise-based version in modern Node.js

 async function readFile() {
  try {
    const data =  await fs.readFile('example.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

readFile();
console.log('Reading file...');


function wait2() {
    const promise = new Promise((resolve,reject)=> {
        setTimeout(()=>{
            resolve("success")
        },2000)
    })
    return promise;
}

const execute = async ()=> {
    try{
        console.log("before await")
        let result = await wait2();
        console.log("after await",result)

    }catch(e){
        console.log(e);
    }
}

// execute()