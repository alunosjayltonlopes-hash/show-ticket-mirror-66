import { useState } from "react";
import { ChevronRight, Minus, Plus, Ticket, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

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
      <div className="space-y-4">
        {ticketCategories.map((category) => {
          const isExpanded = expandedCategories[category.id];
          
          return (
            <div key={category.id} className="bg-white shadow rounded-lg overflow-hidden">
              {/* Cabeçalho */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex justify-between items-center p-4 text-white font-semibold text-lg transition-colors"
                style={{ backgroundColor: category.color }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {category.id === 'arena' && '🎫'}
                    {category.id === 'area-vip' && '👑'}
                    {category.id === 'open-bar' && '🍻'}
                    {category.id === 'premium' && '🍽️'}
                  </span>
                  <span>{category.name}</span>
                  {category.badge && (
                    <span className="bg-white/20 text-white text-xs px-2 py-1 rounded">
                      {category.badge}
                    </span>
                  )}
                </div>
                <span className="text-2xl font-bold">
                  {isExpanded ? '−' : '+'}
                </span>
              </button>

              {/* Conteúdo expandido */}
              {isExpanded && (
                <div className="p-4 space-y-4">
                  {category.subTickets.map((subTicket) => {
                    const qty = quantities[subTicket.id] || 0;
                    
                    return (
                      <div key={subTicket.id} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            {/* Nome do ingresso */}
                            <div className="flex items-center gap-2 mb-1">
                              <strong className="text-gray-900">Ingresso:</strong>
                              <span className="text-gray-900">{subTicket.name}</span>
                              {subTicket.type === "Meia" && (
                                <Info className="w-4 h-4 text-blue-600 cursor-pointer" />
                              )}
                              {subTicket.badge && (
                                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded font-semibold">
                                  {subTicket.badge}
                                </span>
                              )}
                            </div>
                            
                            {/* Lote */}
                            <div className="text-sm text-gray-600 mb-1">
                              <span>Lote: {subTicket.lote}</span>
                            </div>
                            
                            {/* Valor */}
                            <div className="text-sm font-bold text-gray-900 mb-1">
                              R$ {subTicket.price.toFixed(2).replace('.', ',')} + taxa
                            </div>

                            {/* Open Bar/Food info */}
                            {subTicket.hasFoodDrink && category.id === 'open-bar' && (
                              <p className="text-xs text-gray-500 mt-1">
                                Open Bar: Água, Cerveja e Refrigerante
                              </p>
                            )}
                            {subTicket.hasFoodDrink && category.id === 'premium' && (
                              <p className="text-xs text-gray-700 mt-1">
                                Open Bar: Cerveja, Água, Refrigerante, Vodka, Gin, Tônica, Whisky e Energético<br/>
                                Open Food: Pizzas, Anéis de cebola, Pastéis variados, Bolinho de queijo e bacalhau, Mini sanduíches, Bruschetta, Hambúrguer, Massa 4 queijos, Risoto de alho poró, Brigadeiro, Mini churros.
                              </p>
                            )}
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
              )}
            </div>
          );
        })}
      </div>

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