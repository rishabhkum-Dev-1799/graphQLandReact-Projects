import CreateQuote from './components/CreateQuote';
import HomePage from './components/HomePage';
import Login from './components/Login';

import Profile from './components/profile';
import SignUp from './components/signUp';

export const routes = [
    { path: '/', element: <HomePage /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <SignUp /> },
    { path: '/create', element: <CreateQuote /> },
    { path: '/profile', element: <Profile /> }
]
