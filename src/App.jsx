import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./components/Home/Home";
import Navbar from './components/Navbar/Navbar';
import DetailsProduct from './components/Details/DetailsProduct';
import { CartProvider } from './components/CartContext/CartContext';
import Cart from './components/Cart/Cart';
import Search from './components/Search/Search'; 

const App = () => {
  const [buscarTermino, setBuscarTermino] = useState('');
  const [mostrarBuscador, setMostrarBuscador] = useState(false);

  const handleBuscar = (termino) => {
    setBuscarTermino(termino.toLowerCase()); 
  };
  
  const alternarBuscador = () => {
    setMostrarBuscador(!mostrarBuscador);
  };

  return (
    <CartProvider>
      <Router>
        <Navbar alternarBuscador={alternarBuscador} />
        
        {/* 👇 AQUÍ ESTÁ LA MAGIA: El contenedor principal con márgenes estilo Nike 👇 */}
        <main className="max-w-6xl mx-auto w-full px-6 sm:px-8 md:px-10 py-8 md:py-12">
          <Routes>
            <Route path='/' element={<Home buscarTermino={buscarTermino} mostrarBuscador={mostrarBuscador} />} />
            <Route path='/producto/:id' element={<DetailsProduct/>} />
            <Route path='/carrito' element={<Cart/>} />
            <Route path='/search' element={<Search onSearch={handleBuscar}/>} />
          </Routes>
        </main>

      </Router>
    </CartProvider>
  );
};

export default App;