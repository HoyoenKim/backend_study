const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const port = 4000;

const schema = buildSchema(`
    type Query {
        description: String
    }
`);

const root = {
    description: "Hello world!"
}

app.use('/graphql', 
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    }),
);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));