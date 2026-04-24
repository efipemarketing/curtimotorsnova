'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Award, Handshake, Star, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CarCard } from '@/components/car-card'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-wrapper'
import { getFeaturedVehicles } from '@/lib/mock-data'

const stats = [
  { value: '500+', label: 'Veículos Vendidos' },
  { value: '15', label: 'Anos de Experiência' },
  { value: '98%', label: 'Clientes Satisfeitos' },
  { value: '50+', label: 'Marcas Premium' },
]

const features = [
  {
    icon: Shield,
    title: 'Garantia de Procedência',
    description: 'Todos os veículos passam por rigorosa inspeção e verificação de histórico completo.',
  },
  {
    icon: Award,
    title: 'Qualidade Premium',
    description: 'Selecionamos apenas os melhores veículos do mercado, garantindo excelência em cada detalhe.',
  },
  {
    icon: Handshake,
    title: 'Negociação Transparente',
    description: 'Processo de compra claro e honesto, sem surpresas. Confiança é nossa prioridade.',
  },
]

const testimonials = [
  {
    name: 'Ricardo Mendes',
    role: 'Empresário',
    content: 'Experiência impecável! Comprei meu Porsche 911 com a CurtiMotors e o processo foi extremamente profissional.',
    rating: 5,
  },
  {
    name: 'Ana Carolina Silva',
    role: 'Médica',
    content: 'Atendimento diferenciado e veículos de altíssima qualidade. Recomendo a todos que buscam carros premium.',
    rating: 5,
  },
  {
    name: 'Fernando Costa',
    role: 'Advogado',
    content: 'Já é meu segundo veículo com a CurtiMotors. Confiança total na procedência e na equipe.',
    rating: 5,
  },
]

export default function HomePage() {
  const featuredVehicles = getFeaturedVehicles().slice(0, 6)

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920"
            alt="Carro de luxo"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="container relative z-10 px-4 lg:px-8">
          <div className="max-w-3xl">
            <FadeIn delay={0.2}>
              <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
                Revenda Premium de Automóveis
              </span>
            </FadeIn>

            <FadeIn delay={0.4}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6 text-balance">
                Seu próximo{' '}
                <span className="text-primary">veículo de luxo</span>{' '}
                está aqui
              </h1>
            </FadeIn>

            <FadeIn delay={0.6}>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                Descubra nossa seleção exclusiva de automóveis premium das melhores marcas do mundo. 
                Qualidade, procedência e confiança em cada negociação.
              </p>
            </FadeIn>

            <FadeIn delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  <Link href="/estoque">
                    Ver Estoque Completo
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contato">
                    Fale Conosco
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-1">
            <motion.div
              className="w-1.5 h-3 bg-primary rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container px-4 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-20 lg:py-28">
        <div className="container px-4 lg:px-8">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-primary text-sm font-medium uppercase tracking-wider">
                  Destaques
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">
                  Veículos em Destaque
                </h2>
              </div>
              <Button asChild variant="ghost" className="gap-2 group">
                <Link href="/estoque">
                  Ver todos
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVehicles.map((vehicle, index) => (
              <CarCard key={vehicle.id} vehicle={vehicle} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="container px-4 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Por que nos escolher
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-4">
              A CurtiMotors é diferente
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mais de 15 anos de experiência no mercado premium, com compromisso 
              inabalável com a qualidade e satisfação dos nossos clientes.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="p-8 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28">
        <div className="container px-4 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Depoimentos
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">
              O que nossos clientes dizem
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <StaggerItem key={testimonial.name}>
                <div className="p-8 rounded-xl bg-card border border-border h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 flex-1 leading-relaxed">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-card border-t border-border">
        <div className="container px-4 lg:px-8">
          <FadeIn className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Pronto para encontrar seu próximo veículo?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Entre em contato conosco e agende uma visita. Nossa equipe está pronta 
              para ajudá-lo a encontrar o carro perfeito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                <Link href="/estoque">
                  Explorar Estoque
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a
                  href="https://wa.me/5511999999999?text=Olá! Gostaria de agendar uma visita."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar Visita
                </a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
