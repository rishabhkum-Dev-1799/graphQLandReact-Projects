import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../gqlqueries/mutation';

export default function Login() {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const [signInUser, { data, loading, error }] = useMutation(LOGIN_USER);

    if (data) {
        localStorage.setItem("token", data.signInUser.token);
        navigate("/");
    }
    const changehandler = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(formData)
        signInUser({
            variables: {
                signuser: formData
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
            <h3>Login Form</h3  >
            {error && <div className='red card-panel'>{error.message}</div>}

            <form onSubmit={submitHandler}>
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
                <Link to="/signup"><p>Don't have a Account SignUp</p></Link>
                <button className="btn #d81b60 pink darken-1" type='submit'>Login</button>

            </form>

        </div>
    )
}
