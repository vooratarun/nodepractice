const { MongoClient, ObjectId } = require('mongodb');

async function run() {
  const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();

  const db = client.db('testdb');
  const usersCollection = db.collection('users');
  const postsCollection = db.collection('posts');

  const result = await postsCollection.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'authorDetails'
      }
    },
    {
      $unwind: '$authorDetails'
    }
  ]).toArray();

  console.log(result);

  await client.close();
}

run().catch(console.error);
