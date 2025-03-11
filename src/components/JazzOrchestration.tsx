
import { useRef, useEffect } from 'react';
import AnimatedText from './AnimatedText';

const JazzOrchestration = () => {
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
    <section id="jazz-orchestration" className="py-24">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16" ref={(el) => elementsRef.current[0] = el}>
          <div className="chip mb-4 mx-auto">独自のアプローチ</div>
          <h2 className="section-title">
            <AnimatedText 
              text="AIセッションジャズオーケストレーション" 
              className="shimmer-text"
            />
          </h2>
          <p className="section-subtitle">
            ジャズの即興性とオーケストラの調和を融合した、全く新しいAI導入手法
          </p>
        </div>
        
        <div className="relative mt-20" ref={(el) => elementsRef.current[1] = el}>
          {/* Center illustration */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-jazz-blue via-jazz-purple to-transparent transform -translate-x-1/2 z-0"></div>
          
          {/* Content blocks */}
          <div className="space-y-20 relative z-10">
            {jazzElements.map((element, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}
                style={{ opacity: 0, animation: 'fade-up 0.8s ease-out forwards', animationDelay: `${index * 200}ms` }}
              >
                <div className="w-full md:w-1/2">
                  <div className={`glass-card p-6 md:p-8 ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'} max-w-lg transition-all duration-300 hover:shadow-lg`}>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                        {element.icon}
                      </div>
                      <h3 className="text-xl font-semibold">{element.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{element.description}</p>
                    {element.point && (
                      <div className="mt-4 p-3 bg-secondary rounded-lg">
                        <div className="text-sm font-medium">即興型ポイント:</div>
                        <div className="text-sm">{element.point}</div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-jazz-blue to-jazz-purple flex items-center justify-center text-white shadow-lg">
                  <span className="text-2xl font-bold">{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const jazzElements = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-music"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
    title: "ジャズ的な即興性",
    description: "その場でリアルタイムにAIを活用したサービスを創出します。事前の計画に縛られず、現場のニーズに合わせた柔軟な提案を行います。",
    point: "計画や事前準備より『直感』『その場のニーズ』『ライブ感』を重視",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: "AI×人間のセッション",
    description: "AIと人間がセッションをするように、アイデアを自由に掛け合わせて新たな価値を創造します。テクノロジーと人間の強みを組み合わせます。",
    point: "人間の創造性とAIの分析力を融合させて、予想外の解決策を生み出す",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-music-4"><path d="M9 18V5l12-2v13"/><path d="M6 10v8"/><path d="M12 22v-4"/><circle cx="6" cy="18" r="4"/><circle cx="12" cy="18" r="4"/></svg>,
    title: "オーケストラ的調和",
    description: "オーケストラのように調和を取りながら、地域や施設の個性に合わせてAIサービスを奏でます。多様な要素を美しく統合します。",
    point: "個々の強みを活かしながら全体の調和を図る、バランスの取れたアプローチ",
  },
];

export default JazzOrchestration;
