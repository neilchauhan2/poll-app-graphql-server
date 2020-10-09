const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const schema = require("./graphQL/schema");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const connection = mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);


app.listen(8000, () => console.log("Server started oh http://localhost:8000"));