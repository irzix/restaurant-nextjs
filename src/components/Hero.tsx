"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";

const TRANSITION_MS = 1000;
const MOBILE_BREAKPOINT = 768; // single slide, no nav below this

const SLIDES = [
  {
    src: "/images/slide-1.webp",
    subheading: "Experience",
    heading: ["Italiano", "Ristorante"],
    description: "Discover a gastronomic experience that transports you to the heart of Italy.",
  },
  {
    src: "/images/slide-2.webp",
    subheading: "Taste",
    heading: ["Authentic", "Cuisine"],
    description: "Handcrafted dishes from time-honored recipes and the finest seasonal ingredients.",
  },
  {
    src: "/images/slide-3.webp",
    subheading: "Heritage",
    heading: ["Rooted in", "Tradition"],
    description: "Where generations of culinary artistry meet the warmth of Italian hospitality.",
  },
];

type Slide = (typeof SLIDES)[number];

function ButtonArrow({
  arrowReEntering,
  onAnimationEnd,
}: {
  arrowReEntering: boolean;
  onAnimationEnd: () => void;
}) {
  return (
    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden">
      <Image
        src="/images/Button-Shape.png"
        alt=""
        width={40}
        height={40}
        className="absolute inset-0 h-full w-full object-contain"
        aria-hidden
      />
      <span
        className={`relative z-10 flex h-10 w-10 items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-full ${arrowReEntering ? "animate-enter-from-left" : ""}`}
        onAnimationEnd={onAnimationEnd}
      >
        <Image
          src="/images/RightArrow.png"
          alt=""
          width={24}
          height={8}
          className="object-contain"
          aria-hidden
        />
      </span>
    </span>
  );
}

function SlideContent({
  slide,
  showLink,
  arrowReEntering,
  onButtonMouseLeave,
  onArrowAnimationEnd,
}: {
  slide: Slide;
  showLink: boolean;
  arrowReEntering: boolean;
  onButtonMouseLeave: () => void;
  onArrowAnimationEnd: () => void;
}) {
  return (
    <>
      <p
        className="font-barlow-c flex items-center gap-4 font-normal uppercase tracking-[0.35em] text-header-accent"
        style={{ fontSize: "28px" }}
      >
        <span className="h-px w-8 bg-header-accent/70" aria-hidden />
        {slide.subheading}
        <span className="h-px w-8 bg-header-accent/70" aria-hidden />
      </p>
      <h1 className="font-gilda mt-6 text-4xl font-normal uppercase tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl">
        {slide.heading[0]}
        <br />
        {slide.heading[1]}
      </h1>
      <p className="mt-6 max-w-lg font-gilda text-base leading-relaxed text-white/95 sm:text-lg md:text-2xl">
        {slide.description}
      </p>
      {showLink && (
        <Link
          href="/about"
          className="group font-barlow-c mt-10 inline-flex h-14 w-full max-w-[280px] items-center justify-center gap-6 overflow-hidden rounded-lg border border-[#A68B5B] bg-[#1A1A1A] px-5 py-3 text-base font-semibold uppercase leading-none tracking-wide text-white transition-colors hover:border-[#B89B6B] hover:bg-[#252525] sm:h-[78px] sm:max-w-[280px] sm:gap-8 sm:px-6 sm:py-4 sm:text-[20px]"
          onMouseLeave={onButtonMouseLeave}
        >
          Learn more
          <ButtonArrow
            arrowReEntering={arrowReEntering}
            onAnimationEnd={onArrowAnimationEnd}
          />
        </Link>
      )}
    </>
  );
}

type Phase = "idle" | "out" | "in";

