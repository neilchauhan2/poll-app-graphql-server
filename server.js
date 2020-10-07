const express = require("express");
const {
    graphqlHTTP
} = require('express-graphql');
const schema = require("./graphQL/schema");

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(8000, () => console.log("Server started oh http://localhost:8000"));