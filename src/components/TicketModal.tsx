import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Printer, AlertTriangle } from "lucide-react";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: {
    name: string;
    price: string;
    zone: string;
  } | null;
}

const TicketModal = ({ isOpen, onClose, ticket }: TicketModalProps) => {
  if (!ticket) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm sm:max-w-md mx-4 max-h-[90vh] overflow-y-auto">
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

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl sm:text-2xl font-bold">
                {ticket.price} <span className="text-xs sm:text-sm font-normal">cada</span>
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
              Apenas 14 ingressos restantes neste preço.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-muted p-2 rounded text-center text-xs">
              Cartão
            </div>
            <div className="bg-blue-50 p-2 rounded text-center text-xs text-blue-600 border border-blue-200">
              PayPal
            </div>
            <div className="bg-teal-50 p-2 rounded text-center text-xs text-teal-600 border border-teal-200">
              PIX
            </div>
          </div>

          <p className="text-xs text-center">
            Compre agora, pague depois com <span className="text-blue-600 font-medium">PayPal</span>
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

          <Button className="w-full bg-ticket-green hover:bg-ticket-green/90 text-white h-10">
            Selecionar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketModal;