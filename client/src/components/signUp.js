import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGNUP_NEWUSER } from '../gqlqueries/mutation';

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [signUpUser, { data, loading, error }] = useMutation(SIGNUP_NEWUSER);

    const changehandler = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(formData);
        signUpUser({
            variables: {
                NewUser: formData
            }
        })
    }

    if (loading) {
        return (
            <h1>Loading....</h1>
        )
    }



    return (
        <div className="container my-Container">
            {error && <div className='red card-panel'>{error.message}</div>}
            {data && data.signUpUser && <div className='green card-panel'>New User {data.signUpUser.firstName} is Succesfully Signed . Please Login to the App</div>}
            <h3>SignUp Form</h3  >
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder='Enter your FirstName'
                    required
                    name="firstName"
                    onChange={changehandler}

                />
                <input
                    type="text"
                    placeholder='Enter your LastName'
                    required
                    name="lastName"
                    onChange={changehandler}

                />
                <input
                    type="email"
                    placeholder='Enter your Email'
                    required
                    name="email"
                    onChange={changehandler}

                />
                <input
                    type="password"
                    placeholder='Enter your Password'
                    required
                    name='password'
                    onChange={changehandler}
                />
                <Link to="/login"><p>Already Have a Account</p></Link>
                <button className="btn #d81b60 pink darken-1" type='submit'>Submit</button>

            </form>

        </div>
    )
}