export function Hero() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [initialFadeDone, setInitialFadeDone] = useState(false);
  const [prevFlip, setPrevFlip] = useState(false);
  const [nextFlip, setNextFlip] = useState(false);
  const [arrowReEntering, setArrowReEntering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const goPrev = useCallback(() => {
    if (phase !== "idle") return;
    clearTimer();
    const next = (index - 1 + SLIDES.length) % SLIDES.length;
    setPhase("out");
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setIndex(next);
      setPhase("in");
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        setPhase("idle");
      }, TRANSITION_MS);
    }, TRANSITION_MS);
  }, [index, phase, clearTimer]);

  const goNext = useCallback(() => {
    if (phase !== "idle") return;
    clearTimer();
    const next = (index + 1) % SLIDES.length;
    setPhase("out");
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setIndex(next);
      setPhase("in");
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        setPhase("idle");
      }, TRANSITION_MS);
    }, TRANSITION_MS);
  }, [index, phase, clearTimer]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  const current = isMobile ? SLIDES[0]! : SLIDES[index]!;

  const handleButtonMouseLeave = useCallback(() => setArrowReEntering(true), []);
  const handleArrowAnimationEnd = useCallback(() => setArrowReEntering(false), []);

  const showTransition =
    !isMobile &&
    (!initialFadeDone && phase === "idle"
      ? "animate-fade-in-up"
      : phase === "out"
        ? "animate-fade-out"
        : phase === "in"
          ? "animate-fade-in"
          : "");

  return (
    <section className="relative min-h-screen overflow-x-hidden">
      <div className="absolute inset-0">
        {isMobile ? (
          <Image
            key={SLIDES[0].src}
            src={SLIDES[0].src}
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        ) : (
          SLIDES.map((slide, i) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt=""
              fill
              className={`object-cover transition-opacity duration-1000 ease-in-out ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              priority={i === 0}
              sizes="100vw"
            />
          ))
        )}
        <div className="absolute inset-0 bg-black/50" aria-hidden />
      </div>

      <div className="relative min-h-screen">
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-32 text-center sm:px-8">
          <div
            key={isMobile ? "mobile" : `${phase}-${index}`}
            className={`flex w-full max-w-2xl flex-col items-center ${showTransition}`}
            onAnimationEnd={() => {
              if (!initialFadeDone && phase === "idle" && !isMobile)
                setInitialFadeDone(true);
            }}
          >
            <SlideContent
              slide={current}
              showLink
              arrowReEntering={arrowReEntering}
              onButtonMouseLeave={handleButtonMouseLeave}
              onArrowAnimationEnd={handleArrowAnimationEnd}
            />
          </div>
        </div>
      </div>

      {!isMobile && (
        <>
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              type="button"
              onClick={goPrev}
              onMouseLeave={() => setPrevFlip(true)}
              className="group flex h-[120px] w-[120px] -translate-x-1/4 origin-center items-center justify-center rounded-full border border-white/50 bg-transparent transition-[transform,background-color,border-color] duration-500 ease-in-out delay-0 hover:scale-150 hover:border-white/50 hover:delay-500 lg:h-60 lg:w-60"
              aria-label="Previous slide"
            >
              <span
                className={`inline-flex origin-center scale-50 opacity-50 transition-transform duration-500 ease-in-out group-hover:translate-x-2 lg:scale-100 ${prevFlip ? "animate-flip-x" : ""}`}
                onAnimationEnd={() => setPrevFlip(false)}
              >
                <Image src="/images/LeftArrow.png" alt="" width={60} height={20} className="object-contain" aria-hidden />
              </span>
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center justify-end">
            <button
              type="button"
              onClick={goNext}
              onMouseLeave={() => setNextFlip(true)}
              className="group flex h-[120px] w-[120px] translate-x-1/4 origin-center items-center justify-center rounded-full border border-white/50 bg-transparent transition-[transform,background-color,border-color] duration-500 ease-in-out delay-0 hover:scale-150 hover:border-white/50 hover:delay-500 lg:h-60 lg:w-60"
              aria-label="Next slide"
            >
              <span
                className={`inline-flex origin-center scale-50 opacity-50 transition-transform duration-500 ease-in-out group-hover:-translate-x-2 lg:scale-100 ${nextFlip ? "animate-flip-x" : ""}`}
                onAnimationEnd={() => setNextFlip(false)}
              >
                <Image src="/images/RightArrow.png" alt="" width={60} height={20} className="object-contain" aria-hidden />
              </span>
            </button>
          </div>
        </>
      )}
    </section>
  );
}
