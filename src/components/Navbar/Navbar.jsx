import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <section className="flex justify-between items-center p-4 bg-white border-b border-gray-200 w-full">
      <h1 className="text-2xl font-bold text-[#9843fb] cursor-pointer">
        HADA<span className="text-black">JR</span>
      </h1>
      
      <nav className="flex-1 ml-8">
        <ul className="flex list-none gap-4 m-0 p-0">
          <li>
            <Link 
              to="/" 
              className="no-underline text-gray-600 text-sm hover:text-[#9893fb] transition-colors"
            >
              Home
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        <button className="bg-transparent border-none cursor-pointer text-xl flex items-center justify-center text-gray-800 hover:text-[#9893fb] transition-colors">
          <i className="fas fa-search"></i>
        </button>
        
        <Link 
          to="/carrito" 
          className="relative inline-flex items-center bg-transparent border-none cursor-pointer text-xl justify-center text-gray-800 hover:text-[#9893fb] transition-colors"
        >
          <i className="fas fa-shopping-cart"></i>
          <span className="absolute -top-1.5 -right-1.5 rounded-full w-4.5 h-4.5 flex justify-center items-center text-[10px] text-white bg-[#9893fb]">
            0
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Navbar;