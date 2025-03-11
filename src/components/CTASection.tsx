
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
            集客増加と業務効率化を同時に実現！<br />
            宿泊・飲食提供で気軽に参加可能
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* 会場提供者向け */}
            <div className="glass-card p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hotel"><path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/><path d="m9 16l.348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16"/><path d="M8 7h.01"/><path d="M16 7h.01"/><path d="M12 7h.01"/><path d="M12 11h.01"/><path d="M16 11h.01"/><path d="M8 11h.01"/><path d="M10 22v-6.5m4 0V22"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">会場提供者のメリット</h3>
              <ul className="space-y-2 text-left">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>宿泊・飲食提供のみで参加可能</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>YouTubeで全国に施設をPR</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>AI導入による業務効率化</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>新規顧客獲得のチャンス</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>話題性創出による集客効果</span>
                </li>
              </ul>
              <Button
                variant="outline"
                className="w-full mt-6 px-6 py-3 rounded-full border-primary text-primary font-medium transition-all hover:bg-primary/10"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                会場として応募する
              </Button>
            </div>
            
            {/* ハッカソン参加者向け */}
            <div className="glass-card p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">ハッカソン参加プラン</h3>
              <ul className="space-y-2 text-left">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>参加費: <span className="font-semibold">5万円/人</span></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>AI開発スキル習得</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>プロによる技術指導</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>宿泊・食事込み</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>2ヶ月に1回開催</span>
                  </span>
                </li>
              </ul>
              <Button
                className="w-full mt-6 px-6 py-3 rounded-full bg-primary text-white font-medium transition-all hover:shadow-lg hover:shadow-primary/20"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                参加者として申し込む
              </Button>
            </div>
          </div>
          
          <div className="p-6 glass-card mb-8">
            <h3 className="text-lg font-semibold mb-3">『シュンスケの旅』ビジネスモデル</h3>
            <div className="flex flex-col md:flex-row justify-between gap-4 text-left">
              <div className="flex-1">
                <h4 className="font-medium mb-2">会場提供者側</h4>
                <ul className="space-y-1 text-sm">
                  <li>• 宿泊・飲食の提供のみ</li>
                  <li>• 新規顧客獲得機会</li>
                  <li>• コスト負担なしでAI導入</li>
                  <li>• 集客・PR効果</li>
                </ul>
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-2">参加者側</h4>
                <ul className="space-y-1 text-sm">
                  <li>• 5万円/人の参加費</li>
                  <li>• AI開発スキル習得</li>
                  <li>• 宿泊・食事込み</li>
                  <li>• ネットワーキング機会</li>
                </ul>
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-2">事業収益構造</h4>
                <ul className="space-y-1 text-sm">
                  <li>• 参加費収入</li>
                  <li>• AI導入コンサル収入</li>
                  <li>• YouTubeコンテンツ収益</li>
                  <li>• 継続サポート契約</li>
                </ul>
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
              ※会場提供者は宿泊・飲食の提供のみで参加可能。AI導入によるメリットと集客効果が得られます。<br />
              参加者は5万円の参加費で、AI開発スキルの習得と宿泊・食事込みの充実したハッカソン体験が可能です。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
