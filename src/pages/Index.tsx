import EventHeader from "@/components/EventHeader";
import TicketFilters from "@/components/TicketFilters";
import ArtistInfo from "@/components/ArtistInfo";
import TicketList from "@/components/TicketList";
import TicketMap from "@/components/TicketMap";
import CookieBanner from "@/components/CookieBanner";
import { useState } from "react";

const Index = () => {
  const [selectedZone, setSelectedZone] = useState("todas");

  return (
    <div className="min-h-screen bg-background">
      <EventHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <TicketFilters selectedZone={selectedZone} onZoneChange={setSelectedZone} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
          {/* Mobile: Stack everything vertically, Desktop: Side columns */}
          <div className="lg:order-1 space-y-4 sm:space-y-6">
            <ArtistInfo />
            <div className="hidden sm:block">
              <TicketMap />
            </div>
          </div>
          
          {/* Main content - Ticket List */}
          <div className="lg:col-span-2 lg:order-2">
            <TicketList selectedZone={selectedZone} />
          </div>

          {/* Mobile: Show map at bottom */}
          <div className="sm:hidden">
            <TicketMap />
          </div>
        </div>
      </div>
      
      {/* Cookie Banner */}
      <CookieBanner />
    </div>
  );
};

export default Index;
