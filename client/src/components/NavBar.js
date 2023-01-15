import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function NavBar() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    return (
        <div>
            <nav>
                <div className="nav-wrapper #d81b60 pink darken-1">
                    <Link to="/" className="brand-logo left-align">Quotes App-RD</Link>
                    <ul id="nav-mobile" className="right ">
                        {
                            token ?
                                <>
                                    <li><Link to='/profile'>Profile</Link></li>
                                    <li><Link to="/create">Create</Link></li>
                                    <li><button className="red btn" onClick={() => {
                                        localStorage.removeItem("token")
                                        navigate('/login')
                                    }}>Logout</button></li>

                                </> :
                                <>
                                    <li><Link to="/login">Login</Link></li>
                                    <li><Link to="/signup">Signup</Link></li>

                                </>
                        }


                    </ul>
                </div>
            </nav>
        </div>
    )
}
