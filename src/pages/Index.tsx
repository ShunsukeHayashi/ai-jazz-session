
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Concept from '@/components/Concept';
import JazzOrchestration from '@/components/JazzOrchestration';
import CustomerValue from '@/components/CustomerValue';
import Workflow from '@/components/Workflow';
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
        <JazzOrchestration />
        <CustomerValue />
        <Workflow />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
