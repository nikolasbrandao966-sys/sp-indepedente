import { SiteHeader } from "@/components/landing/site-header"
import { Hero } from "@/components/landing/hero"
import { NumbersSection } from "@/components/landing/numbers-section"
import { ManifestoSection } from "@/components/landing/manifesto-section"
import { GallerySection } from "@/components/landing/gallery-section"
import { PetitionSection } from "@/components/landing/petition-section"
import { SignatureWall } from "@/components/landing/signature-wall"
import { FaqSection } from "@/components/landing/faq-section"
import { FinalCta } from "@/components/landing/final-cta"
import { SiteFooter } from "@/components/landing/site-footer"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <NumbersSection />
        <ManifestoSection />
        <GallerySection />
        <PetitionSection />
        <SignatureWall />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
