"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

const MENU_ITEMS = [
  {
    id: "bolognese",
    name: "Bolognese",
    description:
      "Classic spaghetti tossed in a savory, slow-cooked meat sauce with Parmesan.",
    price: "$64",
    image: "/images/Bolognese.webp",
    imageAlt: "Bolognese pasta in a bowl",
  },
  {
    id: "carbonara",
    name: "Carbonara",
    description:
      "Classic Roman dish with pancetta, eggs, Pecorino Romano, and black pepper.",
    price: "$58",
    image: "/images/Carbonara2.webp",
    imageAlt: "Carbonara pasta in a white bowl",
  },
  {
    id: "calamari",
    name: "Calamari",
    description:
      "Crispy, golden-fried calamari served with a side of marinara and lemon wedges.",
    price: "$39",
    image: "/images/Calamari.webp",
    imageAlt: "Fried calamari with lemon wedges",
  },
  {
    id: "bistecca",
    name: "Bistecca",
    description:
      "Juicy steak in a rich green peppercorn and brandy cream sauce.",
    price: "$72",
    image: "/images/Bistecca.webp",
    imageAlt: "Bistecca steak with sauce",
  },
  {
    id: "lasagna",
    name: "Lasagna",
    description:
      "Layers of pasta, slow-cooked meat sauce, béchamel, and Parmesan.",
    price: "$78",
    image: "/images/Lasagna.webp",
    imageAlt: "Lasagna in a baking dish",
  },
  {
    id: "cacciatora",
    name: "Cacciatora",
    description:
      "A seafood twist featuring shrimp, calamari, and mussels in a fragrant tomato and white wine sauce.",
    price: "$62",
    image: "/images/Cacciatora.webp",
    imageAlt: "Cacciatora seafood stew",
  },
  {
    id: "branzino",
    name: "Branzino",
    description:
      "Whole Mediterranean sea bass oven-roasted with fresh herbs, garlic, and olive oil.",
    price: "$54",
    image: "/images/Branzino.webp",
    imageAlt: "Whole baked branzino with herbs and lemon",
  },
  {
    id: "osso-buco",
    name: "Osso Buco",
    description:
      "A timeless Italian favorite, braised to perfection and paired with seasonal vegetables.",
    price: "$67",
    image: "/images/Osso Buco.webp",
    imageAlt: "Osso buco with vegetables",
  },
];

function ForkKnifeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
    </svg>
  );
}

const transitionClasses =
  "transition-[transform,opacity] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]";
const visibleClasses = "translate-y-0 opacity-100";
const hiddenClasses = "translate-y-12 opacity-0";

export function OurMenu() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const leftColumn = MENU_ITEMS.slice(0, 4);
  const rightColumn = MENU_ITEMS.slice(4, 8);

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
      className="w-full py-16 md:py-24"
      style={{ backgroundColor: "#111" }}
      aria-labelledby="our-menu-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 md:mb-16 text-center">
          <h2
            id="our-menu-heading"
            className={`font-[family-name:var(--font-gilda)] text-4xl md:text-5xl lg:text-6xl text-white tracking-wide ${transitionClasses} ${
              isVisible ? visibleClasses : hiddenClasses
            }`}
            style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
          >
            Our Menu
          </h2>
          <div
            className={`mt-4 flex items-center justify-center gap-4 ${transitionClasses} ${
              isVisible ? visibleClasses : hiddenClasses
            }`}
            style={{ transitionDelay: isVisible ? "450ms" : "0ms" }}
          >
            <span className="h-px flex-1 max-w-[80px] md:max-w-[120px] bg-[#c9a962]" />
            <span className="flex flex-col items-center text-[#c9a962]">
              <ForkKnifeIcon className="h-5 w-5 md:h-6 md:w-6" />
              <span className="font-[family-name:var(--font-barlow-c)] text-xs md:text-sm uppercase tracking-widest mt-1">
                AL DENTE
              </span>
            </span>
            <span className="h-px flex-1 max-w-[80px] md:max-w-[120px] bg-[#c9a962]" />
          </div>
        </header>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10 md:gap-y-12">
          {/* Left column */}
          <div
            className={`space-y-10 md:space-y-12 ${transitionClasses} ${
              isVisible ? visibleClasses : hiddenClasses
            }`}
            style={{ transitionDelay: isVisible ? "500ms" : "0ms" }}
          >
            {leftColumn.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
          {/* Right column */}
          <div
            className={`space-y-10 md:space-y-12 ${transitionClasses} ${
              isVisible ? visibleClasses : hiddenClasses
            }`}
            style={{ transitionDelay: isVisible ? "550ms" : "0ms" }}
          >
            {rightColumn.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MenuItem({
  item,
}: {
  item: (typeof MENU_ITEMS)[number];
}) {
  return (
    <article className="flex gap-4">
      <div className="relative shrink-0 w-20 h-20 md:w-24 md:h-24 group">
        {/* Enlarged image on hover */}
        <div
          className="absolute bottom-full left-0 z-20 mb-2 origin-bottom-left scale-95 opacity-0 shadow-2xl ring-1 ring-white/10 transition-[transform,opacity] duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 pointer-events-none"
          aria-hidden
        >
          <div className="relative h-52 w-52 overflow-hidden rounded-lg sm:h-64 sm:w-64">
            <Image
              src={item.image}
              alt=""
              fill
              className="object-cover"
              sizes="256px"
            />
          </div>
        </div>
        {/* Thumbnail */}
        <div className="relative h-full w-full overflow-hidden rounded transition-transform duration-300 ease-out group-hover:scale-105 cursor-pointer">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80px, 96px"
          />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-[family-name:var(--font-gilda)] text-xl md:text-2xl text-white shrink-0">
            {item.name}
          </h3>
          <span className="flex-1 min-w-[20px] border-b border-dotted border-white/40 self-end mb-1.5" />
          <span className="font-[family-name:var(--font-gilda)] text-lg md:text-xl text-white shrink-0">
            {item.price}
          </span>
        </div>
        <p className="mt-2 font-[family-name:var(--font-barlow)] text-sm md:text-base text-white/80 leading-relaxed">
          {item.description}
        </p>
      </div>
    </article>
  );
}
