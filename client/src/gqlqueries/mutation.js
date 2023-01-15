import { gql } from "@apollo/client";

export const SIGNUP_NEWUSER = gql`
mutation signUpNewUser($NewUser:UserInput!){
    signUpUser(newUser:$NewUser){
      _id
      firstName
      lastName
      email
      
    }
  }
`
export const LOGIN_USER = gql`
mutation SigninUser($signuser:UserSignIn!){
    signInUser(newSignIn:$signuser){
      token
    }
  }
`
export const CREATE_QUOTE = gql`
mutation createQuote($newQuote:String!) {
  createQuote(name:$newQuote)
}
`