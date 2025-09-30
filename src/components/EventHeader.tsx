import { Heart, Share2, Search, User, Menu, Clock, Ticket, Settings, HelpCircle, MapPin, Bell, LogOut, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { differenceInDays } from "date-fns";
import { useState, useEffect } from "react";
import NotificationModal from "./NotificationModal";
import SettingsModal from "./SettingsModal";
import SupportModal from "./SupportModal";
import UserMenuModal from "./UserMenuModal";
// import eventBanner from "@/assets/event-banner.jpg";
const eventBanner = "/lovable-uploads/98e03c32-dc48-4f1d-aa0a-7aae31d6e317.png";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
const EventHeader = () => {
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const calculateDaysRemaining = () => {
      const eventDate = new Date(2025, 8, 26, 20, 0, 0); // 26 de setembro de 2025, 20:00
      const today = new Date();
      const days = Math.ceil(differenceInDays(eventDate, today));
      setDaysRemaining(days > 0 ? days : 0);
    };

    // Calcular inicialmente
    calculateDaysRemaining();

    // Atualizar a cada 24 horas (86400000 ms)
    const interval = setInterval(calculateDaysRemaining, 86400000);

    return () => clearInterval(interval);
  }, []);

  const goToTickets = () => navigate('/dashboard');
  const goToLogin = () => navigate('/auth');

  return (
    <div className="border-b bg-card">
      {/* Top Navigation */}
      <div className="border-b px-4 py-2">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-lg font-bold text-primary">
              viagogo
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 ml-auto">
            <Button variant="ghost" size="sm" className="text-xs sm:text-sm" onClick={() => navigate('/br/ingressos-shows/rock-e-pop/henrique-juliano-ingressos/e-159198659')}>
              Home
            </Button>
            <Button variant="ghost" size="sm" className="text-xs sm:text-sm" onClick={() => {
              console.log('Clicando em Entre ou Cadastre-se');
              console.log('Estado antes:', isUserMenuOpen);
              setIsUserMenuOpen(true);
              console.log('Estado depois:', true);
            }}>
              Entre ou Cadastre-se
            </Button>
            <Button variant="ghost" size="sm" className="text-xs sm:text-sm" onClick={() => setIsSupportModalOpen(true)}>
              Ajuda
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsUserMenuOpen(true)}>
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
              <SheetContent className="w-80 p-0">
                <div className="flex flex-col h-full">
                  {/* Header do Menu */}
                  <div className="bg-primary text-primary-foreground p-6 border-b">
                    <div className="text-lg font-bold">viagogo</div>
                    <div className="text-sm opacity-90 mt-1">Menu Principal</div>
                  </div>

                  {/* Perfil do Usuário */}
                  {user && (
                    <div className="p-4 border-b bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <UserCircle2 className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">Logado como:</div>
                          <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Menu Items */}
                  <div className="flex-1 p-4 space-y-2">
                  {/* Principais */}
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Menu
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start gap-3 h-11 border border-transparent hover:border-border hover:bg-accent/50"
                        onClick={() => navigate('/br/ingressos-shows/rock-e-pop/henrique-juliano-ingressos/e-159198659')}
                      >
                        <MapPin className="h-4 w-4" />
                        Home
                      </Button>

                      <Button 
                        variant="ghost" 
                        className="w-full justify-start gap-3 h-11 border border-transparent hover:border-border hover:bg-accent/50"
                        onClick={() => setIsUserMenuOpen(true)}
                      >
                        <User className="h-4 w-4" />
                        Entre ou Cadastre-se
                      </Button>

                      <Button 
                        variant="ghost" 
                        className="w-full justify-start gap-3 h-11 border border-transparent hover:border-border hover:bg-accent/50"
                        onClick={() => setIsSupportModalOpen(true)}
                      >
                        <HelpCircle className="h-4 w-4" />
                        Ajuda
                      </Button>
                    </div>
                  </div>

                  {/* Footer do Menu */}
                  <div className="p-4 border-t bg-muted/20">
                    <div className="flex gap-2 justify-center">
                      <img src="https://flagcdn.com/w40/br.png" alt="Português" className="h-6 w-auto" />
                      <img src="https://flagcdn.com/w40/us.png" alt="English" className="h-6 w-auto opacity-50" />
                      <img src="https://flagcdn.com/w40/es.png" alt="Español" className="h-6 w-auto opacity-50" />
                    </div>
                  </div>
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
                  <Clock className="h-3 w-3" />
                  {daysRemaining > 0 ? `${daysRemaining} dias restantes` : 'Evento hoje!'}
                </span>
                <span>26 set • sex • 20:00 • 2025</span>
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                Espaço Classic - Mogi Mirim, São Paulo, Brasil
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

      {/* Modals */}
      <NotificationModal 
        isOpen={isNotificationModalOpen} 
        onClose={() => setIsNotificationModalOpen(false)} 
      />
      <SettingsModal 
        isOpen={isSettingsModalOpen} 
        onClose={() => setIsSettingsModalOpen(false)} 
      />
      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />
      <UserMenuModal 
        isOpen={isUserMenuOpen} 
        onClose={() => setIsUserMenuOpen(false)} 
      />
    </div>
  );
};

export default EventHeader;