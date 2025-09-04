import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, BarChart3, Filter, CheckCircle, Wine, Eye } from "lucide-react";
import TicketModal from "./TicketModal";
import { useState } from "react";

const allTickets = [
  {
    id: 1,
    section: "Pista Premium",
    price: "R$ 284,00",
    originalPrice: "R$ 568,00",
    zone: "Pista",
    status: "Mais barato",
    note: "Meia estudante",
    description: "Limitado a 2 ingressos por CPF",
    features: ["Visão clara"],
    urgency: "4 ingressos restantes nessa listagem em nosso site",
    rating: "10,0 Incrível"
  },
  {
    id: 2,
    section: "Frontstage",
    price: "R$ 203,00",
    originalPrice: "R$ 406,00",
    zone: "Frontstage",
    status: "Disponível",
    note: "Meia estudante",
    description: "Limitado a 2 ingressos por CPF",
    features: ["Visão clara"],
    urgency: "2 ingressos restantes nessa listagem em nosso site"
  },
  {
    id: 3,
    section: "Camarote Open Bar",
    price: "R$ 388,00",
    originalPrice: "R$ 776,00",
    zone: "Camarote",
    status: "Disponível",
    note: "Inteira",
    description: "Limitado a 2 ingressos por CPF",
    features: ["Inclui bebidas ilimitadas (cerveja, vinho e licor)", "Visão clara"],
    urgency: "4 ingressos restantes nessa listagem em nosso site"
  }
];

interface TicketListProps {}

const TicketList = ({}: TicketListProps) => {
  const [selectedTicket, setSelectedTicket] = useState<{name: string; price: string; zone: string; urgency: string; features?: string[]; note?: string; status?: string} | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState("todas");
  const [priceSort, setPriceSort] = useState("default");

  // Função para extrair valor numérico do preço
  const extractPrice = (priceString: string) => {
    return parseInt(priceString.replace(/[R$\s]/g, ''));
  };

  let filteredTickets = selectedZone === "todas" 
    ? allTickets 
    : allTickets.filter(ticket => ticket.zone.toLowerCase() === selectedZone.toLowerCase());

  // Aplicar ordenação por preço
  if (priceSort === "low-to-high") {
    filteredTickets = [...filteredTickets].sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
  } else if (priceSort === "high-to-low") {
    filteredTickets = [...filteredTickets].sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
  }

  const handleTicketClick = (ticket: typeof allTickets[0]) => {
    const modalTicket = {
      name: ticket.section,
      price: ticket.price,
      zone: ticket.zone,
      urgency: ticket.urgency,
      features: ticket.features,
      note: ticket.note,
      status: ticket.status
    };
    setSelectedTicket(modalTicket);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* Filtros integrados */}
      <div className="space-y-4 mb-6">
        <div className="flex gap-2 flex-wrap items-center">
          <Button variant="outline" size="sm" className="gap-2 text-xs sm:text-sm">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filtros</span>
          </Button>

          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="w-28 sm:w-32 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="pista">Pista</SelectItem>
              <SelectItem value="frontstage">Frontstage</SelectItem>
              <SelectItem value="camarote">Camarote</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceSort} onValueChange={setPriceSort}>
            <SelectTrigger className="w-36 sm:w-40 h-9">
              <SelectValue placeholder="Ordenar por preço" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Padrão</SelectItem>
              <SelectItem value="low-to-high">Menor preço</SelectItem>
              <SelectItem value="high-to-low">Maior preço</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          <span className="text-xs sm:text-sm">Classificar por preço</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} className="p-3 sm:p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  {ticket.status && (
                    <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${
                      ticket.status === "Mais barato" 
                        ? "bg-success text-success-foreground" 
                        : "bg-muted text-muted-foreground"
                     }`}>
                       <CheckCircle className="h-3 w-3" />
                       {ticket.status}
                     </span>
                  )}
                  {ticket.rating && (
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                      {ticket.rating}
                    </span>
                  )}
                </div>
                
                <h4 className="font-semibold text-sm sm:text-base">{ticket.section}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">{ticket.description}</p>
                
                {ticket.features && ticket.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                    {feature.includes('bebidas') ? (
                      <>
                        <Wine className="h-3 w-3" />
                        <span>{feature}</span>
                      </>
                    ) : feature.includes('Visão') ? (
                      <>
                        <Eye className="h-3 w-3" />
                        <span>{feature}</span>
                      </>
                    ) : (
                      <span>{feature}</span>
                    )}
                  </div>
                ))}
                
                <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                  <AlertTriangle className="h-3 w-3 flex-shrink-0" />
                  <span>{ticket.note}</span>
                </div>

                {ticket.urgency && (
                  <p className="text-xs text-pink-600 font-medium">
                    {ticket.urgency}
                  </p>
                )}
              </div>
              
              <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-center gap-2">
                <div className="flex flex-col items-start sm:items-end">
                  {(ticket as any).originalPrice && (
                    <div className="text-xs text-muted-foreground line-through mb-1">
                      De {(ticket as any).originalPrice}
                    </div>
                  )}
                  <div className="text-lg sm:text-xl font-bold text-green-600">
                    {(ticket as any).originalPrice ? `por ${ticket.price}` : ticket.price}
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="bg-ticket-green hover:bg-ticket-green/90 text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4"
                  onClick={() => handleTicketClick(ticket)}
                >
                  Selecionar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center text-xs text-muted-foreground mt-4">
        Showing {filteredTickets.length} of {allTickets.length}
      </div>

      <TicketModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticket={selectedTicket}
      />
    </div>
  );
};

export default TicketList;