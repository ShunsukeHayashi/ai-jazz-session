
import { useRef, useEffect } from 'react';
import AnimatedText from './AnimatedText';

const HowItWorks = () => {
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
    <section id="how-it-works" className="py-24">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16" ref={(el) => elementsRef.current[0] = el}>
          <div className="chip mb-4 mx-auto">実施の流れ</div>
          <h2 className="section-title">
            <AnimatedText 
              text="シンプル4ステップ" 
              className="shimmer-text"
            />
          </h2>
          <p className="section-subtitle">
            申し込みから実施、PR配信まで、シンプルな流れで進めます
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="glass-card p-6 text-center transition-all duration-300 hover:shadow-lg"
              ref={(el) => elementsRef.current[index + 1] = el}
              style={{ opacity: 0, animation: 'fade-up 0.8s ease-out forwards', animationDelay: `${(index + 1) * 150}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-jazz-blue to-jazz-purple flex items-center justify-center text-white mx-auto mb-4">
                <span className="text-2xl font-bold">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const steps = [
  {
    title: "申し込み",
    description: "フォームから簡単に申し込みが可能です。特別な予算は必要ありません。",
  },
  {
    title: "日程調整・訪問",
    description: "ご希望の日程で、シュンスケが直接施設を訪問します。",
  },
  {
    title: "AIサービス即席開発",
    description: "その場でニーズに合わせたAIサービスを即興で開発します。",
  },
  {
    title: "YouTubeでPR",
    description: "シュンスケのYouTubeチャンネルで施設の魅力を全国に配信します。",
  },
];

export default HowItWorks;
