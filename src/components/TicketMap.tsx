import { Card } from "@/components/ui/card";
import { Plus, Minus, RotateCcw, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

const TicketMap = () => {
  return (
    <Card className="p-3 sm:p-4">
      <div className="relative h-48 sm:h-64 bg-muted rounded-lg overflow-hidden">
        <div className="absolute top-2 right-2 flex flex-col gap-1 sm:gap-2">
          <Button variant="outline" size="icon" className="h-6 w-6 sm:h-8 sm:w-8">
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-6 w-6 sm:h-8 sm:w-8">
            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-6 w-6 sm:h-8 sm:w-8">
            <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-6 w-6 sm:h-8 sm:w-8">
            <Maximize className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
        
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.234567890123!2d-47.01887631586914!3d-22.43334890639271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDI2JzAwLjEiUyA0N8KwMDEnMDcuOSJX!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização do Evento"
          className="rounded-lg"
        ></iframe>
      </div>
      
      <div className="mt-3 sm:mt-4">
        <div className="text-xs sm:text-sm font-medium mb-2">Localização</div>
        <div className="text-xs sm:text-sm text-muted-foreground">
          Espaço Classic - Mogi Mirim, São Paulo, Brasil
        </div>
      </div>
    </Card>
  );
};

export default TicketMap;