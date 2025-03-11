
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

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
    { name: 'チャット', href: '/chat' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/90 dark:bg-black/90 backdrop-blur-lg shadow-sm py-4'
          : 'bg-white/70 dark:bg-black/70 backdrop-blur-sm py-6'
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col space-y-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation - Added z-index and better positioning */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden absolute left-0 right-0 bg-white/90 dark:bg-black/90 backdrop-blur-lg shadow-md ${isMobileMenuOpen ? 'max-h-60 mt-4 px-6 py-4' : 'max-h-0'}`}>
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
