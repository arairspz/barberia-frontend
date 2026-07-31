import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ producto }) => {
    // 🚨 1. Inicializamos useNavigate aquí dentro
    const navigate = useNavigate();

    // 🚨 2. Creamos la función de redirección
    const handleClick = () => {
        navigate(`/producto/${producto.id}`);
    };
    
    return (
        // 🚨 3. Le agregamos el onClick al contenedor principal
        <div 
            onClick={handleClick} 
            className="text-center bg-white overflow-hidden transition-all duration-200 hover:shadow-md p-2 sm:p-3 group cursor-pointer"
        >
            <div className="overflow-hidden mb-3 bg-gray-50 flex items-center justify-center">
                <img 
                    src={producto.imagen[0] || producto.imagen} 
                    alt={producto.nombre}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            
            <h3 className="text-[11px] sm:text-xs md:text-sm font-medium text-left truncate text-gray-800">
                {producto.nombre}
            </h3>
            <h4 className="text-[11px] sm:text-xs md:text-sm font-medium text-left truncate text-gray-800 text-gray-500">
                {producto.descripcion}
            </h4>
            <p className="text-xs sm:text-sm md:text-base font-semibold text-[#9893fb] text-left mt-1">
                S/ {producto.precio}
            </p>
        </div>
    );
};

export default ProductCard;