const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('practice', 'root', 'password', {
  dialect: 'mysql', // e.g., 'mysql', 'postgres', 'sqlite', etc.
});

// Define User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define Post model
const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define associations
User.hasMany(Post, { as: 'posts', foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

const insertSampleData = async () => {
  // await sequelize.sync({ force: true }); // This will create the tables and drop them first if they already exist

  // // Create users
  // const user1 = await User.create({ name: 'John Doe', email: 'john.doe@example.com' });
  // const user2 = await User.create({ name: 'Jane Smith', email: 'jane.smith@example.com' });

  // // Create posts for user1
  // await Post.create({ title: 'First Post', content: 'This is the first post.', userId: user1.id });
  // await Post.create({ title: 'Second Post', content: 'This is the second post.', userId: user1.id });

  // // Create posts for user2
  // await Post.create({ title: 'Jane\'s Post', content: 'This is Jane\'s post.', userId: user2.id });

  const user3 = await User.create({ name: 'tarun', email: 'tarun@example.com' });


  console.log('Sample data inserted successfully.');
};

// Insert sample data
// insertSampleData().then(() => {
//   sequelize.close(); // Close the connection after the operation is complete
// });

module.exports = { User, Post, sequelize };


