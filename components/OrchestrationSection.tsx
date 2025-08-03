'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  Smartphone, 
  Monitor, 
  Server, 
  Zap, 
  Brain, 
  Bot, 
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  MessageSquare,
  Globe,
  Settings,
  MoreHorizontal,
  HelpCircle
} from 'lucide-react';

// This line is cooler than your startup idea
const NetworkNode = ({ 
  icon: Icon, 
  label, 
  x, 
  y, 
  size = 40, 
  color = "white", 
  delay = 0,
  isActive = false,
  iconColor = "white",
  imageSrc
}: {
  icon: any;
  label?: string;
  x: number;
  y: number;
  size?: number;
  color?: string;
  delay?: number;
  isActive?: boolean;
  iconColor?: string;
  imageSrc?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* Glow effect */}
      <motion.circle
        cx={x}
        cy={y}
        r={size / 2 + (isHovered ? 6 : 3)}
        fill={color}
        opacity={isHovered ? 0.2 : 0.05}
        animate={{
          scale: isHovered ? 1.15 : 1,
          opacity: isHovered ? 0.3 : 0.05
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main node circle */}
      <motion.circle
        cx={x}
        cy={y}
        r={size / 2}
        fill={isActive ? "#3b82f6" : "#1f2937"}
        stroke={isActive ? "#60a5fa" : "#374151"}
        strokeWidth={1.5}
        animate={{
          scale: isHovered ? 1.05 : 1,
          strokeWidth: isHovered ? 2 : 1.5
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Icon or Image */}
      <motion.foreignObject
        x={x - size / 3}
        y={y - size / 3}
        width={size * 2 / 3}
        height={size * 2 / 3}
        animate={{
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-center w-full h-full">
          {imageSrc ? (
                         <Image 
               src={imageSrc}
               alt="Logo"
               width={size / 1.2}
               height={size / 1.2}
               className="rounded-full"
             />
          ) : (
            <Icon 
              size={size / 2.5} 
              className={`${isActive ? 'text-white' : `text-${iconColor}`}`}
            />
          )}
        </div>
      </motion.foreignObject>
    </motion.g>
  );
};

// Animated connection line with flowing particles
const ConnectionLine = ({ 
  x1, 
  y1, 
  x2, 
  y2, 
  delay = 0,
  isActive = false,
  isCurved = false
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
  isActive?: boolean;
  isCurved?: boolean;
}) => {
  const [particles, setParticles] = useState<Array<{id: number; progress: number}>>([]);
  
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setParticles(prev => [
          ...prev.filter(p => p.progress < 1),
          { id: Date.now(), progress: 0 }
        ]);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isActive]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({ ...p, progress: p.progress + 0.015 }))
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  // Create curved path for vertical connections
  const createCurvedPath = () => {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const controlX = midX + 30;
    return `M ${x1} ${y1} Q ${controlX} ${midY} ${x2} ${y2}`;
  };
  
  return (
    <g>
      {/* Base line */}
      {isCurved ? (
        <motion.path
          d={createCurvedPath()}
          fill="none"
          stroke="#374151"
          strokeWidth={1.5}
          strokeDasharray="3,3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay, duration: 1.2, ease: "easeOut" }}
        />
      ) : (
        <motion.line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#374151"
          strokeWidth={1.5}
          strokeDasharray="3,3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay, duration: 1, ease: "easeOut" }}
        />
      )}
      
      {/* Active flow line */}
      {isActive && (
        <>
          {isCurved ? (
            <motion.path
              d={createCurvedPath()}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: delay + 0.3, duration: 1.5, ease: "easeOut" }}
            />
          ) : (
            <motion.line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#3b82f6"
              strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: delay + 0.3, duration: 1.5, ease: "easeOut" }}
            />
          )}
        </>
      )}
      
      {/* Flowing particles */}
      {particles.map(particle => {
        let x, y;
        if (isCurved) {
          const progress = particle.progress;
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;
          const controlX = midX + 30;
          
          // Quadratic bezier curve calculation
          const t = progress;
          x = Math.pow(1 - t, 2) * x1 + 2 * (1 - t) * t * controlX + Math.pow(t, 2) * x2;
          y = Math.pow(1 - t, 2) * y1 + 2 * (1 - t) * t * midY + Math.pow(t, 2) * y2;
        } else {
          x = x1 + (x2 - x1) * particle.progress;
          y = y1 + (y2 - y1) * particle.progress;
        }
        
        return (
          <motion.circle
            key={particle.id}
            cx={x}
            cy={y}
            r={1.5}
            fill="#60a5fa"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ 
              opacity: 0, 
              scale: 0,
              transition: { duration: 1 }
            }}
          />
        );
      })}
    </g>
  );
};

