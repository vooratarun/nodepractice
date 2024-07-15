const db = require("./db.js");

async function findUsers(){

    let userlist = await usernew.findAll();
    const users = await db.User.findAll({
        include: [
        {
            model: db.Post,
            as: 'postsnew'
        }
        ]
    });
    
    console.log(JSON.stringify(users, null, 2));
}

findUsers()
.then()
.catch()