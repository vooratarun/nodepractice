const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('development', 'root', 'password', {
  dialect: 'mysql', // or 'sqlite', 'postgres', etc.
});

const User = require('./user')(sequelize, DataTypes);
const Post = require('./post')(sequelize, DataTypes);

const models = { User, Post };

// Object.keys(models).forEach(modelName => {
//   if (models[modelName].associate) {
//     models[modelName].associate(models);
//   }
// });


const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.User = User;
db.Post = Post;

db.Post.belongsTo(models.User, {
  foreignKey: 'userId',
  as: 'user'
});

User.hasMany(models.Post, {
  foreignKey: 'userId',
  as: 'postsnew'
});

module.exports = db


// async function insertData(){

//     const user = await User.create({
//         name: 'John Doe',
//         email: 'john.doe@example.com'
//       });
    
//       console.log('User created:', user.toJSON());
    
//       // Insert posts for the user
//       const post1 = await Post.create({
//         title: 'First Post',
//         content: 'This is the content of the first post.',
//         userId: user.id
//       });
    
//       const post2 = await Post.create({
//         title: 'Second Post',
//         content: 'This is the content of the second post.',
//         userId: user.id
//       });
    
//       console.log('Post 1 created:', post1.toJSON());
//       console.log('Post 2 created:', post2.toJSON());

// }

// async function findUsers(){
//     const users = await User.findAll({
//         include: [
//         {
//             model: Post,
//             as: 'posts'
//         }
//         ]
//     });
    
//     console.log(JSON.stringify(users, null, 2));
// }

// sequelize.sync({ alter: true }) // Use { force: true } for development purposes only
//   .then(() => {
//     console.log('Database & tables created!');
//     // findUsers()
//     // insertData()
//   });


