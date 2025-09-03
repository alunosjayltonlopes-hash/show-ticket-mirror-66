import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieChoice');
    if (!cookieChoice) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieChoice', 'accepted');
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookieChoice', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <Card className="p-4 shadow-lg border bg-background">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ao clicar em "Permitir tudo", você concorda com o uso de cookies para melhorar a funcionalidade do site e a relevância de marketing. Caso contrário, utilizaremos apenas cookies estritamente necessários. Consulte nossa{" "}
            <span className="text-primary underline cursor-pointer">
              Política de Cookies
            </span>{" "}
            para obter detalhes.
          </p>
          
          <div className="flex flex-col gap-2">
            <Button 
              onClick={handleRejectAll}
              variant="outline" 
              className="w-full"
            >
              Não permitir
            </Button>
            <Button 
              onClick={handleAcceptAll}
              className="w-full bg-green-700 hover:bg-green-800 text-white"
            >
              Permitir todos
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieBanner;