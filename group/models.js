const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
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
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

// Define associations
User.hasMany(Post, { as: 'posts', foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

const insertSampleData = async () => {
  await sequelize.sync({ force: true });

  const user1 = await User.create({ name: 'John Doe', email: 'john.doe@example.com' });
  const user2 = await User.create({ name: 'Jane Smith', email: 'jane.smith@example.com' });

  await Post.bulkCreate([
    { title: 'First Post', content: 'This is the first post.', userId: user1.id, views: 10 },
    { title: 'Second Post', content: 'This is the second post.', userId: user1.id, views: 20 },
    { title: 'Jane\'s Post', content: 'This is Jane\'s post.', userId: user2.id, views: 15 }
  ]);

  console.log('Sample data inserted successfully.');
};

// Insert sample data
// insertSampleData();


module.exports ={User,Post, sequelize}