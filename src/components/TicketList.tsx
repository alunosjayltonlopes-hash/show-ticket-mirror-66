import { useState } from "react";
import { ChevronDown, ChevronRight, Minus, Plus, Ticket, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SubTicket {
  id: string;
  name: string;
  type: "Inteira" | "Meia" | "Solidária" | "PCD/Acompanhante PCD";
  lote: string;
  price: number;
  badge?: string;
  hasFoodDrink?: boolean;
}

interface TicketCategory {
  id: string;
  name: string;
  startingPrice: number;
  color: string;
  badge?: string;
  subTickets: SubTicket[];
}

const ticketCategories: TicketCategory[] = [
  {
    id: "arena",
    name: "Arena",
    startingPrice: 110,
    color: "#e20615",
    badge: "+3",
    subTickets: [
      { id: "arena-inteira", name: "Arena (Inteira)", type: "Inteira", lote: "5_LOTE", price: 220 },
      { id: "arena-meia", name: "Arena (Meia)", type: "Meia", lote: "5_LOTE", price: 110 },
      { id: "arena-solidaria", name: "Arena (Solidária)", type: "Solidária", lote: "5_LOTE + 1KG DE ALIMENTO", price: 120, badge: "SOLIDÁRIA" },
      { id: "arena-pcd", name: "Arena (PCD/Acompanhante PCD)", type: "PCD/Acompanhante PCD", lote: "5_LOTE", price: 110, badge: "COM TAXA" }
    ]
  },
  {
    id: "area-vip",
    name: "Área VIP",
    startingPrice: 250,
    color: "#00bcd4",
    subTickets: [
      { id: "vip-inteira", name: "Área VIP (Inteira)", type: "Inteira", lote: "8_LOTE", price: 500 },
      { id: "vip-meia", name: "Área VIP (Meia)", type: "Meia", lote: "8_LOTE", price: 250 },
      { id: "vip-solidaria", name: "Área VIP (Solidária)", type: "Solidária", lote: "8_LOTE + 1KG DE ALIMENTO", price: 260, badge: "SOLIDÁRIA" }
    ]
  },
  {
    id: "open-bar",
    name: "Open Bar Frente Palco +18",
    startingPrice: 360,
    color: "#8bc34a",
    subTickets: [
      { id: "openbar-inteira", name: "Open Bar Frente Palco +18 (Inteira)", type: "Inteira", lote: "8_LOTE", price: 360, hasFoodDrink: true }
    ]
  },
  {
    id: "premium",
    name: "Premium Open Food e Open Bar+18",
    startingPrice: 560,
    color: "#ff9800",
    subTickets: [
      { id: "premium-inteira", name: "Premium Open Food e Open Bar+18 (Inteira)", type: "Inteira", lote: "8_LOTE", price: 560, hasFoodDrink: true }
    ]
  }
];

const TicketList = () => {
  const [couponCode, setCouponCode] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (subTicketId: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[subTicketId] || 0;
      const newValue = Math.max(0, current + delta);
      return { ...prev, [subTicketId]: newValue };
    });
  };

  const getTotalPrice = () => {
    let total = 0;
    ticketCategories.forEach(category => {
      category.subTickets.forEach(subTicket => {
        const qty = quantities[subTicket.id] || 0;
        total += subTicket.price * qty;
      });
    });
    return total;
  };

  const getTotalItems = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const hasSelectedTickets = getTotalItems() > 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Cabeçalho */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">ADQUIRA SEU INGRESSO AGORA</h1>
        <p className="text-gray-700 mb-4">Tem o Clube GDO Unifique? Adicione seu cupom abaixo.</p>
        
        {/* Campo de cupom */}
        <div className="flex items-center max-w-md mx-auto bg-white border border-gray-300 rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="CÓDIGO AQUI:"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 px-4 py-3 text-sm focus:outline-none"
          />
          <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors">
            <Ticket className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Lista de Ingressos */}
      <Accordion type="single" collapsible className="space-y-4">
        {ticketCategories.map((category) => (
          <AccordionItem 
            key={category.id} 
            value={category.id}
            className="border-0"
          >
            <div className="bg-[#e8e8e8] rounded-lg overflow-hidden data-[state=open]:bg-[#6b6b6b] transition-colors">
              <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-[#d8d8d8] data-[state=open]:hover:bg-[#6b6b6b] transition-colors [&[data-state=open]]:text-white [&>svg]:hidden">
                <div className="flex items-center gap-3 w-full">
                  {/* Ícone colorido */}
                  <div 
                    className="w-6 h-6 rounded flex-shrink-0"
                    style={{ backgroundColor: category.color }}
                  />
                  
                  {/* Nome e Badge */}
                  <div className="flex items-center gap-2 flex-1">
                    <span className="font-semibold text-base">{category.name}</span>
                    {category.badge && (
                      <span className="bg-[#0066cc] text-white text-xs px-2 py-0.5 rounded font-semibold">
                        {category.badge}
                      </span>
                    )}
                  </div>
                  
                  {/* Preço */}
                  <span className="text-sm mr-2">
                    a partir de R$ {category.startingPrice.toFixed(2).replace('.', ',')}
                  </span>
                  
                  {/* Ícone customizado */}
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                    <ChevronDown className="w-4 h-4 text-white transition-transform duration-200 [&[data-state=open]]:rotate-180" />
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-0 pb-0">
                <div className="bg-white">
                  {category.subTickets.map((subTicket, index) => {
                    const qty = quantities[subTicket.id] || 0;
                    
                    return (
                      <div 
                        key={subTicket.id}
                        className={cn(
                          "px-4 py-4 border-t border-gray-200",
                          index === 0 && "border-t-0"
                        )}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            {/* Nome do ingresso com badge e info */}
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm text-gray-900">
                                Ingresso: <span className="font-semibold">{subTicket.name}</span>
                              </span>
                              {subTicket.type === "Meia" && (
                                <Info className="w-4 h-4 text-[#0066cc] cursor-pointer" />
                              )}
                              {subTicket.badge && (
                                <span className="bg-[#0066cc] text-white text-xs px-2 py-0.5 rounded font-semibold">
                                  {subTicket.badge}
                                </span>
                              )}
                            </div>
                            
                            {/* Lote */}
                            <p className="text-xs text-gray-600 mb-1">
                              Lote: <span className="font-medium">{subTicket.lote}</span>
                            </p>
                            
                            {/* Valor */}
                            <p className="text-xs text-[#0066cc] font-medium">
                              Valor: R$ {subTicket.price.toFixed(2).replace('.', ',')} + taxa
                              {subTicket.hasFoodDrink && (
                                <>
                                  {" "}
                                  <Ticket className="inline w-3 h-3" />
                                  <span className="ml-1">🍴</span>
                                </>
                              )}
                            </p>
                          </div>
                          
                          {/* Controles de quantidade */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(subTicket.id, -1)}
                              disabled={qty === 0}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold text-gray-900">
                              {qty}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(subTicket.id, 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </div>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Resumo fixo na parte inferior */}
      {hasSelectedTickets && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 shadow-lg z-50">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  R$ {getTotalPrice().toFixed(2).replace('.', ',')}
                </p>
                <p className="text-xs text-gray-500">
                  {getTotalItems()} {getTotalItems() === 1 ? 'ingresso' : 'ingressos'}
                </p>
              </div>
              <Button 
                size="lg"
                className="bg-[#0066cc] hover:bg-[#0052a3] text-white font-bold px-8"
              >
                FINALIZAR COMPRA
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketList;