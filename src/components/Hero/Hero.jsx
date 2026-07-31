import React from 'react';
import hero from '../../assets/normal.jpg';

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-[#f9f9f9] p-5 w-full flex-wrap">
      
      {/* Contenedor de Texto */}
      <div className="flex-1 text-center w-full mb-5 md:mb-0 md:pr-5">
        {/* Nota: Aproveché para corregir un pequeño detalle (BETSELLERS -> BESTSELLERS) */}
        <p className="text-[12px] md:text-[14px] text-[#666] uppercase tracking-[1px] mb-1">
          NUESTROS BESTSELLERS
        </p>
        
        <h1 className="text-[22px] sm:text-[28px] md:text-[36px] text-[#333] m-0 font-bold">
          Últimas llegadas
        </h1>
        
        {/* Le agregué 'cursor-pointer' y un 'hover' sutil usando el morado de tu marca */}
        <p className="text-[14px] sm:text-[16px] md:text-[14px] text-[#333] uppercase border-b border-[#333] pb-[2px] mt-[15px] inline-block cursor-pointer hover:text-[#9843fb] hover:border-[#9843fb] transition-colors">
          COMPRA AHORA
        </p>
      </div>
      
      {/* Contenedor de Imagen */}
      <div className="flex-1 flex justify-center items-center w-full mt-5 md:mt-0">
        <img 
          src={hero} 
          alt="Últimas llegadas" 
          className="w-full h-auto object-cover max-w-full" 
        />
      </div>
      
    </section>
  );
};

export default Hero;