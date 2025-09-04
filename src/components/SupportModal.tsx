import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail, Clock, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportModal = ({ isOpen, onClose }: SupportModalProps) => {
  const { toast } = useToast();

  const copyEmail = () => {
    navigator.clipboard.writeText("sac@viagogo.com");
    toast({
      title: "Email copiado!",
      description: "O email foi copiado para a área de transferência",
    });
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Ajuda & Suporte
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            Precisa de ajuda? Entre em contato conosco!
          </div>

          {/* Email de Suporte */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-800">Email</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono">sac@viagogo.com</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyEmail}
                className="h-6 w-6 p-0"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Horário de Atendimento */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-4 w-4 text-gray-600" />
              <span className="font-medium text-gray-800">Horário de Atendimento</span>
            </div>
            <div className="text-sm text-gray-600">
              Segunda a Sexta: 9h às 18h<br />
              Sábado: 9h às 14h<br />
              <span className="text-xs">Exceto feriados</span>
            </div>
          </div>

          {/* FAQ */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Perguntas Frequentes:</div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• Como posso alterar ou cancelar minha compra?</div>
              <div>• Não recebi meu ingresso por email</div>
              <div>• Como funciona a entrada no evento?</div>
              <div>• Posso transferir meu ingresso?</div>
            </div>
          </div>
          
          <Button onClick={onClose} className="w-full">
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportModal;