
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';

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
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            AI駆動開発ハッカソンで業務課題を解決！<br />
            2ヶ月に1回開催、限定30名様のみ参加可能
          </p>
          
          <div className="glass-card p-6 mb-8">
            <h3 className="text-xl font-semibold mb-3">ハッカソン参加プラン</h3>
            <ul className="space-y-2 text-left mb-4">
              <li className="flex items-start">
                <span className="mr-2 text-primary">✓</span>
                <span>参加費: <span className="font-semibold">5万円/人</span> (30名限定)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">✓</span>
                <span>ホテル・旅館でのリアルな課題解決</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">✓</span>
                <span>プロによるAI駆動開発指導</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">✓</span>
                <span>宿泊・食事込みの充実サービス</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">✓</span>
                <span className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>2ヶ月に1回の定期開催（カレンダーから日程選択可）</span>
                </span>
              </li>
            </ul>
            
            <div className="mt-4 bg-background/50 p-3 rounded-lg border border-border">
              <p className="text-sm font-medium">お支払い方法</p>
              <div className="flex items-center justify-center mt-2 space-x-3">
                <img src="https://cdn.shopify.com/shopifycloud/shopify/assets/checkout/offsite-gateway-logos/square-45db28e462aa9066537122b2a28f11f630fb8bf49f7759bc28ea1422eea61b78.svg" 
                    alt="Square" className="h-7" />
                <span className="text-muted-foreground">|</span>
                <span className="text-sm">銀行振込</span>
                <span className="text-muted-foreground">|</span>
                <span className="text-sm">現金払い</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
            <Button
              className="px-8 py-6 rounded-full bg-primary text-white font-medium text-lg transition-all hover:shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              🎷 参加者として申し込む！
            </Button>
            
            <Button
              variant="outline"
              className="px-8 py-6 rounded-full border-primary text-primary font-medium text-lg transition-all hover:bg-primary/10 hover:scale-105 active:scale-95"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              🏨 会場として応募する
            </Button>
          </div>
          
          <div className="p-4 border border-border rounded-lg bg-background/50">
            <p className="text-sm text-muted-foreground">
              ※2ヶ月に1回開催、会場のホテル・旅館ではAI駆動開発による業務課題解決をお約束します。<br />
              開催日程はカレンダーから選択できます。定員になり次第締め切りとなります。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
