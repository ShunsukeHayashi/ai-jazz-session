
import { useState, useEffect } from 'react';
import AnimatedText from './AnimatedText';

const Hero = () => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-24 flex items-center overflow-hidden">
      <div className="hero-gradient"></div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-jazz-blue/10 filter blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full bg-jazz-purple/10 filter blur-3xl animate-float animate-delay-200"></div>
      
      <div className="container px-6 mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-block mb-6 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary animate-fade-in">
              日本縦断即興型AI導入プロジェクト
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-up">
              <AnimatedText 
                text="シュンスケの旅" 
                className="shimmer-text block mb-2"
              />
              <span className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground/90 block mt-2">
                <AnimatedText 
                  text="AIセッションジャズオーケストレーション" 
                  delay={400}
                />
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-up animate-delay-300">
              AIを駆動開発を日本中に広め、AIを使って幸せになれる人を増やす。即興性とジャズの精神で、全国を旅しながらAIの可能性を広げます。
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-up animate-delay-400">
              <a 
                href="#concept" 
                className="px-6 py-3 rounded-full bg-primary text-white font-medium transition-all hover:shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95"
              >
                詳細を見る
              </a>
              <a 
                href="#workflow" 
                className="px-6 py-3 rounded-full bg-secondary text-foreground font-medium transition-all hover:bg-secondary/80 hover:scale-105 active:scale-95"
              >
                セッションの流れ
              </a>
            </div>
          </div>
          
          {/* Image/Visual */}
          <div className={`w-full lg:w-1/2 transition-all duration-1000 ${showImage ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <div className="relative">
              <div className="glass-card p-6 md:p-8 hover-perspective shadow-xl">
                <div className="aspect-video relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-tr from-jazz-blue/30 via-jazz-purple/20 to-jazz-blue/10 z-10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-6xl md:text-7xl">🎷</span>
                      <div className="mt-4 text-xl md:text-2xl font-semibold">AI × 即興 × 旅</div>
                      <div className="mt-2 text-muted-foreground">YouTube Content Coming Soon</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <div className="text-sm text-muted-foreground">ジャズオーケストレーション</div>
                    <div className="text-lg font-medium">全国各地の施設でライブセッション</div>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-jazz-blue flex items-center justify-center text-white shadow-lg shadow-jazz-blue/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-jazz-purple/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-jazz-blue/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
