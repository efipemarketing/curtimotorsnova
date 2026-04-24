'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/estoque', label: 'Estoque' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <span className="text-2xl font-bold font-heading tracking-tight">
                <span className="text-primary">Curti</span>
                <span className="text-foreground">Motors</span>
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-sm font-medium transition-colors hover:text-primary',
                  pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Button asChild variant="outline" size="sm" className="gap-2">
              <a href="tel:+5511999999999">
                <Phone className="h-4 w-4" />
                <span>(11) 99999-9999</span>
              </a>
            </Button>
            <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a
                href="https://wa.me/5511999999999?text=Olá! Gostaria de mais informações sobre os veículos."
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'block py-2 text-lg font-medium transition-colors hover:text-primary',
                      pathname === link.href ? 'text-primary' : 'text-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-4 space-y-3"
              >
                <Button asChild variant="outline" className="w-full gap-2">
                  <a href="tel:+5511999999999">
                    <Phone className="h-4 w-4" />
                    <span>(11) 99999-9999</span>
                  </a>
                </Button>
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <a
                    href="https://wa.me/5511999999999?text=Olá! Gostaria de mais informações sobre os veículos."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fale pelo WhatsApp
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
