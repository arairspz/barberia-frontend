import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [buscarTermino, setBuscarTermino] = useState("");

  const handleBuscarChange = (e) => {
    const termino = e.target.value;
    setBuscarTermino(termino);
    onSearch(termino);
  };

  return (
    <section className="flex justify-center items-center bg-[#f9f9f9] w-full p-3 md:p-4">
      <input 
        type="text" 
        placeholder="Buscar" 
        className="w-full max-w-100 py-2.5 px-4 text-base border border-black/50 outline-none transition-colors duration-300 ease-in-out focus:border-black placeholder:text-[#aaa] placeholder:italic bg-white rounded-sm"
        value={buscarTermino}
        onChange={handleBuscarChange} 
      />
    </section>
  );
};

export default Search;