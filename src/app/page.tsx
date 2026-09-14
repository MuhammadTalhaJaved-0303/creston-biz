import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Contact } from "@/components/sections/contact/Contact";
import { Hero } from "@/components/sections/hero/Hero";
import { Industries } from "@/components/sections/industries/Industries";
import { Leadership } from "@/components/sections/leadership/Leadership";
import { Process } from "@/components/sections/process/Process";
import { Services } from "@/components/sections/services/Services";
import { Stack } from "@/components/sections/stack/Stack";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Services />
        <Stack />
        <Process />
        <Industries />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
