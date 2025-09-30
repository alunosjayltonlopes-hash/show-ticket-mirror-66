import { useState } from "react";
import { ChevronDown, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TicketCategory {
  id: string;
  name: string;
  price: number;
  color: string;
  checkoutUrls: {
    quantity1: string;
    quantity2: string;
  };
}

const ticketCategories: TicketCategory[] = [
  {
    id: "gramado",
    name: "Gramado",
    price: 290,
    color: "#53ad53",
    checkoutUrls: {
      quantity1: "https://checkout.vendeagora.com/api/public/shopify?product=713623463492&store=7136",
      quantity2: "https://checkout.vendeagora.com/api/public/shopify?product=713621611623&store=7136"
    }
  },
  {
    id: "inferior-sul",
    name: "Inferior Sul",
    price: 220,
    color: "#ff78c9",
    checkoutUrls: {
      quantity1: "https://checkout.vendeagora.com/api/public/shopify?product=713615632376&store=7136",
      quantity2: "https://checkout.vendeagora.com/api/public/shopify?product=713684979622&store=7136"
    }
  },
  {
    id: "superior-sul",
    name: "Superior Sul",
    price: 180,
    color: "#e20615",
    checkoutUrls: {
      quantity1: "https://checkout.vendeagora.com/api/public/shopify?product=713697639947&store=7136",
      quantity2: "https://checkout.vendeagora.com/api/public/shopify?product=713631219612&store=7136"
    }
  },
  {
    id: "inferior-leste",
    name: "Inferior Leste",
    price: 220,
    color: "#38a1e0",
    checkoutUrls: {
      quantity1: "https://checkout.vendeagora.com/api/public/shopify?product=713623463492&store=7136",
      quantity2: "https://checkout.vendeagora.com/api/public/shopify?product=713621611623&store=7136"
    }
  },
  {
    id: "superior-leste",
    name: "Superior Leste",
    price: 180,
    color: "#832cb2",
    checkoutUrls: {
      quantity1: "https://checkout.vendeagora.com/api/public/shopify?product=713615632376&store=7136",
      quantity2: "https://checkout.vendeagora.com/api/public/shopify?product=713684979622&store=7136"
    }
  },
  {
    id: "inferior-oeste",
    name: "Inferior Oeste",
    price: 220,
    color: "#e20615",
    checkoutUrls: {
      quantity1: "https://checkout.vendeagora.com/api/public/shopify?product=713697639947&store=7136",
      quantity2: "https://checkout.vendeagora.com/api/public/shopify?product=713631219612&store=7136"
    }
  }
];

const TicketList = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleCategoryClick = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleQuantityChange = (categoryId: string, newQuantity: number) => {
    if (newQuantity >= 0 && newQuantity <= 2) {
      setQuantities(prev => ({
        ...prev,
        [categoryId]: newQuantity
      }));
    }
  };

  const getTotalItems = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(quantities).reduce((sum, [categoryId, qty]) => {
      const category = ticketCategories.find(c => c.id === categoryId);
      return sum + (category ? category.price * qty : 0);
    }, 0);
  };

  const handleContinue = () => {
    // Encontrar a categoria com ingressos selecionados
    const selectedCategory = Object.entries(quantities).find(([_, qty]) => qty > 0);
    
    if (selectedCategory) {
      const [categoryId, quantity] = selectedCategory;
      const category = ticketCategories.find(c => c.id === categoryId);
      
      if (category) {
        const checkoutUrl = quantity === 1 ? category.checkoutUrls.quantity1 : category.checkoutUrls.quantity2;
        window.open(checkoutUrl, '_blank');
      }
    }
  };

  const hasSelectedTickets = getTotalItems() > 0;

  return (
    <div className="relative pb-24">
      <div className="space-y-3">
        {ticketCategories.map((category) => {
          const isExpanded = expandedCategory === category.id;
          const quantity = quantities[category.id] || 0;

          return (
            <div key={category.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
              {/* Header - sempre visível */}
              <button
                onClick={() => handleCategoryClick(category.id)}
                className="w-full px-4 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
              >
                {/* Quadrado colorido */}
                <div 
                  className="w-10 h-10 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: category.color }}
                />
                
                {/* Informações do ingresso */}
                <div className="flex-1 flex flex-col items-start gap-1">
                  <h3 className="font-bold text-base text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-600">
                    a partir de R$ {category.price.toFixed(2)}
                  </p>
                </div>

                {/* Ícone de expandir */}
                <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <ChevronDown 
                    className={cn(
                      "h-4 w-4 text-white transition-transform",
                      isExpanded && "rotate-180"
                    )}
                  />
                </div>
              </button>

              {/* Conteúdo expansível */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50">
                  <div className="pt-4 space-y-4">
                    {/* Seletor de quantidade */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Quantidade:</span>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-lg border-gray-300"
                          onClick={() => handleQuantityChange(category.id, quantity - 1)}
                          disabled={quantity <= 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-bold text-xl w-10 text-center text-gray-900">{quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-lg border-gray-300"
                          onClick={() => handleQuantityChange(category.id, quantity + 1)}
                          disabled={quantity >= 2}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    {quantity > 0 && (
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <span className="text-sm font-medium text-gray-600">Subtotal:</span>
                        <span className="font-bold text-xl text-gray-900">
                          R$ {(category.price * quantity).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Carrinho fixo na parte inferior */}
      {hasSelectedTickets && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-ticket-green shadow-lg border-t-4 border-ticket-green-dark">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-white">
                <ShoppingCart className="h-5 w-5" />
                <div>
                  <p className="font-bold text-lg">
                    {getTotalItems()} {getTotalItems() === 1 ? 'Ingresso' : 'Ingressos'}
                  </p>
                  <p className="text-sm opacity-90">
                    R$ {getTotalPrice().toFixed(2)}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleContinue}
                className="bg-white text-ticket-green-dark hover:bg-white/90 font-bold px-6 h-11"
              >
                CONTINUAR
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketList;