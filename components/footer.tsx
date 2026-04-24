import Link from 'next/link'
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react'

const footerLinks = {
  navigation: [
    { href: '/', label: 'Início' },
    { href: '/estoque', label: 'Estoque' },
    { href: '/sobre', label: 'Sobre Nós' },
    { href: '/contato', label: 'Contato' },
  ],
  vehicles: [
    { href: '/estoque?brand=Porsche', label: 'Porsche' },
    { href: '/estoque?brand=Ferrari', label: 'Ferrari' },
    { href: '/estoque?brand=Mercedes-Benz', label: 'Mercedes-Benz' },
    { href: '/estoque?brand=BMW', label: 'BMW' },
    { href: '/estoque?brand=Audi', label: 'Audi' },
  ],
}

const socialLinks = [
  { href: 'https://instagram.com/curtimotors', icon: Instagram, label: 'Instagram' },
  { href: 'https://facebook.com/curtimotors', icon: Facebook, label: 'Facebook' },
  { href: 'https://youtube.com/curtimotors', icon: Youtube, label: 'YouTube' },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold font-heading tracking-tight">
                <span className="text-primary">Curti</span>
                <span className="text-foreground">Motors</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Sua revenda de veículos premium de confiança. Oferecemos os melhores automóveis do mercado com 
              transparência e qualidade incomparável.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Navegação</h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vehicles Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Marcas</h3>
            <ul className="space-y-3">
              {footerLinks.vehicles.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Av. Europa, 1000 - Jardim Europa
                  <br />
                  São Paulo - SP, 01449-000
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a
                  href="tel:+5511999999999"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a
                  href="mailto:contato@curtimotors.com.br"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  contato@curtimotors.com.br
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Seg - Sex: 9h às 19h
                  <br />
                  Sáb: 9h às 15h
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © {new Date().getFullYear()} CurtiMotors. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacidade"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/termos"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
