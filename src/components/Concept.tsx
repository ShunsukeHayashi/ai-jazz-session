
import { useEffect, useRef } from 'react';
import AnimatedText from './AnimatedText';

const Concept = () => {
  const conceptRef = useRef<HTMLDivElement>(null);
  
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
    
    const children = conceptRef.current?.children;
    if (children) {
      Array.from(children).forEach((child) => {
        observer.observe(child);
      });
    }
    
    return () => {
      if (children) {
        Array.from(children).forEach((child) => {
          observer.unobserve(child);
        });
      }
    };
  }, []);

  return (
    <section id="concept" className="py-24 bg-secondary/50">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16" ref={conceptRef}>
          <div className="chip mb-4 mx-auto">基本コンセプト</div>
          <h2 className="section-title">
            <AnimatedText 
              text="AI駆動開発を日本中に広める" 
              className="shimmer-text"
            />
          </h2>
          <p className="section-subtitle">
            AIを使って幸せになれる人を増やし、日本全国に笑顔を広げるプロジェクト
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {conceptPoints.map((point, index) => (
            <div 
              key={index}
              className="glass-card p-6 md:p-8 transition-all duration-300 hover:shadow-lg opacity-0"
              style={{ 
                animationDelay: `${index * 200}ms`, 
                animationFillMode: 'forwards' 
              }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                {point.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
              <p className="text-muted-foreground">{point.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 glass-card p-8 md:p-10 text-center max-w-3xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
          <blockquote className="text-xl md:text-2xl italic text-foreground/90 mb-4">
            "即興性、ライブ感、直感 ー ジャズの精神でAIの未来を奏でる"
          </blockquote>
          <p className="text-muted-foreground">
            計画や事前準備より『直感』『その場のニーズ』『ライブ感』を重視した
            新しいAI導入の形を提案します。
          </p>
        </div>
      </div>
    </section>
  );
};

const conceptPoints = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>,
    title: "全国縦断の旅",
    description: "日本全国のホテルや地域施設を訪れ、AIの可能性を開拓します。現地の課題や魅力を理解し、AIによる解決策を提案します。",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>,
    title: "YouTube発信",
    description: "AIセッションの様子をYouTubeで発信し、多くの人にAIの魅力と可能性を伝えます。視聴者が楽しみながらAIについて学べるコンテンツを制作します。",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smile"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>,
    title: "幸せの創出",
    description: "AIを通じて人々の生活を豊かにし、笑顔を増やすことを使命とします。テクノロジーが生み出す新しい価値を、わかりやすく楽しく伝えます。",
  },
];

export default Concept;
