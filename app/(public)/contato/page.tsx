'use client'

import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ContactForm } from '@/components/contact-form'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-wrapper'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Endereço',
    content: 'Av. Europa, 1000 - Jardim Europa\nSão Paulo - SP, 01449-000',
    link: 'https://maps.google.com/?q=Av.+Europa+1000+São+Paulo',
  },
  {
    icon: Phone,
    title: 'Telefone',
    content: '(11) 99999-9999\n(11) 3333-3333',
    link: 'tel:+5511999999999',
  },
  {
    icon: Mail,
    title: 'E-mail',
    content: 'contato@curtimotors.com.br\nvendas@curtimotors.com.br',
    link: 'mailto:contato@curtimotors.com.br',
  },
  {
    icon: Clock,
    title: 'Horário',
    content: 'Seg - Sex: 9h às 19h\nSáb: 9h às 15h',
    link: null,
  },
]

export default function ContatoPage() {
  return (
    <>
      {/* Header */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-card to-background">
        <div className="container px-4 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Entre em <span className="text-primary">Contato</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Estamos prontos para ajudá-lo a encontrar o veículo perfeito. 
              Entre em contato por qualquer um de nossos canais.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container px-4 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => (
              <StaggerItem key={info.title}>
                <div className="p-6 rounded-xl bg-card border border-border h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold mb-2">{info.title}</h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-muted-foreground text-sm whitespace-pre-line hover:text-primary transition-colors"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-muted-foreground text-sm whitespace-pre-line">
                      {info.content}
                    </p>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-20">
        <div className="container px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FadeIn>
              <div className="bg-card p-8 rounded-xl border border-border">
                <h2 className="text-2xl font-heading font-bold mb-2">
                  Envie uma mensagem
                </h2>
                <p className="text-muted-foreground mb-6">
                  Preencha o formulário abaixo e entraremos em contato em breve.
                </p>
                <ContactForm />
              </div>
            </FadeIn>

            {/* Map & WhatsApp */}
            <div className="space-y-6">
              <FadeIn delay={0.2}>
                <div className="aspect-video rounded-xl overflow-hidden border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.8455853461!2d-46.6739871!3d-23.5702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c7dde8f43b%3A0x89d4c4c4c4c4c4c4!2sAv.%20Europa%2C%201000%20-%20Jardim%20Europa%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização CurtiMotors"
                  />
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="bg-[#25D366]/10 p-6 rounded-xl border border-[#25D366]/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold mb-1">
                        Prefere WhatsApp?
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Converse diretamente com nossa equipe de vendas pelo WhatsApp 
                        para um atendimento mais rápido.
                      </p>
                      <Button
                        asChild
                        className="bg-[#25D366] hover:bg-[#25D366]/90 text-white"
                      >
                        <a
                          href="https://wa.me/5511999999999?text=Olá! Gostaria de mais informações."
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Iniciar Conversa
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.6}>
                <div className="bg-card p-6 rounded-xl border border-border">
                  <h3 className="font-heading font-semibold mb-4">
                    Informações Importantes
                  </h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      Agendamentos de visita são recomendados para garantir disponibilidade.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      Oferecemos test-drive mediante agendamento prévio.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      Aceitamos veículos usados como parte do pagamento.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      Trabalhamos com os melhores bancos para financiamento.
                    </li>
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