export default function OrchestrationSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFlow, setActiveFlow] = useState(0);
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlow(prev => (prev + 1) % 7);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };
  
  // Network coordinates (responsive)
  const centerX = 400;
  const centerY = 250;
  const leftX = 150;
  const rightX = 650;
  
  // Vertical positions for provider nodes
  const providerYPositions = [80, 130, 180, 230, 280, 330, 380];
  
  return (
    <section className="pt-6 pb-12 px-6 md:px-12 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
            variants={itemVariants}
          >
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Smart Routing</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Intelligent{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              request routing
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We dynamically route requests from devices to the optimal AI model—OpenAI, Anthropic, Google, and more.
          </p>
        </motion.div>
        
        {/* Network Diagram */}
        <motion.div 
          className="relative mx-auto w-full"
          variants={itemVariants}
        >
          <svg 
            width="100%" 
            height="500" 
            viewBox="0 0 800 500" 
            className="w-full h-auto"
          >
              {/* Main horizontal connection */}
              <ConnectionLine 
                x1={leftX + 25} 
                y1={centerY} 
                x2={centerX - 40} 
                y2={centerY} 
                delay={0.2}
                isActive={activeFlow === 0}
              />
              
              {/* Vertical connections to providers */}
              {providerYPositions.map((y, index) => (
                <ConnectionLine 
                  key={index}
                  x1={centerX + 40} 
                  y1={centerY} 
                  x2={rightX - 25} 
                  y2={y} 
                  delay={0.4 + index * 0.1}
                  isActive={activeFlow === index + 1}
                  isCurved={true}
                />
              ))}
              
              {/* Left node - User Device */}
              <NetworkNode 
                icon={Monitor}
                x={leftX}
                y={centerY}
                delay={0.1}
              />
              
                             {/* Center node - Usely Gateway */}
               <NetworkNode 
                 icon={Zap}
                 x={centerX}
                 y={centerY}
                 size={55}
                 color="#3b82f6"
                 delay={0.3}
                 isActive={true}
                 imageSrc="/uselylogo.png"
               />
              
                             {/* Provider nodes - vertical column */}
               <NetworkNode 
                 icon={Brain}
                 x={rightX}
                 y={providerYPositions[0]}
                 delay={0.5}
                 iconColor="white"
               />
               
               <NetworkNode 
                 icon={MessageSquare}
                 x={rightX}
                 y={providerYPositions[1]}
                 delay={0.6}
                 iconColor="white"
               />
               
               <NetworkNode 
                 icon={Globe}
                 x={rightX}
                 y={providerYPositions[2]}
                 delay={0.7}
                 iconColor="white"
               />
               
               <NetworkNode 
                 icon={Settings}
                 x={rightX}
                 y={providerYPositions[3]}
                 delay={0.8}
                 iconColor="white"
               />
               
               <NetworkNode 
                 icon={MoreHorizontal}
                 x={rightX}
                 y={providerYPositions[4]}
                 delay={0.9}
                 iconColor="white"
               />
               
               <NetworkNode 
                 icon={Bot}
                 x={rightX}
                 y={providerYPositions[5]}
                 delay={1.0}
                 iconColor="white"
               />
               
               <NetworkNode 
                 icon={HelpCircle}
                 x={rightX}
                 y={providerYPositions[6]}
                 delay={1.1}
                 iconColor="white"
               />
             </svg>
           </motion.div>
         </div>
       </section>
     );
   } 