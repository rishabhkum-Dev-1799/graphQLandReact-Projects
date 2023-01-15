import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { CREATE_QUOTE } from '../gqlqueries/mutation';
import { GET_ALL_QUOTES } from '../gqlqueries/queries';
import { useNavigate } from 'react-router-dom';

export default function CreateQuote() {
    const navigate = useNavigate();
    const [createquote, { data, error, loading }] = useMutation(CREATE_QUOTE, {
        refetchQueries: [
            "getAllQuotes",
            "userProfile"
        ]
    });
    const [formData, setformData] = useState({});
    const changeHandler = (event) => {
        setformData({
            ...formData,
            [event.target.name]: event.target.value
        })

    }
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(formData)
        createquote({
            variables: {
                newQuote: formData.quote
            }
        })
    }
    // rendering Logic Starts

    if (loading) {
        return (
            <h2>Loading.....</h2>
        )
    }
    if (!localStorage.getItem("token")) {
        navigate('/login')
    }
    if (error) {
        console.log(error)
    }

    return (
        <div className='container my-Container'>
            {error && <div className='red card-panel'>{error.message}</div>}
            {
                data &&
                <div className="green card-panel">{data.createQuote}</div>
            }
            <h2>
                Create Quotes
            </h2>
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder='Enter your Quote '
                    required
                    name='quote'
                    onChange={changeHandler} />
                <button className='btn #ea80fc purple accent-1' type='submit'>Create Quote</button>
            </form>

        </div>
    )
}