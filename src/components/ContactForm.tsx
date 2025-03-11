
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    facility: '',
    message: '',
    paymentMethod: 'square', // Default payment method
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Insert data into Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          { 
            name: formData.name,
            email: formData.email,
            facility: formData.facility || null,
            message: formData.message || null,
            payment_method: formData.paymentMethod
          }
        ]);
      
      if (error) {
        console.error('Error submitting form:', error);
        throw error;
      }
      
      // Process payment (in a real implementation, this would integrate with Square's API)
      console.log(`Processing payment with ${formData.paymentMethod}`);
      
      // In a real implementation, you would redirect to Square payment page or open a payment modal
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        facility: '',
        message: '',
        paymentMethod: 'square',
      });
      
      toast({
        title: "お申し込みありがとうございます！",
        description: "決済ページへ移動します。お支払い完了後、近日中にご連絡させていただきます。",
      });
      
      // Simulate redirect to payment page
      setTimeout(() => {
        toast({
          title: "決済処理中",
          description: "Square決済システムへ接続しています...",
        });
      }, 1500);
      
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "エラーが発生しました",
        description: "申し訳ありませんが、後ほど再度お試しください。",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-center">無料AIセッションを申し込む</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">お名前</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-2 rounded-lg border border-border bg-background/50"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">メールアドレス</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-2 rounded-lg border border-border bg-background/50"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="facility" className="block text-sm font-medium mb-1">施設名</label>
          <input
            id="facility"
            name="facility"
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-border bg-background/50"
            value={formData.facility}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">ご要望 (任意)</label>
          <textarea
            id="message"
            name="message"
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 resize-none"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium mb-1">お支払い方法</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            className="w-full px-4 py-2 rounded-lg border border-border bg-background/50"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="square">Square決済</option>
            <option value="cash">現金支払い (後日)</option>
            <option value="bank">銀行振込</option>
          </select>
          <p className="text-xs text-muted-foreground mt-1">
            ※Square決済を選択すると、送信後に決済ページへ移動します
          </p>
        </div>
        
        <Button
          type="submit"
          className="w-full py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95"
          disabled={isSubmitting}
        >
          {isSubmitting ? '送信中...' : '無料AIセッションを申し込む！'}
        </Button>
        
        <div className="flex items-center justify-center mt-4 space-x-2">
          <img src="https://cdn.shopify.com/shopifycloud/shopify/assets/checkout/offsite-gateway-logos/square-45db28e462aa9066537122b2a28f11f630fb8bf49f7759bc28ea1422eea61b78.svg" 
               alt="Square" className="h-6" />
          <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/0169695f4040ad6a.svg" 
               alt="Visa" className="h-4" />
          <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/ae9ceec4c291bb5d.svg" 
               alt="Mastercard" className="h-4" />
          <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/1d635a86a1f44066.svg" 
               alt="American Express" className="h-4" />
        </div>
        
        <p className="text-xs text-center text-muted-foreground mt-2">
          ※宿泊や飲食の提供だけで参加可能。特別な予算は不要です。
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
