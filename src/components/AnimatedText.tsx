
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  duration?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  once = true,
  delay = 0,
  duration = 50,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);

  useEffect(() => {
    if (rendered.current && once) return;
    
    const element = elementRef.current;
    if (!element) return;
    
    const spans = Array.from(element.children) as HTMLSpanElement[];
    
    spans.forEach((span, i) => {
      span.style.opacity = '0';
      span.style.transform = 'translateY(10px)';
      span.style.transition = `all 0.25s ease`;
      span.style.transitionDelay = `${delay + (i * duration)}ms`;
    });
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          spans.forEach((span) => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
          });
          rendered.current = true;
          if (once) observer.disconnect();
        } else if (!once) {
          spans.forEach((span) => {
            span.style.opacity = '0';
            span.style.transform = 'translateY(10px)';
          });
        }
      },
      { threshold: 0.2 }
    );
    
    observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, [text, once, delay, duration]);

  return (
    <div ref={elementRef} className={cn("inline-block", className)}>
      {text.split('').map((char, i) => (
        <span 
          key={`${char}-${i}`} 
          className="inline-block transition-all"
          style={{ willChange: 'opacity, transform' }}
        >
          {char === ' ' ? <>&nbsp;</> : char}
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;
