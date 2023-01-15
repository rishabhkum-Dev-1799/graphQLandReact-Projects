import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import typeDefs from './graphqlquery.js';
import mongoose from 'mongoose';
import { JWT_SECRET, MONGODB_URI } from './config.js';
import jwt from 'jsonwebtoken';

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
})

mongoose.connection.on("error", (err) => {
    console.log("errorConnecting", err);
})
// import Models
import './models/userModel.js';
import './models/quoteModel.js';
import resolvers from './resolver.js';

// Middleware Code 
const contextmiddleware = ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
        const { userid } = jwt.verify(authorization, JWT_SECRET);
        return { userid };
    }
}
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: contextmiddleware,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});


