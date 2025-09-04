import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, User, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSave = async () => {
    setIsLoading(true);

    // Validações
    if (!validateEmail(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (formData.newPassword && !validatePassword(formData.newPassword)) {
      toast({
        title: "Senha muito fraca",
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Senhas não coincidem",
        description: "A confirmação de senha deve ser igual à nova senha",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso",
    });

    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações do Perfil
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Nome
            </Label>
            <Input
              id="name"
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="border-t pt-4 space-y-4">
            <div className="text-sm font-medium text-muted-foreground">
              Alterar Senha
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Senha Atual
              </Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Senha atual"
                value={formData.currentPassword}
                onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova Senha</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Nova senha (mín. 6 caracteres)"
                value={formData.newPassword}
                onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme a nova senha"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isLoading} className="flex-1">
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;