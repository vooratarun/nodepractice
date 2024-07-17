const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/testdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

async function run() {
  try {
    // Insert User
    const insertResult = await User.collection.insertOne({
      name: 'Alice',
      email: 'alice@example.com',
      age: 30,
    });
    console.log('Insert Result:', insertResult);

    // Find Users
    const users = await User.collection.find({ age: { $gte: 25 } }).toArray();
    console.log('Found Users:', users);

    // Update User
    const updateResult = await User.collection.updateOne(
      { email: 'alice@example.com' },
      { $set: { age: 31 } }
    );
    console.log('Update Result:', updateResult);

    // Delete User
    const deleteResult = await User.collection.deleteOne({ email: 'alice@example.com' });
    console.log('Delete Result:', deleteResult);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.connection.close();
  }
}

run();
