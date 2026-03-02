"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

const transitionClasses =
  "transition-[transform,opacity] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]";
const visibleClasses = "translate-y-0 opacity-100";
const hiddenClasses = "translate-y-12 opacity-0";

const EVENTS = [
  {
    title: "Mediterranean Wine Evening",
    date: "Every Thursday",
    time: "7:00 PM - 10:00 PM",
    description: "An exclusive tasting journey through Cyprus's finest vineyards, paired with artisanal cheeses and coastal appetizers.",
    image: "/images/Italianwine3.webp",
    tag: "Sommelier Choice"
  },
  {
    title: "Sunset Jazz & Seafood",
    date: "Saturdays",
    time: "6:00 PM - 11:00 PM",
    description: "Experience the magic of live jazz against the backdrop of the Paphos sunset, featuring our signature seafood platters.",
    image: "/images/Calamari.webp",
    tag: "Atmosphere"
  },
  {
    title: "Culinary Masterclass",
    date: "First Sunday of Month",
    time: "11:00 AM - 2:00 PM",
    description: "Join our Executive Chef for an intimate cooking session, learning the secrets of traditional Cypriot-Mediterranean fusion.",
    image: "/images/Chef.webp",
    tag: "Workshop"
  }
];

export default function EventsPage() {
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
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={sectionRef} className="min-h-screen bg-[#111] pt-32 overflow-hidden">
      {/* Hero Section */}
      <div className="px-6 sm:px-8 lg:px-12 mx-auto max-w-7xl mb-24">
        <div className="text-center">
          <div className={`flex items-center justify-center gap-3 ${transitionClasses} ${isVisible ? visibleClasses : hiddenClasses}`}>
            <span className="h-px w-12 bg-[#c9a962]/60" aria-hidden />
            <span className="font-barlow-c text-sm font-semibold uppercase tracking-[0.3em] text-[#c9a962]">
              Gatherings & Celebrations
            </span>
            <span className="h-px w-12 bg-[#c9a962]/60" aria-hidden />
          </div>
          <h1 className={`mt-6 font-gilda text-5xl sm:text-6xl lg:text-7xl text-[#f5f0e8] tracking-wide ${transitionClasses} ${isVisible ? visibleClasses : hiddenClasses}`} style={{ transitionDelay: "100ms" }}>
            Unforgettable Events
          </h1>
          <p className={`mt-8 font-barlow text-lg text-[#a39e94] max-w-2xl mx-auto ${transitionClasses} ${isVisible ? visibleClasses : hiddenClasses}`} style={{ transitionDelay: "150ms" }}>
            From intimate wine tastings to grand celebrations, Kyma Cyprus provides the perfect backdrop for your most cherished moments.
          </p>
        </div>
      </div>

      {/* Featured Events List */}
      <div className="px-4 sm:px-8 lg:px-12 mx-auto max-w-7xl space-y-24 mb-32">
        {EVENTS.map((event, index) => (
          <div
            key={index}
            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center ${transitionClasses} ${isVisible ? visibleClasses : hiddenClasses}`}
            style={{ transitionDelay: `${200 + index * 100}ms` }}
          >
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute -inset-2 bg-[#c9a962]/10 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/5 shadow-2xl">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-[#111]/80 backdrop-blur-md text-[#c9a962] font-barlow-c text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-[#c9a962]/20">
                    {event.tag}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 text-left">
              <div className="font-barlow-c text-[#c9a962] space-y-1 mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="uppercase tracking-[0.2em] text-sm font-bold">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="uppercase tracking-[0.2em] text-sm font-bold">{event.time}</span>
                </div>
              </div>
              <h2 className="font-gilda text-3xl sm:text-4xl text-[#f5f0e8] mb-6">{event.title}</h2>
              <p className="font-barlow text-lg text-[#a39e94] leading-relaxed mb-8 italic">
                "{event.description}"
              </p>
              <button className="inline-flex items-center gap-3 text-[#c9a962] font-barlow-c font-bold uppercase tracking-[0.2em] group">
                Reserve Your Spot
                <span className="w-8 h-px bg-[#c9a962] transition-all group-hover:w-12" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Private Dining / Custom Events Section */}
      <div className={`relative w-full py-32 bg-[#1a1a1a] ${transitionClasses} ${isVisible ? visibleClasses : hiddenClasses}`} style={{ transitionDelay: '500ms' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/slide-3.webp')] bg-cover bg-fixed grayscale" />
        </div>

        <div className="relative z-10 px-6 sm:px-8 lg:px-12 mx-auto max-w-4xl text-center">
          <h2 className="font-gilda text-4xl sm:text-5xl text-[#f5f0e8] mb-8">Host Your Private Occasion</h2>
          <p className="font-barlow text-lg text-[#a39e94] mb-12">
            Whether it's an intimate rehearsal dinner, a milestone anniversary, or a corporate retreat, our dedicated events team will craft an experience tailored to your vision.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
            <div className="p-6 rounded-xl border border-white/5 bg-black/20 backdrop-blur-sm">
              <h3 className="font-gilda text-2xl text-[#c9a962] mb-3">50+</h3>
              <p className="font-barlow-c text-xs text-[#a39e94] uppercase tracking-widest">Guest Capacity</p>
            </div>
            <div className="p-6 rounded-xl border border-white/5 bg-black/20 backdrop-blur-sm">
              <h3 className="font-gilda text-2xl text-[#c9a962] mb-3">Custom</h3>
              <p className="font-barlow-c text-xs text-[#a39e94] uppercase tracking-widest">Menu Design</p>
            </div>
            <div className="p-6 rounded-xl border border-white/5 bg-black/20 backdrop-blur-sm">
              <h3 className="font-gilda text-2xl text-[#c9a962] mb-3">Full</h3>
              <p className="font-barlow-c text-xs text-[#a39e94] uppercase tracking-widest">Venue Buyout</p>
            </div>
          </div>

          <a href="/contact" className="inline-block bg-[#c9a962] hover:bg-[#d4b978] text-[#111] font-barlow-c font-bold uppercase tracking-[0.2em] px-12 py-5 rounded-sm transition-all shadow-xl shadow-[#c9a962]/10">
            Enquire Now
          </a>
        </div>
      </div>
    </main>
  );
}
