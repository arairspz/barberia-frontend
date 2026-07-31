import React, { useEffect, useState } from 'react';
import FilterSidebar from '../FilterSideBar/FilterSidebar';
import SortHeader from '../SortHeader/SortHeader';
import ProductCard from '../ProductCard/ProductCard';

const ProductList = ({buscarTermino}) => {
    const URL_PRUEBA = 'http://localhost:4000/productos';
    const URL_PRODUCCION = ''
    
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);   
    const [orden, setOrden] = useState("Relevantes");
    const [filtros, setFiltros] = useState({ categorias: [], tipos: [] });

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(URL_PRUEBA, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    }
                });
                if (!response.ok) throw new Error("Error al cargar los productos");
                
                const data = await response.json();
                setProductos(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchProductos();
    }, []);

    // Esta función sigue sirviendo para Categorías (selección múltiple)
    const toggleFiltros = (tipoFiltro, valor) => {
        setFiltros((prev) => ({
            ...prev,
            [tipoFiltro]: prev[tipoFiltro].includes(valor)
            ? prev[tipoFiltro].filter((item) => item !== valor)
            : [...prev[tipoFiltro], valor],
        }));
    };


    const normalizarTexto = (texto) => {
        return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    }

    // 🚨 Filtramos verificando tanto la categoría como el tipo
    const productosFiltrados = productos.filter((producto) => {
        // Asumiendo que tus productos tienen propiedades 'categoria' y 'tipo'
        const matchCategoria = filtros.categorias.length === 0 || filtros.categorias.includes(producto.categoria);
        const matchTipo = filtros.tipos.length === 0 || filtros.tipos.includes(producto.tipo);
        
        const matchBuscar = !buscarTermino || normalizarTexto(producto.nombre).includes(normalizarTexto(buscarTermino)) || 
        normalizarTexto(producto.descripcion).includes(normalizarTexto(buscarTermino));

        return matchCategoria && matchTipo && matchBuscar;
    });

    const handleOrdenChange = (e) => {
        setOrden(e.target.value);
    };

    const productosOrdenados = [...productosFiltrados].sort((a, b) => {
        if (orden === "Últimos modelos") {
            const fechaA = new Date(a.fechaCreacion || 0);
            const fechaB = new Date(b.fechaCreacion || 0);
            return fechaB - fechaA;
        }

        const precioA = Number(String(a.precio).replace(/[^0-9.-]+/g, ""));
        const precioB = Number(String(b.precio).replace(/[^0-9.-]+/g, ""));

        if (orden === "Precio: Menor a Mayor") return precioA - precioB;
        if (orden === "Precio: Mayor a Menor") return precioB - precioA;
        
        return 0;
    });

    return (
        <section className="flex flex-col lg:flex-row gap-6 p-4 w-full font-sans">
            {/* 🚨 Pasamos setFiltros también para que el Sidebar maneje la exclusividad */}
            <FilterSidebar 
                filtros={filtros} 
                toggleFiltros={toggleFiltros} 
                setFiltros={setFiltros}
            />

            <main className="flex-1">
                <SortHeader orden={orden} handleOrdenChange={handleOrdenChange} />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {error ? (
                        <p className="text-red-500 col-span-full">{error}</p>
                    ) : productosOrdenados.length > 0 ? (
                        productosOrdenados.map((producto) => (
                            <ProductCard key={producto.id} producto={producto} />
                        ))
                    ) : (
                        <p className="no-results col-span-full text-center text-gray-500 py-8">
                            No hay productos que coincidan con los filtros seleccionados
                        </p>
                    )}
                </div>
            </main>
        </section>
    );
};

export default ProductList;