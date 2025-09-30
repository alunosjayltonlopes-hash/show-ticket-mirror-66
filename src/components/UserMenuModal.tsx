import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ticket, UserCircle2, LogIn, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface UserMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserMenuModal = ({ isOpen, onClose }: UserMenuModalProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleMyOrders = () => {
    if (user) {
      navigate('/dashboard');
      onClose();
    } else {
      navigate('/auth');
      onClose();
    }
  };

  const handleMyData = () => {
    if (user) {
      // Poderia abrir um modal de configurações ou navegar para perfil
      navigate('/dashboard');
      onClose();
    } else {
      navigate('/auth');
      onClose();
    }
  };

  const handleLoginSignup = () => {
    navigate('/auth');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 gap-0">
        <DialogHeader className="p-4 pb-3 border-b">
          <DialogTitle className="text-center">Meus Dados</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="flex flex-col">
          {/* MEUS PEDIDOS */}
          <Button
            variant="ghost"
            className="w-full justify-center py-6 rounded-none border-b hover:bg-accent/50 text-base font-medium"
            onClick={handleMyOrders}
          >
            <Ticket className="h-5 w-5 mr-2" />
            MEUS PEDIDOS
          </Button>

          {/* MEUS DADOS */}
          <Button
            variant="ghost"
            className="w-full justify-center py-6 rounded-none border-b hover:bg-accent/50 text-base font-medium"
            onClick={handleMyData}
          >
            <UserCircle2 className="h-5 w-5 mr-2" />
            MEUS DADOS
          </Button>

          {/* LOGIN/CADASTRO */}
          <Button
            className="w-full justify-center py-6 rounded-none bg-primary hover:bg-primary/90 text-base font-medium"
            onClick={handleLoginSignup}
          >
            <LogIn className="h-5 w-5 mr-2" />
            Login/Cadastro
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserMenuModal;
