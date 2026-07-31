import React from 'react';

const SortHeader = ({ orden, handleOrdenChange }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-bold">Todas las colecciones</h2>
            
            <div className="flex justify-start sm:justify-end w-full sm:w-auto mt-4 sm:mt-0">
                <label className="flex items-center text-sm w-full sm:w-auto">
                    <span className="mr-2 whitespace-nowrap">Ordenar por:</span>
                    <select 
                        onChange={handleOrdenChange} 
                        value={orden} 
                        className="p-2 border border-gray-200 w-full sm:w-auto outline-none focus:border-gray-400 bg-white cursor-pointer"
                    >
                        <option>Relevantes</option>
                        <option>Últimos modelos</option>
                        <option>Precio: Menor a Mayor</option>
                        <option>Precio: Mayor a Menor</option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export default SortHeader;