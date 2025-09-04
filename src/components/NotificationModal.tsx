import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal = ({ isOpen, onClose }: NotificationModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleNotificationChoice = async (choice: boolean) => {
    setIsLoading(true);
    
    // Salvar preferência no localStorage
    localStorage.setItem('eventNotifications', choice.toString());
    
    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast({
      title: choice ? "Notificações ativadas!" : "Notificações desativadas",
      description: choice 
        ? "Você receberá atualizações sobre o evento Henrique & Juliano"
        : "Você não receberá notificações sobre este evento",
    });
    
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificações do Evento
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-4">
              Deseja receber notificações sobre o evento<br />
              <span className="font-medium">Henrique & Juliano</span>?
            </div>
            
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">
                • Lembrete do evento<br />
                • Informações importantes<br />
                • Atualizações de última hora
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={() => handleNotificationChoice(true)}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? "Processando..." : "SIM"}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleNotificationChoice(false)}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? "Processando..." : "NÃO"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;