
import { users, quotes } from './fakedb.js';
// import { randomBytes } from 'crypto'
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config.js';

const User = mongoose.model("User");
const Quote = mongoose.model("quote");


const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
        quotes: async () => {
            return await Quote.find({}).populate("by", "_id firstName");
        },
        user: async (_, { _id }) => {
            return await User.findById({ _id });
        },
        quote: async (_, { by }) => {
            return await Quote.find({ by })
        },
        myProfile: async (_, args, { userid }) => {
            if (!userid) {
                return new Error("You Must be logged In");
            }
            return await User.findOne({ _id: userid })
        }
    },
    User: {
        quotes: async (user) => {
            return await Quote.find({ by: user._id });
        }
    },
    //Static Mutatiion with the fakedb.json
    // Mutation: {
    //     signUpUser: (_, { newUser }) => {
    //         const _id = randomBytes(5).toString("hex");
    //         users.push({
    //             _id,
    //             ...newUser
    //         })
    //         return users.find(user => user._id == _id);
    //     }
    // }
    /**Dynamic Mutation with the MongoDb */
    Mutation: {
        signUpUser: async (_, { newUser }) => {
            const user = await User.findOne({ email: newUser.email });
            if (user) {
                throw new Error("User Already exist with that Email")
            }
            const hashedPassword = await bcrypt.hash(newUser.password, 10);

            const userNew = new User({
                ...newUser,
                password: hashedPassword
            });

            return await userNew.save();
        },
        signInUser: async (_, { newSignIn }) => {
            const user = await User.findOne({ email: newSignIn.email });
            if (!user) {
                return new Error("User does not exceed . Please Sign In to Create New user");
            }
            const doMatch = await bcrypt.compare(newSignIn.password, user.password);
            if (!doMatch) {
                return new Error("Either password or username is Invalid . Please Renter the Password or username");
            }

            const token = jwt.sign({ userid: user._id }, JWT_SECRET);
            return { token };
        },
        createQuote: async (_, { name }, { userid }) => {
            if (!userid) {
                return new Error("You Must be logged In");
            }
            const newQuote = new Quote({
                name,
                by: userid
            })
            await newQuote.save();
            return "Quote Saved Successfully";
        }
    }
}

export default resolvers