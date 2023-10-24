import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Task Manager
        </Link>
        <div>
          <Link to="/sign-up" className="text-white mr-4">
            Sign Up
          </Link>
          <Link to="/sign-in" className="text-white">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
