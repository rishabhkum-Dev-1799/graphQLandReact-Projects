import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_PROFILE } from '../gqlqueries/queries';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_PROFILE);
    if (!localStorage.getItem("token")) {
        navigate('/login');
    }
    if (loading) {
        return (
            <h2>Loading.....</h2>
        )
    }


    return (
        <div className='container  my-Container'>
            {error && <div className='red card-panel'>{error.message}</div>}
            <div className='center-align'>
                <img className='circle' style={{ border: "2px black solid", marginTop: "10px" }} src={`https://robohash.org/${data.myProfile.firstName}.png?size=200x200`} alt='ProfileImage' />
                <h4>{data.myProfile.firstName} {data.myProfile.lastName}</h4>
                <h5>{data.myProfile.email}</h5>
            </div>
            <h3>Your Quotes</h3>
            {data.myProfile.quotes.map((quo) => {
                return (
                    <blockquote className='left-align'>
                        <h6>{quo.name}</h6>
                    </blockquote>
                )
            })}

        </div>
    )
}
