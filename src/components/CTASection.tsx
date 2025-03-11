
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section id="cta" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-jazz-blue/10 via-jazz-purple/10 to-transparent z-0"></div>
      
      <div className="container px-6 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animated-gradient">
            AIを味方に。<br />
            あなたの施設を『シュンスケの旅』で笑顔に！
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10">
            宿泊や飲食の提供だけで参加可能。特別な予算は必要ありません。<br />
            まずはお気軽にお問い合わせください。
          </p>
          
          <Button
            className="px-8 py-6 rounded-full bg-primary text-white font-medium text-lg transition-all hover:shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            🎷 無料AIセッションを申し込む！
          </Button>
          
          <div className="mt-8 p-4 border border-border rounded-lg bg-background/50">
            <p className="text-sm text-muted-foreground">
              ※現在、先着10施設限定でサービスを提供しています。
              お早めにお申し込みください。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
