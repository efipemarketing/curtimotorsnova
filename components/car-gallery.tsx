'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CarGalleryProps {
  images: string[]
  vehicleName: string
}

export function CarGallery({ images, vehicleName }: CarGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious()
    if (e.key === 'ArrowRight') goToNext()
    if (e.key === 'Escape') setIsLightboxOpen(false)
  }

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <motion.div
          className="relative aspect-[16/10] rounded-xl overflow-hidden bg-muted cursor-pointer group"
          onClick={() => setIsLightboxOpen(true)}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={images[selectedIndex] || '/placeholder-car.jpg'}
            alt={`${vehicleName} - Imagem ${selectedIndex + 1}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <ZoomIn className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 text-white text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </motion.div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  'relative w-24 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all',
                  selectedIndex === index
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-transparent hover:border-border'
                )}
              >
                <Image
                  src={image}
                  alt={`${vehicleName} - Miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 z-10 h-12 w-12"
                  onClick={(e) => {
                    e.stopPropagation()
                    goToPrevious()
                  }}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 z-10 h-12 w-12"
                  onClick={(e) => {
                    e.stopPropagation()
                    goToNext()
                  }}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Main Image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-5xl h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIndex]}
                alt={`${vehicleName} - Imagem ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>

            {/* Thumbnails */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedIndex(index)
                  }}
                  className={cn(
                    'relative w-16 h-12 rounded-md overflow-hidden shrink-0 border-2 transition-all',
                    selectedIndex === index
                      ? 'border-primary'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                >
                  <Image
                    src={image}
                    alt={`Miniatura ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
