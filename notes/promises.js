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


executeTask()