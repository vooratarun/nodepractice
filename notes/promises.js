function wait() {
    const promise = new Promise((resolve,reject)=> {

        setTimeout(()=> {
            resolve(new Error("Error occured"))
        },2000)
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


const fs = require('fs').promises;

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
