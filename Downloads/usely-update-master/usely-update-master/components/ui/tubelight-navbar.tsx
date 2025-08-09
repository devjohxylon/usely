"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { LucideIcon, LogIn, UserPlus } from "lucide-react"
import { cn } from "../../lib/utils"
import ProfileMenu from "../ProfileMenu"
import { useUser } from "../../contexts/UserContext"
import { usePathname } from "next/navigation"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  authModalOpen?: boolean
  setAuthModalOpen?: (open: boolean) => void
  authMode?: 'login' | 'register'
  setAuthMode?: (mode: 'login' | 'register') => void
}

export function NavBar({ items, className, authModalOpen = false, setAuthModalOpen, authMode = 'login', setAuthMode }: NavBarProps) {
  const { user } = useUser();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
             className={cn(
         "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-30 mb-6 sm:pt-6 pointer-events-none",
         className,
       )}
    >
      <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg pointer-events-auto">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2 px-4 py-2">
          <Image 
            src="/uselylogo.png" 
            alt="Usely Logo" 
            width={24} 
            height={24}
            className="transition-all duration-200"
          />
          <span className="font-bold text-foreground text-sm hidden sm:inline">Usely</span>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-border/50 mx-2"></div>

        {/* Navigation Items */}
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.url

          return (
            <Link
              key={item.name}
              href={item.url}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors flex items-center gap-2",
                "text-foreground/80 hover:text-white",
                isActive && "bg-white/10 text-white",
              )}
            >
              <Icon size={16} strokeWidth={2.5} />
              <span className="hidden md:inline">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-white/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full">
                    <div className="absolute w-12 h-6 bg-white/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-white/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}

        {/* Divider */}
        <div className="w-px h-6 bg-border/50 mx-2"></div>

        {/* Auth Buttons or Profile Menu */}
        <div className="flex items-center gap-2 px-2">
          {user ? (
            <ProfileMenu user={user} />
          ) : (
            <>
              {/* Login Button */}
              <button
                onClick={() => {
                  setAuthMode?.('login')
                  setAuthModalOpen?.(true)
                }}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors flex items-center gap-1",
                  "text-foreground/80 hover:text-white hover:bg-white/10",
                )}
              >
                <LogIn size={16} strokeWidth={2.5} />
                <span className="hidden md:inline">Login</span>
              </button>

              {/* Sign Up Button */}
              <button
                onClick={() => {
                  setAuthMode?.('register')
                  setAuthModalOpen?.(true)
                }}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors flex items-center gap-1",
                  "bg-white text-black hover:bg-white/90",
                )}
              >
                <UserPlus size={16} strokeWidth={2.5} />
                <span className="hidden md:inline">Register</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 