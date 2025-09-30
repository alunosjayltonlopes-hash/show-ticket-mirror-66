import EventHeader from "@/components/EventHeader";
import Footer from "@/components/Footer";
import TicketList from "@/components/TicketList";
import ArtistInfo from "@/components/ArtistInfo";
import ManifestoHero from "@/components/ManifestoHero";
import ManifestoInformacoes from "@/components/ManifestoInformacoes";

const EventTicketsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <EventHeader />
      
      <main className="w-full">
        <ManifestoHero />
        <ArtistInfo />
        <ManifestoInformacoes />
        
        {/* Seção de Ingressos */}
        <section className="py-8 bg-gray-100">
          <TicketList />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EventTicketsPage;
