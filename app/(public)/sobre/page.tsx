'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Target, Eye, Heart, Users, TrendingUp, Award, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-wrapper'

const values = [
  {
    icon: Target,
    title: 'Excelência',
    description: 'Buscamos a perfeição em cada detalhe, desde a seleção dos veículos até o atendimento ao cliente.',
  },
  {
    icon: Eye,
    title: 'Transparência',
    description: 'Todas as informações sobre nossos veículos são claras e completas. Sem surpresas.',
  },
  {
    icon: Heart,
    title: 'Paixão',
    description: 'Somos apaixonados por automóveis e isso se reflete em tudo o que fazemos.',
  },
]

const milestones = [
  { year: '2009', title: 'Fundação', description: 'Início das operações em São Paulo' },
  { year: '2012', title: 'Expansão', description: 'Nova sede com showroom ampliado' },
  { year: '2016', title: 'Reconhecimento', description: 'Prêmio de melhor revenda premium SP' },
  { year: '2020', title: 'Digital', description: 'Lançamento da plataforma online' },
  { year: '2024', title: 'Liderança', description: 'Líder do segmento premium na região' },
]

const team = [
  { name: 'Carlos Eduardo', role: 'CEO & Fundador', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' },
  { name: 'Mariana Santos', role: 'Diretora Comercial', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
  { name: 'Roberto Almeida', role: 'Gerente de Qualidade', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
]

const certifications = [
  'Certificação ISO 9001:2015',
  'Revenda Autorizada Multimarcas',
  'Membro FENAUTO',
  'Selo de Qualidade DETRAN-SP',
]

export default function SobrePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1562141961-b5d13ff38a0d?w=1920"
            alt="Showroom CurtiMotors"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        </div>

        <div className="container relative z-10 px-4 lg:px-8">
          <div className="max-w-2xl">
            <FadeIn>
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                Nossa História
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mt-2 mb-6">
                Sobre a <span className="text-primary">CurtiMotors</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Desde 2009, a CurtiMotors é referência em veículos premium no Brasil. 
                Nossa missão é proporcionar a melhor experiência na aquisição de automóveis 
                de alto padrão, com qualidade, transparência e confiança.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container px-4 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StaggerItem className="text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-heading font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Veículos Vendidos</p>
            </StaggerItem>
            <StaggerItem className="text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-heading font-bold text-primary">450+</p>
              <p className="text-sm text-muted-foreground">Clientes Atendidos</p>
            </StaggerItem>
            <StaggerItem className="text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-heading font-bold text-primary">15</p>
              <p className="text-sm text-muted-foreground">Anos de Mercado</p>
            </StaggerItem>
            <StaggerItem className="text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-heading font-bold text-primary">98%</p>
              <p className="text-sm text-muted-foreground">Satisfação</p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28">
        <div className="container px-4 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              O que nos move
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">
              Nossos Valores
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="p-8 rounded-xl bg-card border border-border h-full">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="container px-4 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Trajetória
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">
              Nossa Jornada
            </h2>
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                    {milestone.year.slice(-2)}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-primary font-medium mb-1">{milestone.year}</p>
                  <h3 className="text-lg font-heading font-semibold mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-28">
        <div className="container px-4 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Equipe
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">
              Nossos Especialistas
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <div className="text-center">
                  <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-heading font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container px-4 lg:px-8">
          <FadeIn className="text-center mb-10">
            <h3 className="text-xl font-heading font-semibold">Certificações e Reconhecimentos</h3>
          </FadeIn>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="px-6 py-3 rounded-full bg-background border border-border text-sm"
              >
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="container px-4 lg:px-8">
          <FadeIn className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Venha nos conhecer
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Visite nosso showroom e descubra por que somos a escolha número um 
              em veículos premium.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/contato">
                  Entre em Contato
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/estoque">
                  Ver Estoque
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
