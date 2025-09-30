import { Share2 } from "lucide-react";
import { Button } from "./ui/button";

const ManifestoHero = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-ticket-green/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-ticket-green/10 rounded-full blur-3xl" />
      
      <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight">
            MANIFESTO
          </h1>
          <p className="text-2xl md:text-3xl text-ticket-green font-semibold">
            Musical
          </p>
          <p className="text-xl text-white/90">
            JANEIRO • MARACANÃ
          </p>
        </div>
      </div>

      {/* Top right button */}
      <div className="absolute top-4 right-4">
        <Button variant="outline" size="sm" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
          ENTRAR
        </Button>
      </div>
    </div>
  );
};

export default ManifestoHero;
