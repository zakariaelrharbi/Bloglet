import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80",
    title: "Welcome to our Blog",
    subtitle: "Discover the latest news and insights from our team.",
    cta: "Read the Blog",
    route: "/#latest-blogs",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80",
    title: "Insights for the Future",
    subtitle: "Stay ahead of the curve with our expert analysis.",
    cta: "Explore Topics",
    route: "/#latest-blogs",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
    title: "Join Our Community",
    subtitle: "Connect with like-minded individuals and share ideas.",
    cta: "Sign Up Today",
    route: "/signup",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleCtaClick = (route) => {
    if (route.startsWith("/#")) {
      const targetId = route.replace("/#", "");
      if (window.location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({
            behavior: "smooth",
          });
        }, 100);
      } else {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: "smooth",
        });
      }
    } else {
      navigate(route);
    }
  };

  return (
    <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-brand-navy">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{
            opacity: 0,
            scale: 1.05,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/40 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.h1
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.3,
                duration: 0.5,
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif max-w-4xl drop-shadow-lg"
            >
              {slides[currentSlide].title}
            </motion.h1>
            <motion.p
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.5,
                duration: 0.5,
              }}
              className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl drop-shadow-md font-medium"
            >
              {slides[currentSlide].subtitle}
            </motion.p>
            <motion.button
              onClick={() => handleCtaClick(slides[currentSlide].route)}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.7,
                duration: 0.5,
              }}
              className="px-8 py-3 bg-brand-navy text-white rounded-md hover:bg-slate-800 transition-colors font-medium shadow-lg border border-slate-700 hover:border-slate-600"
            >
              {slides[currentSlide].cta}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
