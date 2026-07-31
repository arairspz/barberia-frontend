import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
    
  const agregarAlCarrito = (producto) => {
    setCarrito((carritoAnterior) => {
      // Verificamos si ya existe el producto con .find()
      const yaExisteElProducto = carritoAnterior.find(
        (articulo) => articulo.id === producto.id
      );
      
      if (yaExisteElProducto) {
        // Usamos .map() para crear un objeto completamente NUEVO con la cantidad sumada
        return carritoAnterior.map((articulo) => 
          articulo.id === producto.id 
            ? { ...articulo, cantidad: articulo.cantidad + 1 }
            : articulo
        );
      } else {
        // Si no existe, lo agregamos normalmente
        return [...carritoAnterior, { ...producto, cantidad: 1 }];
      }
    });
  };
    
  const actualizarCantidad = (productoId, cantidad) => {
    setCarrito((carritoAnterior) =>
      carritoAnterior.map((producto) => 
        producto.id === productoId
          ? { ...producto, cantidad: producto.cantidad + cantidad }
          : producto
      )
    );
  };

  const eliminarProducto = (productoId) => {
    // 🚨 CORRECCIÓN: Pasamos el resultado del filter directamente a setCarrito
    setCarrito((carritoAnterior) => 
      carritoAnterior.filter((producto) => producto.id !== productoId)
    );
  };

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, actualizarCantidad, eliminarProducto }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);