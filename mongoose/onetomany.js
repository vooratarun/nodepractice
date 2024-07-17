const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define User schema and model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

const User = mongoose.model('User', userSchema);

// Define Post schema and model
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Post = mongoose.model('Post', postSchema);

async function createSampleData() {
  const user = new User({ name: 'John Doe', email: 'john@example.com' });
  const savedUser = await user.save();

  const post1 = new Post({ title: 'First Post', content: 'This is my first post.', author: savedUser._id });
  const post2 = new Post({ title: 'Second Post', content: 'This is my second post.', author: savedUser._id });
  await post1.save();
  await post2.save();

  console.log('User created:', savedUser);
  console.log('Posts created:', post1, post2);
}

async function getUserWithPosts(userId) {
  const posts = await Post.find({ author: userId }).populate('author');
  console.log('User with posts:', posts);
}

async function main() {
  await createSampleData();
  const user = await User.findOne({ email: 'john@example.com' });
  await getUserWithPosts(user._id);

  mongoose.connection.close();
}

main().catch(err => console.log(err));
