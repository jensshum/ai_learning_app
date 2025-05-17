import LandingHero from '@/components/landing/landing-hero';
import LandingFeatures from '@/components/landing/landing-features';
import LandingTestimonials from '@/components/landing/landing-testimonials';
import LandingCTA from '@/components/landing/landing-cta';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col min-h-screen">
        <LandingHero />
        <LandingFeatures />
        <LandingTestimonials />
        <LandingCTA />
      </main>
      <SiteFooter />
    </>
  );
}