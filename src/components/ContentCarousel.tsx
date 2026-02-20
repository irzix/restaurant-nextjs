"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

const SLIDES = [
  {
    id: 1,
    image: "/images/image-1.webp",
    imageAlt: "Italian dining experience",
    title: "Authentic Flavors",
    description:
      "Every dish tells a story of tradition and passion. From our kitchen to your table, experience the true taste of Italy.",
  },
  {
    id: 2,
    image: "/images/image-2.webp",
    imageAlt: "Curated wine selection",
    title: "Wine & Dine",
    description:
      "Our sommeliers have selected wines that perfectly complement each course. Raise a glass to la dolce vita.",
  },
  {
    id: 3,
    image: "/images/image-3.webp",
    imageAlt: "Fresh ingredients",
    title: "Seasonal Ingredients",
    description:
      "We source the finest seasonal produce and ingredients to bring you dishes that celebrate the best of each moment.",
  },
  {
    id: 4,
    image: "/images/image-4.webp",
    imageAlt: "Elegant atmosphere",
    title: "An Unforgettable Evening",
    description:
      "Whether a romantic dinner or a celebration with loved ones, our restaurant sets the stage for memorable moments.",
  },
  {
    id: 5,
    image: "/images/image-5.webp",
    imageAlt: "Chef's signature",
    title: "Crafted with Care",
    description:
      "Our chefs pour heart and soul into every plate. Discover why guests return again and again.",
  },
];

const transitionClasses =
  "transition-[transform,opacity] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]";
const visibleClasses = "translate-y-0 opacity-100";
const hiddenClasses = "translate-y-12 opacity-0";

export function ContentCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"prev" | "next">("next");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback(
    (nextIndex: number, dir: "prev" | "next") => {
      if (isTransitioning || nextIndex === index) return;
      setDirection(dir);
      setIsTransitioning(true);
      setIndex(nextIndex);
    },
    [index, isTransitioning]
  );

  const goPrev = useCallback(() => {
    const next = (index - 1 + SLIDES.length) % SLIDES.length;
    goTo(next, "prev");
  }, [index, goTo]);

  const goNext = useCallback(() => {
    const next = (index + 1) % SLIDES.length;
    goTo(next, "next");
  }, [index, goTo]);

  useEffect(() => {
    if (!isTransitioning) return;
    const t = setTimeout(() => setIsTransitioning(false), 500);
    return () => clearTimeout(t);
  }, [isTransitioning, index]);

  const goNextRef = useRef(goNext);
  goNextRef.current = goNext;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handle = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  // Auto-advance every 5 seconds on desktop only (skip on mobile for performance)
  useEffect(() => {
    if (isMobile) return;
    const interval = setInterval(() => goNextRef.current(), 5000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const slide = SLIDES[index]!;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#111] py-16 sm:py-20 lg:py-24 overflow-hidden"
      aria-labelledby="carousel-heading"
      aria-roledescription="carousel"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-12 sm:mb-16 ${transitionClasses} ${
            isVisible ? visibleClasses : hiddenClasses
          }`}
          style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
        >
          <p className="font-barlow-c text-[28px] font-medium uppercase tracking-[0.2em] text-[#c9a962] flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#c9a962]" aria-hidden />
            AUTHENTIC
            <span className="h-px w-8 bg-[#c9a962]" aria-hidden />
          </p>
          <h2
            id="carousel-heading"
            className="font-gilda text-4xl sm:text-5xl lg:text-6xl font-normal text-white mb-6"
          >
            Quality Ingredients
          </h2>
          <p className="font-barlow text-lg leading-relaxed text-white/90">
            We offer an exquisite culinary journey, featuring authentic dishes crafted with the finest regional ingredients.
          </p>
        </div>

        {/* Carousel */}
        <div
          className={`relative ${transitionClasses} ${
            isVisible ? visibleClasses : hiddenClasses
          }`}
          style={{ transitionDelay: isVisible ? "500ms" : "0ms" }}
        >
          <div
            className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center"
            style={{ minHeight: "400px" }}
          >
            {/* Image */}
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-lg bg-[#1a1a1a] ${
                isTransitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
              } transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}
            >
              <Image
                key={slide.image}
                src={slide.image}
                alt={slide.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>

            {/* Content */}
            <div
              className={`flex flex-col justify-center text-center lg:text-left ${
                isTransitioning
                  ? direction === "next"
                    ? "opacity-0 translate-x-4"
                    : "opacity-0 -translate-x-4"
                  : "opacity-100 translate-x-0"
              } transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}
            >
              <p className="font-barlow-c text-xs font-medium uppercase tracking-[0.2em] text-[#c9a962] mb-3">
                {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
              </p>
              <h3 className="font-gilda text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f5f0e8] mb-4">
                {slide.title}
              </h3>
              <p className="font-barlow text-lg leading-relaxed text-[#f5f0e8]/90 max-w-xl mx-auto lg:mx-0">
                {slide.description}
              </p>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center justify-center gap-6 mt-10 sm:mt-12">
            <button
              type="button"
              onClick={goPrev}
              disabled={isTransitioning}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a962]/50 bg-transparent text-[#c9a962] transition-colors hover:border-[#c9a962] hover:bg-[#c9a962]/10 disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Previous slide"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Slide indicators">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => {
                    if (i !== index) goTo(i, i > index ? "next" : "prev");
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-[#c9a962]" : "w-2 bg-[#c9a962]/40 hover:bg-[#c9a962]/60"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={isTransitioning}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a962]/50 bg-transparent text-[#c9a962] transition-colors hover:border-[#c9a962] hover:bg-[#c9a962]/10 disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Next slide"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
