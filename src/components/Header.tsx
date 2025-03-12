
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { MessageCircle, Twitter, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'コンセプト', href: '#concept' },
    { name: 'AIセッション', href: '#jazz-orchestration' },
    { name: 'カスタマー', href: '#customers' },
    { name: 'ワークフロー', href: '#workflow' },
    { name: '社会的意義', href: '#significance' },
  ];

  const socialLinks = [
    { 
      name: 'X / Twitter', 
      href: 'https://x.com/Shunsuke__H__', 
      icon: <Twitter className="h-5 w-5" /> 
    },
    { 
      name: 'Note ブログ', 
      href: 'https://note.ambitiousai.co.jp/', 
      icon: <ExternalLink className="h-5 w-5" /> 
    }
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/95 dark:bg-black/95 backdrop-blur-lg shadow-md py-3'
          : 'bg-white/90 dark:bg-black/90 backdrop-blur-md py-4'
      )}
    >
      <div className="container px-6 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="/" 
            className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
          >
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight shimmer-text">シュンスケの旅</span>
              <span className="text-xs text-muted-foreground">AI Jazz Orchestration</span>
            </div>
          </a>

          {/* Social and Chat Buttons for Mobile - Always Visible */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Social links for mobile */}
            <div className="flex md:hidden items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            
            <Link to="/chat" className="md:hidden">
              <Button size="lg" className="bg-primary hover:bg-primary/90 flex items-center gap-2 text-white">
                <MessageCircle className="h-5 w-5" />
                <span>チャット</span>
              </Button>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-200 hover:scale-105"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-200 hover:scale-105"
                  >
                    {link.name}
                  </a>
                )
              ))}
              
              {/* Social Links for Desktop */}
              <div className="flex items-center gap-3 border-l pl-3 border-gray-300 dark:border-gray-700">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors flex items-center gap-2"
                    title={link.name}
                  >
                    {link.icon}
                    <span className="text-sm hidden xl:inline">{link.name}</span>
                  </a>
                ))}
              </div>
              
              {/* Very Prominent Chat Button for Desktop */}
              <Link to="/chat">
                <Button size="lg" className="bg-primary hover:bg-primary/90 flex items-center gap-2 text-lg px-6 py-6 animate-pulse">
                  <MessageCircle className="h-5 w-5" />
                  AIチャットを試す
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden flex-col space-y-1.5 p-2"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden absolute left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-lg shadow-md ${isMobileMenuOpen ? 'max-h-96 mt-4 px-6 py-4' : 'max-h-0'}`}>
          <div className="flex flex-col space-y-4 py-2">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              )
            ))}
            
            {/* Social Links for Mobile Menu */}
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-sm font-medium text-muted-foreground">SNS & ブログ</h3>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
            
            {/* Chat link in mobile menu */}
            <Link
              to="/chat"
              className="text-base font-bold text-primary hover:text-primary/80 flex items-center gap-2 bg-primary/10 p-3 rounded-md mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MessageCircle className="h-5 w-5" />
              AIチャットを今すぐ試す！
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
