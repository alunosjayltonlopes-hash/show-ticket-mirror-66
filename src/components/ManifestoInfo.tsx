import { Calendar, MapPin, Clock, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const ManifestoInfo = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
      <Card className="bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="grid md:grid-cols-[300px,1fr] gap-6 p-6">
          {/* Event Image */}
          <div className="flex justify-center md:justify-start">
            <div className="w-full max-w-[280px] rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/98e03c32-dc48-4f1d-aa0a-7aae31d6e317.png" 
                alt="Manifesto Musical"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">
                Manifesto Musical - Maracanã
              </h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Sábado, 5 de Janeiro de 2025</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>19:00</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Maracanã - Rio de Janeiro-RJ</span>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex gap-2 pt-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Compartilhar
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">180</div>
                <div className="text-xs text-muted-foreground">CURTIDAS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">45</div>
                <div className="text-xs text-muted-foreground">COMENTÁRIOS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1.2K</div>
                <div className="text-xs text-muted-foreground">COMPARTILHAMENTOS</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ManifestoInfo;
