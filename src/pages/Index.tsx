import EventHeader from "@/components/EventHeader";
import ManifestoHero from "@/components/ManifestoHero";
import ManifestoInfo from "@/components/ManifestoInfo";
import ManifestoStadiumMap from "@/components/ManifestoStadiumMap";
import TicketList from "@/components/TicketList";
import ManifestoVideo from "@/components/ManifestoVideo";
import ManifestoInformacoes from "@/components/ManifestoInformacoes";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <EventHeader />
      
      {/* Manifesto Hero Section */}
      <ManifestoHero />
      
      {/* Event Info Card */}
      <div className="py-8">
        <ManifestoInfo />
      </div>

      {/* Stadium Map */}
      <ManifestoStadiumMap />
      
      {/* Tickets Section - Replacing "INGRESSOS ESGOTADOS" */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-2">INGRESSOS DISPONÍVEIS</h2>
          <p className="text-muted-foreground">Escolha sua categoria e garanta seu lugar!</p>
        </div>
        <TicketList />
      </div>

      {/* Video Section */}
      <ManifestoVideo />

      {/* Informações Section */}
      <ManifestoInformacoes />
      
      {/* Footer */}
      <Footer />
      
      {/* Cookie Banner */}
      <CookieBanner />
    </div>
  );
};

export default Index;