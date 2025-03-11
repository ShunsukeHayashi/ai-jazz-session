
import { useRef, useEffect } from 'react';
import AnimatedText from './AnimatedText';

const Workflow = () => {
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
    <section id="workflow" className="py-24">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16" ref={(el) => elementsRef.current[0] = el}>
          <div className="chip mb-4 mx-auto">セッションの流れ</div>
          <h2 className="section-title">
            <AnimatedText 
              text="即興的ワークフロー" 
              className="shimmer-text"
            />
          </h2>
          <p className="section-subtitle">
            ジャズセッションのように流れるように進行する、AIサービス導入の5ステップ
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-jazz-blue via-jazz-purple to-transparent transform md:-translate-x-1/2"></div>
          
          {/* Timeline items */}
          <div className="space-y-16 relative">
            {workflowSteps.map((step, index) => (
              <div 
                key={index} 
                className="flex flex-col md:flex-row"
                ref={(el) => elementsRef.current[index + 1] = el}
                style={{ opacity: 0, animation: 'fade-up 0.8s ease-out forwards', animationDelay: `${(index + 1) * 150}ms` }}
              >
                {/* Desktop: Timeline dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white dark:border-black bg-gradient-to-br from-jazz-blue to-jazz-purple shadow-lg"></div>
                
                {/* Content left side (desktop) / Above (mobile) */}
                <div className={`md:w-1/2 pb-8 md:pb-0 md:pr-12 ${index % 2 === 0 ? 'md:text-right' : 'md:hidden'}`}>
                  {index % 2 === 0 && (
                    <>
                      <div className="text-sm font-medium text-jazz-blue">
                        {step.jazzTerm}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </>
                  )}
                </div>
                
                {/* Mobile: Timeline dot and line */}
                <div className="md:hidden flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full border-4 border-white dark:border-black bg-gradient-to-br from-jazz-blue to-jazz-purple shadow-lg flex-shrink-0"></div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-jazz-blue">
                      {step.jazzTerm}
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                </div>
                
                {/* Content right side (desktop) / Below (mobile) */}
                <div className={`md:w-1/2 md:pl-12 ${index % 2 === 1 ? 'md:text-left' : 'md:hidden'}`}>
                  {index % 2 === 1 ? (
                    <>
                      <div className="text-sm font-medium text-jazz-blue">
                        {step.jazzTerm}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </>
                  ) : (
                    <p className="text-muted-foreground md:hidden">{step.description}</p>
                  )}
                </div>
                
                {/* Mobile: Step number */}
                <div className="md:hidden absolute left-4 top-0 w-8 h-8 flex items-center justify-center">
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Final element */}
          <div 
            className="relative mt-16 glass-card p-8 text-center max-w-2xl mx-auto"
            ref={(el) => elementsRef.current[6] = el}
            style={{ opacity: 0, animation: 'fade-up 0.8s ease-out forwards', animationDelay: '900ms' }}
          >
            <h3 className="text-xl font-semibold mb-3">シュンスケの役割</h3>
            <p className="text-muted-foreground">
              『AI芸人』として楽しく、わかりやすくAIを解説し、即興的なサービス創造を主導します。
              視聴者や参加者に対して親しみやすさ、安心感、ワクワク感を届ける『AIエバンジェリスト』として活動します。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const workflowSteps = [
  {
    jazzTerm: "ジャズイントロ",
    title: "訪問・ヒアリング",
    description: "現地に赴き、施設担当者と即興的に対話。環境や課題、ニーズを深く理解します。",
  },
  {
    jazzTerm: "ジャズセッション",
    title: "即興型AIサービス提案",
    description: "会話から得たヒントを元に、リアルタイムでAIサービスを提案。アイデアを自由に発展させます。",
  },
  {
    jazzTerm: "ジャズアレンジ",
    title: "即席プロトタイプ制作",
    description: "提案内容を即座にプロトタイプ化。AIツールを使って、現場で実際に動くものを作ります。",
  },
  {
    jazzTerm: "ジャズレビュー",
    title: "リアルタイム評価",
    description: "施設担当者と共に、即興で評価・改善。フィードバックを取り入れながら洗練させます。",
  },
  {
    jazzTerm: "ジャズフィナーレ",
    title: "サービス導入・PR",
    description: "完成したAIサービスを導入・活用し、YouTubeでその魅力を伝えます。",
  },
];

export default Workflow;
