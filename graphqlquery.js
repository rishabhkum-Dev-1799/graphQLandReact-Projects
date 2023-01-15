import { gql } from 'apollo-server'

const typeDefs = gql`
type Query{
    users:[User]
    quotes:[ QuoteWithName]
    user(_id:ID!):User
    quote(by:ID!):[ QuoteWithName]
    myProfile:User
}
type Mutation{
    signUpUser(newUser:UserInput!):User
    signInUser(newSignIn:UserSignIn!):Token
    createQuote(name:String!):String
}
type User{
 _id:ID
 firstName:String
 lastName:String
 email:String
 quotes:[QuoteWithName]
}
type QuoteWithName{
    name:String
    by:IdName
}
type IdName{
    _id:String
    firstName:String
}
input UserInput{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
}
input UserSignIn{
    email:String!
    password:String!
}
type Token{
    token:String
}
`;

export default typeDefs