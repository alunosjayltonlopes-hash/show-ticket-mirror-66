import { Dialog, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { X, Printer, AlertTriangle, Shield, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: {
    name: string;
    price: string;
    zone: string;
    urgency: string;
  } | null;
}

const TicketModal = ({ isOpen, onClose, ticket }: TicketModalProps) => {
  const [quantity, setQuantity] = useState(1);
  
  if (!ticket) return null;

  // Extrair o valor numérico do preço
  const extractPrice = (priceString: string): number => {
    const matches = priceString.match(/R\$\s*([\d,]+)/);
    if (matches) {
      return parseFloat(matches[1].replace(',', '.'));
    }
    return 0;
  };

  const unitPrice = extractPrice(ticket.price);
  const totalPrice = unitPrice * quantity;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 2) {
      setQuantity(newQuantity);
    }
  };

  const handlePurchase = () => {
    // Redirecionar para checkout externo com quantidade
    const checkoutUrl = `https://checkout.exemplo.com?ticket=${encodeURIComponent(ticket.name)}&price=${encodeURIComponent(ticket.price)}&zone=${encodeURIComponent(ticket.zone)}&quantity=${quantity}`;
    window.open(checkoutUrl, '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-sm sm:max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg mx-auto max-h-[90vh] overflow-y-auto"
          )}
        >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-base sm:text-lg font-semibold">
              Seção {ticket.zone}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground text-left">
            Zona Frente do palco
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Ver todos os ingressos nesta seção
          </p>

          {/* Seletor de quantidade */}
          <div className="bg-gray-50 p-4 rounded-lg border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Quantidade:</span>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-2 hover:bg-gray-100"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-bold text-xl w-10 text-center bg-white px-2 py-1 rounded border">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-2 hover:bg-gray-100"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 2}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Preço unitário e total */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <div>
                <div className="text-xs text-gray-600">
                  {ticket.price} <span className="font-normal">cada</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-800">
                  R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs sm:text-sm font-normal text-gray-600">total</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Os preços incluem taxa e taxa de reserva, excluindo taxa de entrega
          </p>

          <div className="bg-ticket-green-light p-3 rounded-lg">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
              <span className="text-green-700">💚</span>
              <span className="text-green-700">Melhor preço!</span>
            </div>
            <p className="text-xs text-green-600 mt-1">
              {ticket.urgency}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <div className="bg-teal-50 p-2 rounded text-center text-xs text-teal-600 border border-teal-200">
              PIX
            </div>
          </div>

          <p className="text-xs text-center">
            Pagamento instantâneo com <span className="text-teal-600 font-medium">PIX</span>
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Printer className="h-4 w-4 flex-shrink-0" />
              <span>Imprimir em casa ingresso</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              <span>Meia estudante</span>
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Shield className="h-4 w-4 flex-shrink-0 text-blue-600" />
              <span className="text-blue-700">
                Nós garantimos todos os pedidos para que você possa comprar ingressos com 100% de confiança.
              </span>
            </div>
          </div>

          <Button 
            className="w-full bg-ticket-green hover:bg-ticket-green/90 text-white h-10"
            onClick={handlePurchase}
          >
            Selecionar
          </Button>
        </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

export default TicketModal;