import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, BarChart3 } from "lucide-react";
import TicketModal from "./TicketModal";
import { useState } from "react";

const allTickets = [
  {
    id: 1,
    section: "FRONTSTAGE",
    price: "R$ 231",
    zone: "Frontstage",
    status: "Mais barato",
    note: "Meia estudante",
    description: "Zona frente do palco"
  },
  {
    id: 2,
    section: "CAMAROTE INTENSE",
    price: "R$ 354",
    zone: "Camarote",
    status: "Disponível",
    note: "Área VIP",
    description: "Área exclusiva com vista privilegiada"
  },
  {
    id: 3,
    section: "CAMAROTE IMPERIAL",
    price: "R$ 607",
    zone: "Camarote",
    status: "Disponível",
    note: "Premium",
    description: "Camarote premium com serviços inclusos"
  },
  {
    id: 4,
    section: "CAMAROTE DO PATRÃO",
    price: "R$ 919",
    zone: "Camarote",
    status: "Limitado",
    note: "Área exclusiva",
    description: "A melhor experiência do evento"
  },
  {
    id: 5,
    section: "CAMAROTE HYPE",
    price: "R$ 628",
    zone: "Camarote",
    status: "Disponível",
    note: "Área jovem",
    description: "Camarote com ambiente descontraído"
  }
];

interface TicketListProps {
  selectedZone: string;
}

const TicketList = ({ selectedZone }: TicketListProps) => {
  const [selectedTicket, setSelectedTicket] = useState<{name: string; price: string; zone: string} | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTickets = selectedZone === "todas" 
    ? allTickets 
    : allTickets.filter(ticket => ticket.zone.toLowerCase() === selectedZone);

  const handleTicketClick = (ticket: typeof allTickets[0]) => {
    const modalTicket = {
      name: ticket.section,
      price: ticket.price,
      zone: ticket.zone
    };
    setSelectedTicket(modalTicket);
    setIsModalOpen(true);
  };

  return (
    <div>
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
                      <span>💚</span>
                      {ticket.status}
                    </span>
                  )}
                </div>
                
                <h4 className="font-semibold text-sm sm:text-base">{ticket.section}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">{ticket.description}</p>
                
                <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                  <AlertTriangle className="h-3 w-3 flex-shrink-0" />
                  <span>{ticket.note}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-center gap-2">
                <div className="text-lg sm:text-xl font-bold">{ticket.price}</div>
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

      <TicketModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticket={selectedTicket}
      />
    </div>
  );
};

export default TicketList;