
import { useRef, useEffect } from 'react';
import AnimatedText from './AnimatedText';

const AboutShunsuke = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="py-24">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16">
          <div className="chip mb-4 mx-auto">シュンスケについて</div>
          <h2 className="section-title">
            <AnimatedText 
              text="シュンスケとは？" 
              className="shimmer-text"
            />
          </h2>
        </div>
        
        <div 
          className="glass-card p-8 max-w-3xl mx-auto opacity-0"
          ref={elementRef}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3">
              <div className="aspect-square rounded-full overflow-hidden bg-gradient-to-r from-jazz-blue to-jazz-purple flex items-center justify-center text-white">
                <span className="text-6xl">🎷</span>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl font-semibold mb-4">AIプロンプトエンジニア × 芸人 × ジャズ</h3>
              <p className="text-muted-foreground mb-4">
                AIを即興的に駆使し、全国を旅しながら「笑顔になれるAI活用術」を伝えるAIエバンジェリストです。
              </p>
              <p className="text-muted-foreground mb-4">
                複雑なAI技術をわかりやすく楽しく解説し、誰でも簡単に使えるようにサポートします。
              </p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                </a>
                <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutShunsuke;
