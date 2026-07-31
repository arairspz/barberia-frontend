import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext/CartContext';

const Navbar = ({alternarBuscador}) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { carrito } = useCart();
  const navigate = useNavigate();

  const totalProductos = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);

  const handleHome = () => {
    alternarBuscador();
    navigate('/');
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm font-sans">
      
      {/* 👇 CAMBIO AQUÍ: px-6 sm:px-8 md:px-10 para que alinee perfecto con el Hero 👇 */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 py-4 flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-bold text-[#9843fb] tracking-tight">
          HADA<span className="text-black">JR</span>
        </Link>

        <nav className="hidden md:flex flex-1 ml-12">
          <ul className="flex gap-6 text-sm font-medium">
            <li>
              <Link to="/" className="text-gray-600 hover:text-[#9893fb] transition-colors">
                Inicio
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          <button onClick={handleHome} className="text-gray-700 hover:text-[#9893fb] transition-colors text-xl flex items-center">
            <i className="fas fa-search"></i>
          </button>
          
          <Link to="/carrito" className="relative text-gray-700 hover:text-[#9893fb] transition-colors text-xl flex items-center">
            <i className="fas fa-shopping-cart"></i>
            {totalProductos > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#9893fb] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md">
                {totalProductos}
              </span>
            )}
          </Link>

          <button 
            className="md:hidden text-gray-700 hover:text-[#9893fb] text-xl ml-2 transition-colors"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <i className={`fas ${menuAbierto ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {menuAbierto && (
        <nav className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-xl">
          <ul className="flex flex-col px-6 py-4 gap-4 text-gray-600 font-medium">
            <li>
              <Link 
                to="/" 
                className="block w-full text-left hover:text-[#9893fb] transition-colors"
                onClick={() => setMenuAbierto(false)}
              >
                Inicio
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;