import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { OurStory } from "@/components/sections/OurStory";
import { LaDolceVita } from "@/components/sections/LaDolceVita";
import { ContentCarousel } from "@/components/sections/ContentCarousel";
import { OurMenu } from "@/components/sections/OurMenu";
import { WineSelection } from "@/components/sections/WineSelection";
import { OurChef } from "@/components/sections/OurChef";
import { CustomerReviews } from "@/components/sections/CustomerReviews";
import { HomeBlogSection } from "@/components/sections/HomeBlogSection";
import { BookATable } from "@/components/sections/BookATable";
import { ScrollToHash } from "@/components/ui/ScrollToHash";

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollToHash />
      <Hero />
      <Features />
      <OurStory />
      <LaDolceVita />
      <OurChef />
      <ContentCarousel />
      <OurMenu />
      <WineSelection />
      <CustomerReviews />
      <HomeBlogSection />
      <BookATable />
    </main>
  );
}
