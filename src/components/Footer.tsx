
import { useEffect, useState } from 'react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="py-16 bg-secondary/50 overflow-hidden">
      <div className="container px-6 mx-auto">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4" id="significance">プロジェクトの社会的意義</h2>
            <div className="glass-card p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {significance.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground text-center">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <a href="#" className="flex items-center space-x-2">
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight shimmer-text">シュンスケの旅</span>
                  <span className="text-xs text-muted-foreground">AI Jazz Orchestration</span>
                </div>
              </a>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
              <a href="#concept" className="text-sm hover:text-primary transition-colors">コンセプト</a>
              <a href="#jazz-orchestration" className="text-sm hover:text-primary transition-colors">AIセッション</a>
              <a href="#customers" className="text-sm hover:text-primary transition-colors">カスタマー</a>
              <a href="#workflow" className="text-sm hover:text-primary transition-colors">ワークフロー</a>
              <a href="#significance" className="text-sm hover:text-primary transition-colors">社会的意義</a>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                『シュンスケの旅』で、日本中を『AI×笑顔×ジャズ』で満たし、AI駆動開発の楽しさと可能性を日本全国に広めましょう！
              </p>
              <div className="flex items-center space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const significance = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
    title: "日本全国へのAI導入促進",
    description: "地域創生とDXを組み合わせ、日本全国のあらゆる地域でのAI活用を促進します。",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>,
    title: "テクノロジーへの抵抗感軽減",
    description: "AIを楽しく、親しみやすく伝えることで、テクノロジーに対する心理的ハードルを下げます。",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smile"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>,
    title: "笑顔と幸せの創出",
    description: "AIの力で日本中を繋ぎ、笑顔と幸せを増やすことに貢献します。",
  },
];

export default Footer;
