'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { type ReactNode } from 'react'

interface FadeInProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

const directionVariants = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...directionVariants[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration, delay, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  staggerDelay?: number
  className?: string
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ScaleOnHoverProps {
  children: ReactNode
  scale?: number
  className?: string
}

export function ScaleOnHover({ children, scale = 1.02, className }: ScaleOnHoverProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

interface CountUpProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function CountUp({ end, duration = 2, prefix = '', suffix = '', className }: CountUpProps) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={className}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {prefix}
        <motion.span
          initial={{ textContent: '0' }}
          whileInView={{ textContent: String(end) }}
          viewport={{ once: true }}
          transition={{ duration, ease: 'easeOut' }}
        >
          {end}
        </motion.span>
        {suffix}
      </motion.span>
    </motion.span>
  )
}
