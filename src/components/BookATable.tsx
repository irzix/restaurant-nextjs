"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

const transitionClasses =
  "transition-[transform,opacity] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]";
const visibleClasses = "translate-y-0 opacity-100";
const hiddenClasses = "translate-y-12 opacity-0";

export function BookATable() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden pt-[60px]"
      style={{ backgroundColor: "#111" }}
      aria-labelledby="book-a-table-heading"
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0 h-full min-h-[520px] sm:min-h-[600px] lg:min-h-[680px]">
        <Image
          src="/images/slide-2.webp"
          alt="Elegant restaurant interior with tables and warm ambiance"
          fill
          className="object-cover object-center opacity-50"
          sizes="100vw"
          priority={false}
        />
        {/* Radial overlay (vignette) */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(17,17,17,0.3) 60%, #111 100%)",
          }}
          aria-hidden
        />
        {/* Left fade */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #111 0%, #111 8%, rgba(17,17,17,0.6) 22%, transparent 42%)",
          }}
          aria-hidden
        />
        {/* Right fade */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to left, #111 0%, #111 8%, rgba(17,17,17,0.6) 22%, transparent 42%)",
          }}
          aria-hidden
        />
        {/* Top fade */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #111 0%, rgba(17,17,17,0.5) 12%, transparent 28%)",
          }}
          aria-hidden
        />
        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #111 0%, rgba(17,17,17,0.5) 12%, transparent 28%)",
          }}
          aria-hidden
        />
      </div>

      {/* Centered content: no form container background */}
      <div className="relative z-10 flex min-h-[520px] flex-col items-center justify-center px-4 py-12 text-center sm:min-h-[600px] sm:px-6 sm:py-16 lg:min-h-[680px]">
        {/* GET IN TOUCH with lines — centered */}
        <div
          className={`flex items-center justify-center gap-3 ${transitionClasses} ${
            isVisible ? visibleClasses : hiddenClasses
          }`}
          style={{ transitionDelay: isVisible ? "50ms" : "0ms" }}
        >
          <span
            className="h-px w-8 bg-[#c9a962]/80 sm:w-12"
            aria-hidden
          />
          <span
            className="font-barlow-c text-[28px] font-semibold uppercase tracking-[0.25em] text-[#c9a962]"
            aria-hidden
          >
            Get In Touch
          </span>
          <span
            className="h-px w-8 bg-[#c9a962]/80 sm:w-12"
            aria-hidden
          />
        </div>

        <h2
          id="book-a-table-heading"
          className={`mt-4 font-gilda text-4xl font-normal tracking-wide text-[#f5f0e8] sm:text-5xl ${transitionClasses} ${
            isVisible ? visibleClasses : hiddenClasses
          }`}
          style={{ transitionDelay: isVisible ? "100ms" : "0ms" }}
        >
          Book A Table
        </h2>
        <p
          className={`mx-auto mt-3 max-w-xl font-barlow text-base leading-relaxed text-[#f5f0e8] sm:text-lg ${transitionClasses} ${
            isVisible ? visibleClasses : hiddenClasses
          }`}
          style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
        >
          Celebrate the timeless flavors of Italy,
          <br />
          where every meal is a masterpiece.
        </p>

        {/* Form: no wrapper background, rounded layout with spacing */}
        <form
          className={`mt-10 w-full max-w-md space-y-4 rounded-lg px-2 sm:px-0 ${transitionClasses} ${
            isVisible ? visibleClasses : hiddenClasses
          }`}
          style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="sr-only">Name</span>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full rounded-md border-0 bg-[#1F1F1F]/90 px-4 py-3 font-barlow text-[#e8e8e8] placeholder:text-[#888] focus:outline-none focus:ring-2 focus:ring-[#c9a962]/50"
              />
            </label>
            <label className="block">
              <span className="sr-only">Date</span>
              <input
                type="date"
                name="date"
                placeholder="Date"
                className="w-full rounded-md border-0 bg-[#1F1F1F]/90 px-4 py-3 font-barlow text-[#e8e8e8] placeholder:text-[#888] focus:outline-none focus:ring-2 focus:ring-[#c9a962]/50"
              />
            </label>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="sr-only">Email</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full rounded-md border-0 bg-[#1F1F1F]/90 px-4 py-3 font-barlow text-[#e8e8e8] placeholder:text-[#888] focus:outline-none focus:ring-2 focus:ring-[#c9a962]/50"
              />
            </label>
            <label className="block">
              <span className="sr-only">Guests</span>
              <input
                type="number"
                name="guests"
                placeholder="Guests"
                min={1}
                max={20}
                className="w-full rounded-md border-0 bg-[#1F1F1F]/90 px-4 py-3 font-barlow text-[#e8e8e8] placeholder:text-[#888] focus:outline-none focus:ring-2 focus:ring-[#c9a962]/50"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-[#EBAA54] px-6 py-4 font-barlow-c text-base font-semibold uppercase tracking-widest text-[#1a1a1a] transition-colors hover:bg-[#d4a04a] focus:outline-none focus:ring-2 focus:ring-[#c9a962]/50"
          >
            Make A Reservation
          </button>
        </form>
      </div>
    </section>
  );
}
