import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../features/user';

function Navbar2() {
    const dispatch = useDispatch();
    const {isAuthenticated, user} = useSelector(state=>state.user)
    const name = user?.name
  const guestLinks = (
    <div className="flex flex-row ml-auto">
      <Link to="/login">
        <button className="bg-white font-bold w-24 rounded-md mr-2 text-sm px-4 py-1 hover:bg-black hover:text-white">
          Log In
        </button>
      </Link>
      <Link to="/register">
        <button className="bg-white font-bold w-24 rounded-md text-sm px-4 py-1 hover:bg-black hover:text-white">
          Sign Up
        </button>
      </Link>
    </div>
  );

  const authLinks = (
    <div className="flex flex-row ml-auto">
        <h1 className='text-white font-bold px-2'>{name}</h1>
      <Link to="/login">
        <button className="bg-white font-bold w-24 rounded-md mr-2 text-sm px-4 py-1 hover:bg-black hover:text-white"
        onClick={() => {
          dispatch(logout());
        }}>
          Logout
        </button>
      </Link>
    </div>
  );

  return (
    <nav className="bg-[#0C0C0C] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          To-Do App
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-white px-3 rounded hover:bg-[#9B3922]">
            Home
          </Link>
          {/* Conditional rendering based on user authentication */}
          {isAuthenticated ? authLinks : guestLinks}
          {/* {guestLinks}
          {authLinks} */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar2;
