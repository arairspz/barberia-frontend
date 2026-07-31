import React, { useState } from 'react'
import ProductList from '../ProductList/ProductList'
import Search from '../Search/Search'
import Hero from '../Hero/Hero'

const Home = ({buscarTermino, mostrarBuscador}) => {
  const [buscarTerminoLocal, setBuscarTerminoLocal] = useState('')
  
  const handleBuscar = (termino) => {
    setBuscarTerminoLocal(termino)
  }
  return (
    <>
     {!mostrarBuscador && <Hero/>}
     {mostrarBuscador && <Search onSearch ={handleBuscar}/>}
    
    <ProductList buscarTermino = {buscarTerminoLocal || buscarTermino}/>
    </>
  )
}

export default Home