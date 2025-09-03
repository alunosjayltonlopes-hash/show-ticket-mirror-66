import { Card } from "@/components/ui/card";
import { Music, Users, Star } from "lucide-react";

const ArtistInfo = () => {
  return (
    <Card className="p-6">
      <div className="text-center mb-4 sm:mb-6">
        <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-full mb-3 sm:mb-4"></div>
        <h2 className="text-sm sm:text-lg font-semibold">Sobre os Artistas:</h2>
      </div>
      
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Henrique & Juliano</h3>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
              <Music className="h-4 w-4" />
              <span>Sertanejo</span>
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Dupla</span>
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
              <Star className="h-4 w-4" />
              <span>Tocantins</span>
            </div>
          </div>
        </div>
        
        <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-justify">
          <p>
            Henrique & Juliano é uma dupla sertaneja formada pelos irmãos Ricelly Henrique Tavares Reis (Henrique) e Edson Alves dos Reis Junior (Juliano), originários de Palmeirópolis, no Tocantins. Com presença frequente dentre os artistas mais ouvidos do país, a dupla é dona de diversos hits, com destaque para "Flor e o Beija-Flor", com a participação da cantora sertaneja Marília Mendonça.
          </p>
          <br />
          <p>
            Desde 2012, tiveram sua carreira agenciada pelo escritório Workshow, onde viram sua carreira explodir nacionalmente e permaneceram até 2022, quando decidiram abrir um escritório para agenciar a própria carreira. Em 2024, os irmãos passaram a agenciar a carreira de outros artistas do gênero, como Grelo e CESINHA MELLO.
          </p>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <div className="text-sm font-medium text-green-800">Hit Principal</div>
          <div className="text-xs text-green-600 mt-1">"Flor e o Beija-Flor" feat. Marília Mendonça</div>
        </div>
      </div>
      
      <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-full mt-4 sm:mt-6"></div>
      
      <div className="mt-3 sm:mt-4 text-center">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span>Artistas mais ouvidos do país</span>
        </div>
      </div>
    </Card>
  );
};

export default ArtistInfo;