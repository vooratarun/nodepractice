const mongoose = require('mongoose');


async function connectDB() {
    let con = await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true })
    if(con) {
        console.log("connected")
    }
}

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    birthdate: {
      type: Date,
      required: true
    }
  });
  
  // Create a model
const User = mongoose.model('User', userSchema);

async function insertNewUser() {
    const newUser = new User({
        name : "tarun",
        email: "vooratarun@gmail.com",
        password: "password",
        birthdate: new Date("1995-04-16")    

    });
    const savedUser = await newUser.save();

    console.log(savedUser)
}

async function tank() {
    const schema = new mongoose.Schema({ name: String, size: String });
    const Tank = mongoose.model('Tank', schema);
    
    const small = new Tank({ size: 'small' });
    await small.save();

    // or

    await Tank.create({ size: 'small' });

    // or, for inserting large batches of documents
    await Tank.insertMany([{ size: 'small' }]);
}

let main = async () => {
    await connectDB(); 
    await insertNewUser();
}


main().then()