import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { OurStory } from "@/components/OurStory";
import { LaDolceVita } from "@/components/LaDolceVita";
import { ContentCarousel } from "@/components/ContentCarousel";
import { OurMenu } from "@/components/OurMenu";
import { WineSelection } from "@/components/WineSelection";
import { OurChef } from "@/components/OurChef";
import { CustomerReviews } from "@/components/CustomerReviews";
import { HomeBlogSection } from "@/components/HomeBlogSection";
import { BookATable } from "@/components/BookATable";
import { ScrollToHash } from "@/components/ScrollToHash";

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
