import EventHeader from "@/components/EventHeader";
import ArtistInfo from "@/components/ArtistInfo";
import TicketList from "@/components/TicketList";
import TicketMap from "@/components/TicketMap";
import CookieBanner from "@/components/CookieBanner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { User, Ticket } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <EventHeader />
      
      {/* Auth Buttons */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-end gap-2">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Ticket className="h-4 w-4" />
                    Meus Ingressos
                  </Button>
                </Link>
                <span className="text-sm text-muted-foreground flex items-center">
                  Olá, {user.email?.split('@')[0]}
                </span>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  LOGIN
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Mobile: Stack everything vertically, Desktop: Side columns */}
          <div className="lg:order-1 space-y-4 sm:space-y-6">
            <ArtistInfo />
            <div className="hidden sm:block">
              <TicketMap />
            </div>
          </div>
          
          {/* Main content - Ticket List */}
          <div className="lg:col-span-2 lg:order-2">
            <TicketList />
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
