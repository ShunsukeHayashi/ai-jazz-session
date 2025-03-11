
import { useRef, useEffect } from 'react';
import AnimatedText from './AnimatedText';

const CustomerValue = () => {
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
    <section id="customers" className="py-24 bg-secondary/50">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16" ref={(el) => elementsRef.current[0] = el}>
          <div className="chip mb-4 mx-auto">対象と価値</div>
          <h2 className="section-title">
            <AnimatedText 
              text="カスタマーに届ける価値" 
              className="shimmer-text"
            />
          </h2>
          <p className="section-subtitle">
            AIを通じて、事業者と視聴者それぞれに独自の価値を提供します
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {/* Customer Type 1 */}
          <div 
            className="glass-card p-8 transition-all duration-300 hover:shadow-xl opacity-0"
            style={{ animation: 'fade-up 0.8s ease-out forwards', animationDelay: '200ms' }}
            ref={(el) => elementsRef.current[1] = el}
          >
            <div className="w-12 h-12 rounded-full bg-jazz-blue/10 flex items-center justify-center text-jazz-blue mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building-2"><path d="M6 22V2a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v20"/><path d="M12 8.5V13"/><path d="M10 2v20"/><path d="M14 2v20"/><path d="M18 5V1h1a1 1 0 0 1 1 1v3"/><path d="M5 14v.5A1.5 1.5 0 0 0 6.5 16H7"/><path d="M6 18h1a1 1 0 0 1 1 1v3"/><path d="M2 22h20"/></svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">ホテル・施設運営者（事業者）</h3>
            <ul className="space-y-4">
              {businessValues.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 mt-1 text-jazz-blue">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 p-4 bg-jazz-blue/5 rounded-lg border border-jazz-blue/10">
              <h4 className="text-sm font-medium mb-2">インテント（意図）例：</h4>
              <div className="flex flex-wrap gap-2">
                {businessIntents.map((intent, index) => (
                  <span key={index} className="text-xs px-2 py-1 rounded-full bg-jazz-blue/10 text-jazz-blue">
                    {intent}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Customer Type 2 */}
          <div 
            className="glass-card p-8 transition-all duration-300 hover:shadow-xl opacity-0"
            style={{ animation: 'fade-up 0.8s ease-out forwards', animationDelay: '400ms' }}
            ref={(el) => elementsRef.current[2] = el}
          >
            <div className="w-12 h-12 rounded-full bg-jazz-purple/10 flex items-center justify-center text-jazz-purple mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">視聴者（YouTubeユーザー・一般消費者）</h3>
            <ul className="space-y-4">
              {viewerValues.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 mt-1 text-jazz-purple">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 p-4 bg-jazz-purple/5 rounded-lg border border-jazz-purple/10">
              <h4 className="text-sm font-medium mb-2">インテント（意図）例：</h4>
              <div className="flex flex-wrap gap-2">
                {viewerIntents.map((intent, index) => (
                  <span key={index} className="text-xs px-2 py-1 rounded-full bg-jazz-purple/10 text-jazz-purple">
                    {intent}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 text-center max-w-3xl mx-auto" ref={(el) => elementsRef.current[3] = el}>
          <h3 className="text-2xl font-semibold mb-4">
            AIを通じて幸せになれる人を増やします
          </h3>
          <p className="text-muted-foreground">
            シュンスケの旅では、AIの導入を通じて新たな価値を生み出し、地域や施設の魅力を高め、
            視聴者にはAIの楽しさや可能性を届けることで、多くの人の幸せに貢献します。
          </p>
        </div>
      </div>
    </section>
  );
};

const businessValues = [
  {
    title: "業務効率化と収益向上",
    description: "AIを活用したサービス導入により、業務効率化や収益向上を実現します。",
  },
  {
    title: "地域の魅力向上",
    description: "AIを通じて地域や施設の魅力を発見し、集客力を高めます。",
  },
  {
    title: "テクノロジー導入サポート",
    description: "専門知識がなくても、簡単にAIを導入できるよう全面的にサポートします。",
  },
];

const businessIntents = [
  "予約管理を簡単にしたい",
  "客のニーズをもっと知りたい",
  "地域の魅力を伝えたい",
  "業務の効率化を図りたい",
  "新しい集客方法を探したい",
];

const viewerValues = [
  {
    title: "エンターテイメント×学び",
    description: "楽しみながらAIの可能性や活用方法を学ぶことができます。",
  },
  {
    title: "地方の魅力の発見",
    description: "日本各地の魅力や個性的な施設の情報を得ることができます。",
  },
  {
    title: "AIに対する心理的ハードル低減",
    description: "テクノロジーを身近に感じ、実生活での活用イメージが湧きます。",
  },
];

const viewerIntents = [
  "楽しくAIを学びたい",
  "新しい旅のスタイルを見たい",
  "地方の面白い情報を知りたい",
  "AIの活用事例を知りたい",
  "テクノロジーを身近に感じたい",
];

export default CustomerValue;
