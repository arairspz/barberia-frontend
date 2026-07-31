import React, { useState, useEffect } from 'react';

const FilterSidebar = ({ filtros, toggleFiltros, setFiltros }) => {
    const [estructura, setEstructura] = useState({});
    const [cargando, setCargando] = useState(true);

    // 1. Fetch de la estructura completa al cargar la página
    useEffect(() => {
        fetch('http://localhost:4000/estructura', {
            headers: { 'ngrok-skip-browser-warning': 'true' }
        })
        .then(res => res.json())
        .then(data => {
            setEstructura(data);
            setCargando(false);
        })
        .catch(err => {
            console.error("Error al cargar la estructura", err);
            setCargando(false);
        });
    }, []);

    // 2. Extraemos los tipos (las "llaves" del objeto)
    const tiposDisponibles = Object.keys(estructura);

    // 3. Calculamos qué categorías mostrar
    const tipoSeleccionado = filtros.tipos[0]; // Como es selección única, tomamos el primero
    
    // Si hay un tipo seleccionado, mostramos sus categorías. 
    // Si no, mostramos TODAS las categorías juntando los arrays (.flat).
    const categoriasVisibles = tipoSeleccionado 
        ? estructura[tipoSeleccionado] 
        : Object.values(estructura).flat();

    // 4. Función de Tipos mejorada
    const handleTipoChange = (tipo) => {
        setFiltros(prev => {
            const quitandoTipo = prev.tipos.includes(tipo);
            return { 
                ...prev, 
                tipos: quitandoTipo ? [] : [tipo],
                // 🚨 MAGIA: Si cambias de tipo, limpiamos las categorías que tenías marcadas
                categorias: [] 
            };
        });
    };

    return (
        <aside className="w-full lg:w-1/4 xl:w-1/5">
            <h2 className="text-lg font-bold mb-4">Filtros</h2>
            
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 justify-between">
                
                {/* Tipos (Selección Única) - Lo pongo arriba porque es el filtro principal */}
                <div className="flex flex-col p-4 border border-gray-200 w-full">
                    <h3 className="mb-4 text-base font-bold">Tipos</h3>
                    {cargando ? (
                        <p className="text-sm text-gray-500">Cargando tipos...</p>
                    ) : (
                        tiposDisponibles.map((tipo) => (
                            <label key={tipo} className="inline-flex items-center mb-3 cursor-pointer">
                                <input 
                                    onChange={() => handleTipoChange(tipo)} 
                                    type="checkbox" 
                                    checked={filtros.tipos.includes(tipo)}
                                    className="w-4 h-4 shrink-0 cursor-pointer rounded-full accent-blue-600" 
                                />
                                <span className="text-sm ml-2 capitalize">{tipo}</span>
                            </label>
                        ))
                    )}
                </div>

                {/* Categorías (Selección Múltiple) */}
                <div className="flex flex-col p-4 border border-gray-200 w-full mt-4 sm:mt-0 lg:mt-4">
                    <h3 className="mb-4 text-base font-bold">
                        Categorías {tipoSeleccionado && <span className="text-xs text-gray-400 font-normal">de {tipoSeleccionado}</span>}
                    </h3>
                    
                    {cargando ? (
                        <p className="text-sm text-gray-500">Cargando...</p>
                    ) : categoriasVisibles && categoriasVisibles.length > 0 ? (
                        categoriasVisibles.map((cat) => (
                            <label key={cat} className="inline-flex items-center mb-3 cursor-pointer">
                                <input 
                                    onChange={() => toggleFiltros("categorias", cat)} 
                                    type="checkbox" 
                                    checked={filtros.categorias.includes(cat)}
                                    className="w-4 h-4 shrink-0 cursor-pointer accent-blue-600" 
                                />
                                <span className="text-sm ml-2 capitalize">{cat}</span>
                            </label>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No hay categorías disponibles</p>
                    )}
                </div>
                
            </div>
        </aside>
    );
};

export default FilterSidebar;