import { Card } from "@/components/ui/card";
import { useState } from "react";
import TicketModal from "./TicketModal";

const ticketTypes = [
  { price: "R$ 231", name: "FRONTSTAGE", color: "bg-ticket-green-light", zone: "Frontstage" },
  { price: "R$ 354", name: "CAMAROTE INTENSE", color: "bg-ticket-green", zone: "Camarote" },
  { price: "R$ 607", name: "CAMAROTE IMPERIAL", color: "bg-ticket-green", zone: "Camarote" },
  { price: "R$ 919", name: "CAMAROTE DO PATRÃO", color: "bg-ticket-green", zone: "Camarote" },
  { price: "R$ 628", name: "CAMAROTE HYPE", color: "bg-ticket-green", zone: "Camarote" }
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
        <h2 className="text-sm sm:text-lg font-semibold">Existem 5 Tipos de Ingressos para este Evento:</h2>
      </div>
      
      <div className="space-y-2 sm:space-y-3">
        {ticketTypes.map((ticket, index) => (
          <div 
            key={index}
            className={`${ticket.color} p-3 sm:p-4 rounded-lg text-center cursor-pointer hover:opacity-90 transition-opacity active:scale-95`}
            onClick={() => handleTicketClick(ticket)}
          >
            <div className="font-bold text-sm sm:text-lg text-gray-800">{ticket.price}</div>
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