
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

          {/* Primary Action and Social Links for Mobile */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Social links for mobile - more visible */}
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                  aria-label={link.name}
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            
            {/* More prominent chat button */}
            <Link to="/chat">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white font-medium shadow-md px-4 py-2 flex items-center gap-1.5 rounded-lg border border-primary/30"
              >
                <MessageCircle className="h-5 w-5" />
                <span>チャット</span>
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex flex-col justify-center items-center ml-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''} my-1.5`}></span>
              <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-5">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-foreground/90 hover:text-foreground transition-all duration-200 hover:scale-105"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-foreground/90 hover:text-foreground transition-all duration-200 hover:scale-105"
                >
                  {link.name}
                </a>
              )
            ))}
              
            {/* Social Links for Desktop - More visible */}
            <div className="flex items-center gap-3 pl-3 border-l border-gray-300 dark:border-gray-700">
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
              
            {/* Enhanced Chat Button for Desktop */}
            <Link to="/chat">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 flex items-center gap-2 text-lg px-6 py-5 shadow-lg 
                           relative overflow-hidden transition-all duration-300 hover:scale-105 font-medium
                           before:absolute before:inset-0 before:bg-white/20 before:animate-pulse before:opacity-0 hover:before:opacity-100"
              >
                <MessageCircle className="h-6 w-6" />
                <span>AIチャットを試す</span>
              </Button>
            </Link>
          </nav>
        </div>

        {/* Improved Mobile Navigation */}
        <div 
          className={cn(
            "md:hidden transition-all duration-300 overflow-hidden absolute left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-lg shadow-md",
            isMobileMenuOpen ? "max-h-screen mt-4 px-6 py-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col space-y-5 py-2">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-base font-medium text-foreground/90 hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-foreground/90 hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              )
            ))}
            
            {/* Enhanced Social Links in Mobile Menu */}
            <div className="flex flex-col gap-3 pt-3 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-sm font-medium text-primary">SNS & ブログをフォロー</h3>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium text-foreground/90 hover:text-foreground transition-colors flex items-center gap-3 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="p-2 rounded-full bg-primary/10">
                    {link.icon}
                  </div>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
            
            {/* Enhanced Chat Button in Mobile Menu */}
            <Link
              to="/chat"
              className="mt-4 bg-primary hover:bg-primary/90 text-white py-4 px-4 rounded-lg flex items-center justify-center gap-3 shadow-md transition-all duration-300 hover:shadow-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MessageCircle className="h-6 w-6" />
              <span className="text-lg font-bold">AIチャットを今すぐ試す！</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
