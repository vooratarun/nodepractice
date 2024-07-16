const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
mongoose.set('debug', true);


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

// Define Group schema and model
const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Group = mongoose.model('Group', groupSchema);

// Define Membership schema and model
const membershipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  }
});

const Membership = mongoose.model('Membership', membershipSchema);

async function createSampleData() {
  const user1 = new User({ name: 'John Doe', email: 'john@example.com' });
  const user2 = new User({ name: 'Jane Doe', email: 'jane@example.com' });
  const savedUser1 = await user1.save();
  const savedUser2 = await user2.save();

  const group1 = new Group({ name: 'Group A' });
  const group2 = new Group({ name: 'Group B' });
  const savedGroup1 = await group1.save();
  const savedGroup2 = await group2.save();

  const membership1 = new Membership({ user: savedUser1._id, group: savedGroup1._id });
  const membership2 = new Membership({ user: savedUser1._id, group: savedGroup2._id });
  const membership3 = new Membership({ user: savedUser2._id, group: savedGroup1._id });

  await membership1.save();
  await membership2.save();
  await membership3.save();

  console.log('Sample data created');
}

async function getUserGroups(userId) {
  const memberships = await Membership.find({ user: userId }).populate('group');
  console.log('User groups:', memberships.map(m => m.group));
}

async function getGroupUsers(groupId) {
  const memberships = await Membership.find({ group: groupId }).populate('user');
  console.log('Group users:', memberships.map(m => m.user));
}

async function main() {
//   await createSampleData();
  const user1 = await User.findOne({ email: 'john@example.com' });
  const group1 = await Group.findOne({ name: 'Group A' });

  await getUserGroups(user1._id);
  await getGroupUsers(group1._id);

  mongoose.connection.close();
}

main().catch(err => console.log(err));
