
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Concept from '@/components/Concept';
import TargetAudience from '@/components/TargetAudience';
import AboutShunsuke from '@/components/AboutShunsuke';
import ServiceExamples from '@/components/ServiceExamples';
import HowItWorks from '@/components/HowItWorks';
import CTASection from '@/components/CTASection';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading to ensure smooth animations
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-jazz-blue/20 border-t-jazz-blue rounded-full animate-spin"></div>
          <div className="mt-4 text-center text-sm font-medium text-muted-foreground">
            <span className="shimmer-text">シュンスケの旅</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Concept />
        <TargetAudience />
        <ServiceExamples />
        <AboutShunsuke />
        <HowItWorks />
        <CTASection />
        <section id="contact" className="py-24 bg-secondary/50">
          <div className="container px-6 mx-auto">
            <div className="text-center mb-16">
              <div className="chip mb-4 mx-auto">お問い合わせ</div>
              <h2 className="section-title">
                無料AIセッションを申し込む
              </h2>
              <p className="section-subtitle">
                お気軽にお問い合わせください。<br />
                ※宿泊や飲食の提供だけで参加可能です。
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
