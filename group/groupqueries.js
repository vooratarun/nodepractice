const { User, Post, sequelize } = require('./models');
const { Op } = require('sequelize');

const countPosts = async () => {
  const count = await Post.count();
  console.log(`Total number of posts: ${count}`);
};

const sumViews = async () => {
  const totalViews = await Post.sum('views');
  console.log(`Total number of views: ${totalViews}`);
};

const averageViews = async () => {
  const avgViews = await Post.findAll({
    attributes: [[sequelize.fn('AVG', sequelize.col('views')), 'avgViews']]
  });
  console.log(avgViews[0].get('avgViews'));
  console.log(`Average number of views: ${avgViews[0].get('avgViews')}`);
};

const maxViews = async () => {
  const max = await Post.max('views');
  console.log(`Maximum number of views: ${max}`);
};

const minViews = async () => {
  const min = await Post.min('views');
  console.log(`Minimum number of views: ${min}`);
};

const sumViewsByUser = async (userId) => {
  const totalViews = await Post.sum('views', { where: { userId } });
  console.log(`Total number of views for user ${userId}: ${totalViews}`);
};

const countPostsByUser = async () => {
  const counts = await Post.findAll({
    attributes: ['userId', [sequelize.fn('COUNT', sequelize.col('id')), 'postCount']],
    group: 'userId'
  });
  console.log(counts[0].dataValues);
//   counts.forEach(count => {
//     console.log(`User ${count.userId} has ${count.get('postCount')} posts`);
//   });
};

const runAggregationQueries = async () => {
//   await insertSampleData(); // Insert sample data before running queries

//   await countPosts();
//   await sumViews();
  await averageViews();
//   await maxViews();
//   await minViews();
//   await sumViewsByUser(1); // Replace 1 with the desired userId
//   await countPostsByUser();

  await sequelize.close(); // Close the connection after the operation is complete
};

runAggregationQueries();
