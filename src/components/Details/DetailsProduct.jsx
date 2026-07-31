import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../CartContext/CartContext';

const DetailsProduct = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const port = '4000';

  const {agregarAlCarrito} = useCart()
  const handleAgregarAlCarrito = () => {
    if(producto) {
      agregarAlCarrito({
        id: producto.id,
        imagen: producto.imagen,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1
      })
    }
  }

  useEffect(() => {
    const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
    const fetchProducto = async () => {
      try {
        const response = await fetch(`${API_URL}/productos/${id}`, {
            headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        
        if (!response.ok) {
          if (response.status === 404) throw new Error("El producto no existe o fue eliminado");
          throw new Error("Error al cargar los detalles del producto");
        }
        
        const data = await response.json();
        setProducto(data);
      } catch (err) {
        setError(err.message);
      }
    };
    
    fetchProducto();
  }, [id]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] w-full">
        <h2 className="text-xl font-bold text-red-500">{error}</h2>
      </div>
    );
  }

  return (
    // 🚨 Cambiamos 'max-w-6xl mx-auto' por 'w-full' para que ocupe el 100% de la pantalla
    <div className="w-full p-4 md:p-8 text-gray-700 font-sans">
      {producto ? (
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between w-full">
          
          {/* SECCIÓN DE IMÁGENES */}
          <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              <img 
                src={producto.imagen[0] || producto.imagen} 
                alt={`Miniatura ${producto.nombre}`} 
                className="w-16 h-16 md:w-20 md:h-20 object-cover rounded cursor-pointer border-2 border-transparent hover:border-gray-400 shrink-0" 
              />
            </div>
            <div className="flex-1 w-full">
              <img 
                src={producto.imagen[0] || producto.imagen} 
                alt={producto.nombre} 
                className="w-full h-auto object-cover rounded-lg shadow-sm"
              />
            </div>
          </div>

          {/* SECCIÓN DE INFORMACIÓN */}
          <div className="w-full md:w-1/2 flex flex-col items-center text-center md:items-start md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
              {producto.nombre}
            </h1>
            
            <p className="text-3xl md:text-4xl font-bold text-[#9893fb] mb-4">
              S/ {producto.precio}
            </p>
            
            {/* Aumenté un poco el margen inferior (mb-8) ya que quitamos las tallas */}
            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              {producto.descripcion}
            </p>

            <button onClick={handleAgregarAlCarrito} className="w-full md:w-auto px-10 py-4 bg-black text-white uppercase tracking-wide font-bold hover:bg-gray-800 transition-colors rounded">
              Añadir al carrito
            </button>
            
            <p className="text-xs md:text-sm text-gray-500 mt-8 leading-relaxed border-t border-gray-200 pt-6 w-full">
              Producto 100% original. El pago contra reembolso está disponible para este producto.<br/>
              Política de privacidad y cambio fácil dentro de los 7 días.
            </p>
          </div>

        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[50vh] w-full">
          <p className="text-lg text-gray-500 animate-pulse font-medium">Cargando producto...</p>
        </div>
      )}
    </div>
  );
}

export default DetailsProduct;