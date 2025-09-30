import { useState } from "react";
import { ChevronDown, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TicketCategory {
  id: string;
  name: string;
  price: number;
  checkoutUrls: {
    quantity1: string;
    quantity2: string;
  };
}

const ticketCategories: TicketCategory[] = [
  {
    id: "gramado",
    name: "GRAMADO",
    price: 290,
    checkoutUrls: {
      quantity1: "https://checkout.vendeagora.com/api/public/shopify?product=713623463492&store=7136",
      quantity2: "https://checkout.vendeagora.com/api/public/shopify?product=713621611623&store=7136"
    }
  },
  {
    id: "inferior-sul",
    name: "INFERIOR SUL",
    price: 220,
    checkoutUrls: {
      quantity1: "https://checkout.vendeagora.com/api/public/shopify?product=713615632376&store=7136",
      quantity2: "https://checkout.vendeagora.com/api/public/shopify?product=713684979622&store=7136"
    }
  },
  {
    id: "superior-sul",
    name: "SUPERIOR SUL",
    price: 180,
    checkoutUrls: {
      quantity1: "https://checkout.vendeagora.com/api/public/shopify?product=713697639947&store=7136",
      quantity2: "https://checkout.vendeagora.com/api/public/shopify?product=713631219612&store=7136"
    }
  },
  {
    id: "inferior-leste",
    name: "INFERIOR LESTE",
    price: 220,
    checkoutUrls: {
      quantity1: "https://checkout.vendeagora.com/api/public/shopify?product=713623463492&store=7136",
      quantity2: "https://checkout.vendeagora.com/api/public/shopify?product=713621611623&store=7136"
    }
  },
  {
    id: "superior-leste",
    name: "SUPERIOR LESTE",
    price: 180,
    checkoutUrls: {
      quantity1: "https://checkout.vendeagora.com/api/public/shopify?product=713615632376&store=7136",
      quantity2: "https://checkout.vendeagora.com/api/public/shopify?product=713684979622&store=7136"
    }
  },
  {
    id: "inferior-oeste",
    name: "INFERIOR OESTE",
    price: 220,
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
      <div className="space-y-2">
        {ticketCategories.map((category) => {
          const isExpanded = expandedCategory === category.id;
          const quantity = quantities[category.id] || 0;

          return (
            <div key={category.id} className="border border-border rounded-lg overflow-hidden bg-card">
              {/* Header - sempre visível */}
              <button
                onClick={() => handleCategoryClick(category.id)}
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col items-start gap-1">
                  <h3 className="font-semibold text-base">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    R$ {category.price.toFixed(2)}
                  </p>
                </div>
                <ChevronDown 
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform",
                    isExpanded && "rotate-180"
                  )}
                />
              </button>

              {/* Conteúdo expansível */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-border bg-muted/20">
                  <div className="pt-4 space-y-4">
                    {/* Seletor de quantidade */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Quantidade:</span>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(category.id, quantity - 1)}
                          disabled={quantity <= 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(category.id, quantity + 1)}
                          disabled={quantity >= 2}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    {quantity > 0 && (
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-sm text-muted-foreground">Subtotal:</span>
                        <span className="font-bold text-lg">
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