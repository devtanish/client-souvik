"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const Drawer = ({ isOpen, onClose, Data }: { isOpen: boolean; onClose: () => void; Data: any }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 w-[100%] lg:w-[87%] right-0 rounded-none xl:rounded-t-2xl xl:rounded-r-none h-full bg-white shadow-2xl transition-transform duration-300 z-50 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="relative w-full h-[80vh] overflow-hidden rounded-none xl:rounded-t-2xl xl:rounded-r-none group cursor-pointer">
          <Image
            src={Data.url}
            alt={Data.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover w-full md:w-1/2 xl:w-1/3"
            quality={85}
            priority={false}
          />

        </div>
      </div>
    </>
  );
};

export default Drawer