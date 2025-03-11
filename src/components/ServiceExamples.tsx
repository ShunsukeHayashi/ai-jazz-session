
import { useRef, useEffect } from 'react';
import AnimatedText from './AnimatedText';

const ServiceExamples = () => {
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  
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
    
    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    
    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="service-examples" className="py-24 bg-secondary/50">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16" ref={(el) => elementsRef.current[0] = el}>
          <div className="chip mb-4 mx-auto">AIサービス例</div>
          <h2 className="section-title">
            <AnimatedText 
              text="提供するAIサービス例" 
              className="shimmer-text"
            />
          </h2>
          <p className="section-subtitle">
            あらゆる施設・状況に対応できる、即興性の高いAIサービスを提供します
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="glass-card p-6 md:p-8 transition-all duration-300 hover:shadow-lg opacity-0"
              ref={(el) => elementsRef.current[index + 1] = el}
              style={{ 
                animationDelay: `${index * 200}ms`, 
                animationFillMode: 'forwards' 
              }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const services = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
    title: "AIコンシェルジュ",
    description: "お客様からの質問に24時間対応するAIチャットボットで、スタッフの負担を軽減しながら顧客満足度を向上します。",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-square"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
    title: "自動チェックインシステム",
    description: "AIを活用した顔認証や音声認識技術で、チェックイン作業を効率化。待ち時間の短縮とコスト削減を実現します。",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
    title: "地域レコメンドAI",
    description: "地域の特色や顧客の好みを分析し、パーソナライズされた観光スポットや体験を推薦するAIシステムです。",
  },
];

export default ServiceExamples;
