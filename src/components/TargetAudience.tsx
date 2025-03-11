
import { useRef, useEffect } from 'react';
import AnimatedText from './AnimatedText';

const TargetAudience = () => {
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
    <section id="target-audience" className="py-24 bg-secondary/50">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16" ref={(el) => elementsRef.current[0] = el}>
          <div className="chip mb-4 mx-auto">対象者</div>
          <h2 className="section-title">
            <AnimatedText 
              text="こんな方におすすめ" 
              className="shimmer-text"
            />
          </h2>
          <p className="section-subtitle">
            AIを活用して施設や地域の価値を高めたい方々に最適です
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
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
                {audience.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{audience.title}</h3>
              <p className="text-muted-foreground">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const audiences = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hotel"><path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/><path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16"/><path d="M8 7h.01"/><path d="M16 7h.01"/><path d="M12 7h.01"/><path d="M12 11h.01"/><path d="M16 11h.01"/><path d="M8 11h.01"/><path d="M10 22v-6.5m4 0V22"/></svg>,
    title: "ホテル・施設運営者",
    description: "AIを導入したいけど方法が分からない方。業務効率化や顧客満足度向上を目指す施設運営者に最適です。",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-landmark"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>,
    title: "自治体・地域団体",
    description: "地域の魅力を広め、観光客や移住者を増やしたい自治体や地域団体。AIを活用した地域活性化を目指す方々に。",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-megaphone"><path d="m3 11 18-5v12L3 13"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>,
    title: "PR・マーケティング担当者",
    description: "話題性のあるPRをしたい企業や団体。AIを活用した新しいマーケティング手法で注目を集めたい方に。",
  },
];

export default TargetAudience;
