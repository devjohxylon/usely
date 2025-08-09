"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export function UselyScrollDemo() {
  return (
    <div className="relative">
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <ContainerScroll
        titleComponent={null}
      >
        <div className="relative mx-auto w-full max-w-6xl">
          {/* Laptop Base */}
          <div className="relative">
            {/* Laptop Screen Bezel */}
            <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black p-6 rounded-t-3xl shadow-2xl">
              {/* Screen */}
              <div className="relative bg-black rounded-2xl overflow-hidden aspect-video shadow-inner">
                {/* Dark overlay to make image blend better */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20 z-10"></div>
                
                <Image
                  src="/dash.png"
                  alt="Usely Dashboard"
                  className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
                  draggable={false}
                  loading="eager"
                  priority
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
                
                {/* Screen reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent z-20 pointer-events-none"></div>
              </div>
              
              {/* Laptop Camera */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full shadow-inner"></div>
            </div>
            
            {/* Laptop Base/Keyboard */}
            <div className="relative">
              {/* Base */}
              <div className="bg-gradient-to-b from-gray-900 to-gray-800 h-8 rounded-b-3xl shadow-lg">
                {/* Trackpad */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-gray-700 rounded-lg border border-gray-600"></div>
              </div>
              
              {/* Shadow under laptop */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-8 bg-black/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
} 