import React from 'react';
import { useCart } from '../CartContext/CartContext';

const Cart = () => {
  const { carrito, actualizarCantidad, eliminarProducto } = useCart();

  const handleAumentarCantidad = (productoId) => {
    actualizarCantidad(productoId, 1);
  };

  const handleDisminuirCantidad = (productoId) => {
    const producto = carrito.find((item) => item.id === productoId);
    if (producto.cantidad > 1) {
      actualizarCantidad(productoId, -1);
    }
  };

  // ==========================================
  // CÁLCULOS DEL CARRITO
  // ==========================================
  const costoDeEnvio = 10;
  
  // Calculamos el subtotal (la suma de todos los productos)
  const subTotal = carrito.reduce(
    (acc, producto) => acc + Number(producto.precio) * producto.cantidad, 
    0
  );
  
  // Calculamos el total final
  const total = subTotal + costoDeEnvio;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans text-gray-700">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-gray-900">
        TU <span className="text-[#9893fb]">CARRITO</span>
      </h2>

      {carrito.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <i className="fas fa-shopping-cart text-5xl mb-4 text-gray-300"></i>
          <p className="text-xl font-medium">Tu carrito está vacío</p>
        </div>
      ) : (
        <>
          {/* HEADER DEL CARRITO */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] font-bold text-center pb-4 border-b-2 border-gray-200 uppercase tracking-wider text-sm text-gray-500">
            <p className="text-left pl-4">Producto</p>
            <p>Precio</p>
            <p>Cantidad</p>
            <p>Total</p>
            <p>Acción</p>
          </div>

          {/* LISTA DE PRODUCTOS */}
          <ul className="flex flex-col">
            {carrito.map((producto) => {
              const precioNum = Number(producto.precio);
              const subtotalProducto = precioNum * producto.cantidad;

              return (
                <li 
                  key={producto.id} 
                  className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center text-center py-6 border-b border-gray-200 gap-4 md:gap-0"
                >
                  {/* INFO DEL PRODUCTO */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left pl-0 md:pl-4">
                    <img
                      src={producto.imagen[0] || producto.imagen}
                      alt={producto.nombre}
                      className="w-24 h-24 md:w-20 md:h-20 object-cover rounded-md shadow-sm shrink-0"
                    />
                    <span className="font-semibold text-lg md:text-base text-gray-800">
                      {producto.nombre}
                    </span>
                  </div>

                  {/* PRECIO (PC) */}
                  <p className="text-gray-600 font-medium hidden md:block">
                    S/ {precioNum.toFixed(2)}
                  </p>

                  {/* CONTROLES DE CANTIDAD */}
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => handleDisminuirCantidad(producto.id)} className="bg-gray-100 hover:bg-gray-200 border border-gray-300 w-9 h-9 flex items-center justify-center rounded transition-colors text-lg font-bold text-gray-600">
                      -
                    </button>
                    <input
                      type="number"
                      className="w-14 h-9 text-center border border-gray-300 rounded outline-none font-medium text-gray-800 bg-white"
                      readOnly
                      value={producto.cantidad}
                    />
                    <button onClick={() => handleAumentarCantidad(producto.id)} className="bg-gray-100 hover:bg-gray-200 border border-gray-300 w-9 h-9 flex items-center justify-center rounded transition-colors text-lg font-bold text-gray-600">
                      +
                    </button>
                  </div>

                  {/* VISTA MÓVIL: Resumen del item */}
                  <div className="md:hidden flex justify-between items-center w-full px-2 mt-2 bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-sm">S/ {precioNum.toFixed(2)} c/u</p>
                    <p className="font-bold text-[#9893fb] text-lg">S/ {subtotalProducto.toFixed(2)}</p>
                    <button onClick={() => eliminarProducto(producto.id)} className="text-gray-400 hover:text-red-500 text-xl transition-colors">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>

                  {/* SUBTOTAL PRODUCTO (PC) */}
                  <p className="hidden md:block font-bold text-[#9893fb] text-lg">
                    S/ {subtotalProducto.toFixed(2)}
                  </p>

                  {/* BOTÓN ELIMINAR (PC) */}
                  <button onClick={() => eliminarProducto(producto.id)} className="hidden md:block text-gray-400 hover:text-red-500 text-xl mx-auto transition-colors">
                    <i className="fas fa-trash"></i>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ========================================= */}
          {/* RESUMEN DE LA COMPRA (Actualizado con Envío) */}
          {/* ========================================= */}
          <div className="mt-8 w-full md:w-2/5 lg:w-1/3 ml-auto flex flex-col bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold uppercase border-b-2 border-gray-200 pb-3 mb-5 text-gray-800">
              Resumen de la compra
            </h3>

            <div className="flex justify-between items-center mb-3 text-gray-600">
              <span className="font-medium">Total parcial</span>
              <span>S/ {subTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center mb-4 text-gray-600">
              <span className="font-medium">Tarifa de envío</span>
              <span>S/ {costoDeEnvio.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center mb-6 text-xl font-bold border-t border-gray-200 pt-4 text-gray-900">
              <span>Total</span>
              <span className="text-[#9893fb]">S/ {total.toFixed(2)}</span>
            </div>

            <button className="w-full py-4 bg-black text-white font-bold uppercase tracking-wider rounded hover:bg-gray-800 transition-colors shadow-md">
              Pasar por la caja
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;