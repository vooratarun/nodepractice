const { User, Post, sequelize } = require('./models'); // Adjust the path as needed

const getUsersWithPosts = async () => {
  try {
    // const users = await User.findAll({
    //   include: [
    //     {
    //       model: Post,
    //       as: 'posts',
    //       required: false, // This makes it a LEFT JOIN
    //     },
    //   ],
    // });
    // const users = await User.findAll({});

    const users = await User.findAll({
        include:[
            {
                model: Post,
                as: "posts",
                required: false
            }
        ]
    })

    return users;
  } catch (error) {
    console.error('Error fetching users with posts:', error);
  }
};

// Usage
getUsersWithPosts().then(users => {
  console.log(JSON.stringify(users, null, 2));
});
