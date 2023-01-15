import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_QUOTES } from '../gqlqueries/queries'

export default function HomePage() {
    const { loading, error, data } = useQuery(GET_ALL_QUOTES);

    if (loading) {
        return (
            <div>
                <h3>Loading........</h3>
            </div>
        )
    }
    if (error) {
        console.log(error.message)
    }
    return (
        <div className='container'>
            <h3>
                Quotes
            </h3>
            {data.quotes.map((quote) => {
                return (
                    <blockquote className='left-align'>
                        <h6>{quote.name}</h6>
                        <p className='right-align'>~{quote.by.firstName}</p>
                    </blockquote>
                )
            })}
        </div>
    )


}
