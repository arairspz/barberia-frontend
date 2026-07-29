import React, { useEffect, useState } from 'react';

const ProductList = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const URL = "https://voicing-bobtail-bankbook.ngrok-free.dev"; 

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(URL,{
                    method: 'GET', // o POST, PUT, etc.
                    headers: {'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true' // Este es el pase VIP para saltar la advertencia
                    }
                });
                if (!response.ok) {
                    throw new Error("Error al cargar los productos");
                }
                const data = await response.json();
                setProductos(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchProductos();
    }, []);

    return (
        // Contenedor principal: columna en móvil, fila (flex-row) en pantallas grandes (lg)
        <section className="flex flex-col lg:flex-row gap-6 p-4 w-full font-sans">
            
            {/* Sidebar de Filtros */}
            <aside className="w-full lg:w-1/4 xl:w-1/5">
                <h2 className="text-lg font-bold mb-4">Filtros</h2>
                
                <div className="flex flex-col sm:flex-row lg:flex-col gap-4 justify-between">
                    {/* Categorías */}
                    <div className="flex flex-col p-4 border border-gray-200 w-full">
                        <h3 className="mb-4 text-base font-bold">Categorías</h3>
                        <label className="inline-flex items-center mb-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 shrink-0 cursor-pointer" />
                            <span className="text-sm ml-2">Hombres</span>
                        </label>
                        <label className="inline-flex items-center mb-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 shrink-0 cursor-pointer" />
                            <span className="text-sm ml-2">Mujeres</span>
                        </label>
                        <label className="inline-flex items-center mb-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 shrink-0 cursor-pointer" />
                            <span className="text-sm ml-2">Niños</span>
                        </label>
                    </div>

                    {/* Tipos */}
                    <div className="flex flex-col p-4 border border-gray-200 w-full">
                        <h3 className="mb-4 text-base font-bold">Tipos</h3>
                        <label className="inline-flex items-center mb-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 shrink-0 cursor-pointer" />
                            <span className="text-sm ml-2">Prendas</span>
                        </label>
                        <label className="inline-flex items-center mb-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 shrink-0 cursor-pointer" />
                            <span className="text-sm ml-2">Ropa interior</span>
                        </label>
                        <label className="inline-flex items-center mb-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 shrink-0 cursor-pointer" />
                            <span className="text-sm ml-2">Calzados</span>
                        </label>
                    </div>
                </div>
            </aside>

            {/* Contenido Principal */}
            <main className="flex-1">
                
                {/* Cabecera de Opciones */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <h2 className="text-xl font-bold">Todas las colecciones</h2>
                    
                    <div className="flex justify-start sm:justify-end w-full sm:w-auto mt-4 sm:mt-0">
                        <label className="flex items-center text-sm w-full sm:w-auto">
                            <span className="mr-2 whitespace-nowrap">Ordenar por:</span>
                            <select className="p-2 border border-gray-200 w-full sm:w-auto outline-none focus:border-gray-400 bg-white cursor-pointer">
                                <option>Relevantes</option>
                                <option>Precio: Menor a mayor</option>
                                <option>Precio: Mayor a menor</option>
                            </select>
                        </label>
                    </div>
                </div>

                {/* 
                  Grid de Productos: 
                  - grid-cols-2 asegura las 2 columnas exactas en celular (estilo Nike)
                  - md:grid-cols-3 para tablets
                  - lg:grid-cols-4 para escritorio 
                */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {error ? (
                        <p className="text-red-500 col-span-full">{error}</p>
                    ) : (
                        productos.map((producto) => {
                            return (
                                <div 
                                    className="text-center bg-white overflow-hidden transition-all duration-200 hover:shadow-md p-2 sm:p-3 group cursor-pointer" 
                                    key={producto.id}
                                >
                                    {/* Contenedor de la imagen */}
                                    <div className="overflow-hidden mb-3 bg-gray-50 flex items-center justify-center">
                                        <img 
                                            src={producto.imagen}
                                            alt={producto.image}
                                            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    
                                    <h3 className="text-[11px] sm:text-xs md:text-sm font-medium text-left truncate text-gray-800">
                                        {producto.nombre}
                                    </h3>
                                    <p className="text-xs sm:text-sm md:text-base font-semibold text-[#9893fb] text-left mt-1">
                                        {producto.precio}
                                    </p>
                                </div>
                            );
                        })
                    )}
                </div>
            </main>
        </section>
    );
}

export default ProductList;