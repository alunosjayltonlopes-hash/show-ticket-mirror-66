import { Heart, Share2, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { differenceInDays } from "date-fns";
import { useState, useEffect } from "react";
import eventBanner from "@/assets/event-banner.jpg";

const EventHeader = () => {
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    const calculateDaysRemaining = () => {
      const eventDate = new Date(2025, 8, 26); // 26 de setembro de 2025 (mês 8 = setembro)
      const today = new Date();
      const days = differenceInDays(eventDate, today);
      setDaysRemaining(days > 0 ? days : 0);
    };

    // Calcular inicialmente
    calculateDaysRemaining();

    // Atualizar a cada 24 horas (86400000 ms)
    const interval = setInterval(calculateDaysRemaining, 86400000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="border-b bg-card">
      {/* Top Navigation */}
      <div className="border-b px-4 py-2">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-xs sm:text-sm text-muted-foreground">BRL</div>
            <div className="text-xs sm:text-sm text-muted-foreground">PT</div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 ml-auto">
            <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
              Meus ingressos
            </Button>
            <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
              Entrar
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <User className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <Button variant="ghost" className="justify-start">
                    Meus ingressos
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    Entrar
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Event Info */}
      <div className="px-4 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <img 
              src={eventBanner} 
              alt="Event" 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl font-bold mb-2 leading-tight">
                Henrique & Juliano
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded text-xs w-fit flex items-center gap-1">
                  ⏰ {daysRemaining > 0 ? `${daysRemaining} dias restantes` : 'Evento hoje!'}
                </span>
                <span>26 set • sex • 20:00 • 2025</span>
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                Espaço Classic Mogi Mirim, São Paulo, São Paulo, Brasil
              </div>
              <div className="text-xs sm:text-sm text-orange-600 mt-2">
                É necessário ter mais de 18 anos de idade para participar deste evento.
              </div>
            </div>
            <div className="flex gap-2 sm:flex-col sm:self-start">
              <Button variant="outline" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;