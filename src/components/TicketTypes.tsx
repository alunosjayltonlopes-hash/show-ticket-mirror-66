import { Card } from "@/components/ui/card";
import { useState } from "react";
import TicketModal from "./TicketModal";

const ticketTypes = [
  { price: "R$ 284", name: "PISTA PREMIUM", color: "bg-ticket-green-light", zone: "Pista", badge: "Mais barato", rating: "10,0 Incrível" },
  { price: "R$ 406", name: "FRONTSTAGE", color: "bg-ticket-green", zone: "Frontstage" },
  { price: "R$ 776", name: "CAMAROTE OPEN BAR", color: "bg-ticket-green", zone: "Camarote" }
];

const TicketTypes = () => {
  const [selectedTicket, setSelectedTicket] = useState<typeof ticketTypes[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTicketClick = (ticket: typeof ticketTypes[0]) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };
  return (
    <Card className="p-6">
      <div className="text-center mb-4 sm:mb-6">
        <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-full mb-3 sm:mb-4"></div>
        <h2 className="text-sm sm:text-lg font-semibold">Existem 3 Tipos de Ingressos para este Evento:</h2>
      </div>
      
      <div className="space-y-2 sm:space-y-3">
        {ticketTypes.map((ticket, index) => (
          <div 
            key={index}
            className={`${ticket.color} p-3 sm:p-4 rounded-lg text-center cursor-pointer hover:opacity-90 transition-opacity active:scale-95`}
            onClick={() => handleTicketClick(ticket)}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="font-bold text-sm sm:text-lg text-gray-800">{ticket.price}</div>
              {ticket.badge && (
                <span className="text-xs bg-green-600 text-white px-2 py-1 rounded flex items-center gap-1">
                  💚 {ticket.badge}
                </span>
              )}
              {ticket.rating && (
                <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                  {ticket.rating}
                </span>
              )}
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-700">{ticket.name}</div>
          </div>
        ))}
      </div>
      
      <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-full mt-4 sm:mt-6"></div>
      
      <div className="mt-3 sm:mt-4 text-center">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span>Mais barato</span>
        </div>
      </div>

      <TicketModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticket={selectedTicket}
      />
    </Card>
  );
};

export default TicketTypes;