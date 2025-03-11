
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
          <div className="chip mb-4 mx-auto">提供する価値</div>
          <h2 className="section-title">
            <AnimatedText 
              text="AIを即興で活用する新しい形" 
              className="shimmer-text"
            />
          </h2>
          <p className="section-subtitle">
            AIの導入を、ジャズのように自由に、楽しく、即興的に実現します
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
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    title: "AIを即興で導入",
    description: "事前準備なしで、現場のニーズに合わせたAIサービスをその場で開発。ジャズのような即興性で柔軟に対応します。",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>,
    title: "YouTubeでPR",
    description: "シュンスケのYouTubeチャンネルで施設の魅力を全国に発信。AIとエンターテイメントが融合した魅力的な動画で注目を集めます。",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hotel"><path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/><path d="m9 16l.348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16"/><path d="M8 7h.01"/><path d="M16 7h.01"/><path d="M12 7h.01"/><path d="M12 11h.01"/><path d="M16 11h.01"/><path d="M8 11h.01"/><path d="M10 22v-6.5m4 0V22"/></svg>,
    title: "無料で参加可能",
    description: "宿泊や飲食の提供だけで参加可能。特別な予算は必要ありません。気軽にAI導入を試すことができます。",
  },
];

export default Concept;
