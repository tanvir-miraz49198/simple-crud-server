const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())


// 6OQ1VNGUGYRN5XNj

const uri = "mongodb+srv://tanvir491981:6OQ1VNGUGYRN5XNj@cluster0.ehog8eb.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();

   const usersCollection = client.db('usersDB').collection('users')


   app.get('/users', async(req, res) => {
    const cursor = usersCollection.find()
    const result = await cursor.toArray();
    res.send(result);
   })

    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log('new user', user)
    const result = await usersCollection.insertOne(user);
    res.send(result)
    });


    app.delete('/users/:id', async(req, res) => {
      const id = req.params.id
      console.log('please delete this id', id)

      const query = { _id: new ObjectId(id)}
      const result = await usersCollection.deleteOne(query);
      res.send(result)
    })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } finally {


  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('SIMPLE CRUD IS RUNNING')
})


app.listen(port, () => {
  console.log(`SIMPLE CRUD IS RUNNING ON PORT, ${port}`)
})
