import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
