import { useState } from "react";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TicketCategory {
  id: string;
  name: string;
  price: number;
  color: string;
}

const ticketCategories: TicketCategory[] = [
  { id: 'gramado', name: 'Gramado', price: 290, color: '#53ad53' },
  { id: 'inferior-sul', name: 'Inferior Sul', price: 220, color: '#ff78c9' },
  { id: 'superior-sul', name: 'Superior Sul', price: 180, color: '#e20615' },
  { id: 'inferior-leste', name: 'Inferior Leste', price: 220, color: '#38a1e0' },
  { id: 'superior-leste', name: 'Superior Leste', price: 180, color: '#832cb2' },
  { id: 'inferior-oeste', name: 'Inferior Oeste', price: 220, color: '#e20615' },
];

const TicketList = () => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleQuantityChange = (categoryId: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[categoryId] || 0;
      const newValue = Math.max(0, Math.min(2, current + delta));
      return { ...prev, [categoryId]: newValue };
    });
  };

  const getTotalPrice = () => {
    let total = 0;
    ticketCategories.forEach(category => {
      const qty = quantities[category.id] || 0;
      total += category.price * qty;
    });
    return total;
  };

  const getTotalItems = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const hasSelectedTickets = getTotalItems() > 0;

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Lista de Ingressos */}
      <div className="space-y-4">
        {ticketCategories.map((category) => {
          const isExpanded = expandedCategories[category.id];
          const qty = quantities[category.id] || 0;
          
          return (
            <div key={category.id} className="bg-white shadow rounded">
              {/* Cabeçalho */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-4"
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: category.color }}
                  />
                  <div>
                    <h2 className="font-semibold text-lg text-gray-900">
                      {category.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      a partir de R$ {category.price.toFixed(0)},00
                    </p>
                  </div>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  {isExpanded ? '-' : '+'}
                </span>
              </button>

              {/* Conteúdo expandido */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-2">
                  <div>
                    <p className="text-gray-900"><strong>Ingresso Inteiro</strong></p>
                    <p className="text-gray-900">Lote Atual</p>
                    <p className="font-semibold text-gray-900">
                      R$ {category.price.toFixed(0)},00 + taxa
                    </p>
                  </div>
                  
                  {/* Controles de quantidade */}
                  <div className="flex items-center space-x-3 mt-2">
                    <label className="text-sm font-medium text-gray-900">
                      Quantidade:
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(category.id, -1)}
                        disabled={qty === 0}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-gray-900">
                        {qty}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(category.id, 1)}
                        disabled={qty >= 2}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Resumo fixo na parte inferior */}
      {hasSelectedTickets && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 shadow-lg z-50">
          <div className="max-w-2xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <p className="text-xs sm:text-sm text-gray-600">Total</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                  R$ {getTotalPrice().toFixed(2).replace('.', ',')}
                </p>
                <p className="text-xs text-gray-500">
                  {getTotalItems()} {getTotalItems() === 1 ? 'ingresso' : 'ingressos'}
                </p>
              </div>
              <Button 
                size="lg"
                className="bg-[#0066cc] hover:bg-[#0052a3] text-white font-bold px-4 sm:px-8 text-sm sm:text-base whitespace-nowrap"
              >
                FINALIZAR COMPRA
                <ChevronRight className="ml-1 sm:ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketList;