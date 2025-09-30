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
    <div className="max-w-2xl mx-auto px-4 py-4 sm:py-8">
      {/* Lista de Ingressos */}
      <div className="space-y-3 sm:space-y-4">
        {ticketCategories.map((category) => {
          const isExpanded = expandedCategories[category.id];
          const qty = quantities[category.id] || 0;
          
          return (
            <div key={category.id} className="bg-white shadow rounded overflow-hidden">
              {/* Cabeçalho */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-3 sm:p-4"
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div 
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded flex-shrink-0" 
                    style={{ backgroundColor: category.color }}
                  />
                  <div className="text-left">
                    <h2 className="font-semibold text-base sm:text-lg text-gray-900">
                      {category.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                      a partir de R$ {category.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-gray-900 flex-shrink-0">
                  {isExpanded ? '−' : '+'}
                </span>
              </button>

              {/* Conteúdo expandido */}
              {isExpanded && (
                <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-3">
                  <div>
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Ingresso Inteiro</p>
                    <p className="text-xs sm:text-sm text-gray-600">Lote Atual</p>
                    <p className="font-semibold text-sm sm:text-base text-gray-900">
                      R$ {category.price.toFixed(2).replace('.', ',')} + taxa
                    </p>
                  </div>
                  
                  {/* Controles de quantidade */}
                  <div className="flex items-center space-x-3 mt-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-900">
                      Quantidade:
                    </label>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(category.id, -1)}
                        disabled={qty === 0}
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <span className="w-6 sm:w-8 text-center font-semibold text-sm sm:text-base text-gray-900">
                        {qty}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(category.id, 1)}
                        disabled={qty >= 2}
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
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