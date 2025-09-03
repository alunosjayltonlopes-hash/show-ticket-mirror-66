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
        
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center text-muted-foreground">
            <div className="text-xs sm:text-sm mb-2">Mapa do Local</div>
            <div className="w-24 h-16 sm:w-32 sm:h-20 bg-ticket-green rounded mx-auto mb-2"></div>
            <div className="text-xs">Palco Principal</div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 sm:mt-4">
        <div className="text-xs sm:text-sm font-medium mb-2">Legenda</div>
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <div className="w-3 h-3 bg-success rounded-full flex-shrink-0"></div>
          <span>Mais barato</span>
        </div>
      </div>
    </Card>
  );
};

export default TicketMap;