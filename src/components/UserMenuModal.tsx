import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ticket, UserCircle2, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UserMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn?: boolean;
}

const UserMenuModal = ({ isOpen, onClose, isLoggedIn = false }: UserMenuModalProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.log('UserMenuModal isOpen mudou para:', isOpen);
  }, [isOpen]);

  const handleMyOrders = () => {
    console.log('Clicou em Meus Pedidos, usuário:', user);
    if (user) {
      navigate('/dashboard');
      onClose();
    } else {
      navigate('/auth');
      onClose();
    }
  };

  const handleMyData = () => {
    console.log('Clicou em Meus Dados, usuário:', user);
    if (user) {
      navigate('/dashboard');
      onClose();
    } else {
      navigate('/auth');
      onClose();
    }
  };

  const handleLoginSignup = () => {
    console.log('Clicou em Login/Cadastro');
    navigate('/auth');
    onClose();
  };

  const handleLogout = async () => {
    console.log('Clicou em Sair');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
      
      // Recarrega a página para atualizar o estado
      window.location.reload();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      toast({
        title: "Erro ao sair",
        description: "Não foi possível desconectar. Tente novamente.",
        variant: "destructive",
      });
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      console.log('Dialog onOpenChange:', open);
      if (!open) onClose();
    }}>
      <DialogContent className="max-w-sm p-0 gap-0 bg-background">
        <DialogHeader className="p-4 pb-3 border-b">
          <DialogTitle className="text-center">Meus Dados</DialogTitle>
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

          {/* LOGIN/CADASTRO ou SAIR */}
          {isLoggedIn ? (
            <Button
              className="w-full justify-center py-6 rounded-none bg-destructive hover:bg-destructive/90 text-destructive-foreground text-base font-medium"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              SAIR
            </Button>
          ) : (
            <Button
              className="w-full justify-center py-6 rounded-none bg-primary hover:bg-primary/90 text-base font-medium"
              onClick={handleLoginSignup}
            >
              <LogIn className="h-5 w-5 mr-2" />
              Login/Cadastro
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserMenuModal;
