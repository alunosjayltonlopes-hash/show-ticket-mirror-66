import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

const ArtistInfo = () => {
  return (
    <Card className="p-6">
      <div className="text-center mb-4 sm:mb-6">
        <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-full mb-3 sm:mb-4"></div>
        <h2 className="text-sm sm:text-lg font-semibold">Mapa do Evento:</h2>
      </div>
      
      <div className="space-y-4">
        <div className="w-full">
          <img 
            src="/lovable-uploads/ca995fe1-d161-4e0b-98e4-a0187cd65710.png"
            alt="Mapa do Espaço Classic - Layout do evento mostrando Pista Premium, Frontstage, Camarote Open Bar e outras áreas"
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg mb-3">
          <div className="text-sm font-medium text-green-800 mb-2 flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Áreas Disponíveis:
          </div>
          <div className="grid grid-cols-1 gap-1 text-xs text-green-600">
            <div>• Frontstage</div>
            <div>• Pista Premium</div>
            <div>• Camarote Open Bar</div>
          </div>
        </div>
        
        <div className="bg-red-50 p-3 rounded-lg">
          <div className="text-sm font-medium text-red-800 mb-2 flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            Áreas Indisponíveis:
          </div>
          <div className="grid grid-cols-1 gap-1 text-xs text-red-600">
            <div>• Lounges VIP</div>
            <div>• Área Diamante</div>
            <div>• Setores Ouro/Prata/Bronze</div>
          </div>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <div className="text-sm font-medium text-green-800">Local do Evento</div>
          <div className="text-xs text-green-600 mt-1">Espaço Classic - Mogi Mirim, SP</div>
        </div>
      </div>
      
      <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-full mt-4 sm:mt-6"></div>
      
      <div className="mt-3 sm:mt-4 text-center">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span>Visualize a localização dos setores</span>
        </div>
      </div>
    </Card>
  );
};

export default ArtistInfo;