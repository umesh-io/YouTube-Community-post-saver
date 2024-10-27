import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import HeroScene from './HeroScene';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const desc = descRef.current;
    const button = buttonRef.current;

    if (title) {
      title.style.opacity = '0';
      title.style.transform = 'translateY(20px)';
      setTimeout(() => {
        title.style.transition = 'all 0.8s ease-out';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
      }, 100);
    }

    if (desc) {
      desc.style.opacity = '0';
      desc.style.transform = 'translateY(20px)';
      setTimeout(() => {
        desc.style.transition = 'all 0.8s ease-out';
        desc.style.opacity = '1';
        desc.style.transform = 'translateY(0)';
      }, 300);
    }

    if (button) {
      button.style.opacity = '0';
      button.style.transform = 'scale(0.5)';
      setTimeout(() => {
        button.style.transition = 'all 0.5s ease-out';
        button.style.opacity = '1';
        button.style.transform = 'scale(1)';
      }, 500);
    }
  }, []);

  return (
    <section className="relative bg-blue-600 text-white py-32 md:py-40 overflow-hidden">
      <HeroScene />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-6 font-sans bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
        >
          Your YouTube Content Gallery
        </h2>
        
        <p 
          ref={descRef}
          className="text-xl md:text-2xl mb-8 font-light text-blue-100"
        >
          Discover and organize amazing content from creators.
        </p>
        
        <Button 
          ref={buttonRef}
          size="lg" 
          className="bg-white text-blue-600 hover:bg-blue-50 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 rounded-xl text-lg px-8 py-6"
        >
          Get Started
        </Button>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/0 via-blue-600/50 to-blue-600 pointer-events-none" />
    </section>
  );
}