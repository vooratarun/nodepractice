const { sequelize } = require('./models');

const rawQueries = async () => {
  // Execute a simple SELECT query
  const users = await sequelize.query("SELECT * FROM Users", {
    type: sequelize.QueryTypes.SELECT
  });
  console.log("All users:", users);

  // Execute a query with replacements
  const userId = 1;
  const posts = await sequelize.query("SELECT * FROM Posts WHERE userId = :userId", {
    replacements: { userId },
    type: sequelize.QueryTypes.SELECT
  });
  console.log(`Posts for user ${userId}:`, posts);

  // Execute a query with bindings
  const minViews = 10;
  const popularPosts = await sequelize.query("SELECT * FROM Posts WHERE views >= ?", {
    replacements: [minViews],
    type: sequelize.QueryTypes.SELECT
  });
  console.log(`Posts with at least ${minViews} views:`, popularPosts);

  // Execute an INSERT query
  await sequelize.query("INSERT INTO Users (name, email) VALUES (:name, :email)", {
    replacements: { name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    type: sequelize.QueryTypes.INSERT
  });
  console.log("Inserted new user Alice Johnson");

  // Execute an UPDATE query
  await sequelize.query("UPDATE Posts SET views = views + 1 WHERE userId = :userId", {
    replacements: { userId: 1 },
    type: sequelize.QueryTypes.UPDATE
  });
  console.log("Updated views for posts by user 1");

  // Execute a DELETE query
  await sequelize.query("DELETE FROM Users WHERE name = :name", {
    replacements: { name: 'Alice Johnson' },
    type: sequelize.QueryTypes.DELETE
  });
  console.log("Deleted user Alice Johnson");

  // Use a transaction with raw queries
  const transaction = await sequelize.transaction();
  try {
    await sequelize.query("INSERT INTO Users (name, email) VALUES (:name, :email)", {
      replacements: { name: 'Bob Brown', email: 'bob.brown@example.com' },
      type: sequelize.QueryTypes.INSERT,
      transaction
    });

    await sequelize.query("UPDATE Posts SET views = views + 5 WHERE userId = :userId", {
      replacements: { userId: 1 },
      type: sequelize.QueryTypes.UPDATE,
      transaction
    });

    await transaction.commit();
    console.log("Transaction committed");
  } catch (error) {
    await transaction.rollback();
    console.log("Transaction rolled back", error);
  }

  await sequelize.close();
};

// rawQueries();
