import { Card } from "./ui/card";

const ManifestoStadiumMap = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Card className="p-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">MAPA DO ESTÁDIO</h2>
          <p className="text-xl text-ticket-green">03 DE JANEIRO</p>
          <p className="text-lg">MARACANÃ - RIO DE JANEIRO</p>
        </div>

        {/* Stadium Map Image */}
        <div className="relative max-w-3xl mx-auto mb-8">
          <div className="aspect-square bg-slate-800/50 rounded-lg flex items-center justify-center">
            {/* Placeholder for stadium map - you can add the actual stadium map image here */}
            <div className="text-center space-y-4 p-8">
              <div className="text-6xl">🏟️</div>
              <p className="text-lg">Mapa do Maracanã</p>
              <p className="text-sm text-muted-foreground">Vista dos setores disponíveis</p>
            </div>
          </div>
        </div>

        {/* Price Legend */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-center">TABELA DE PREÇOS</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="bg-blue-600 p-3 rounded text-center">
              <div className="font-bold">PISTA</div>
              <div className="text-sm">R$ 280,00</div>
            </div>
            <div className="bg-green-600 p-3 rounded text-center">
              <div className="font-bold">CADEIRA</div>
              <div className="text-sm">R$ 350,00</div>
            </div>
            <div className="bg-purple-600 p-3 rounded text-center">
              <div className="font-bold">VIP</div>
              <div className="text-sm">R$ 500,00</div>
            </div>
            <div className="bg-orange-600 p-3 rounded text-center">
              <div className="font-bold">CAMAROTE</div>
              <div className="text-sm">R$ 800,00</div>
            </div>
            <div className="bg-red-600 p-3 rounded text-center">
              <div className="font-bold">PREMIUM</div>
              <div className="text-sm">R$ 1.200,00</div>
            </div>
            <div className="bg-yellow-600 p-3 rounded text-center">
              <div className="font-bold">ÁREA VIP</div>
              <div className="text-sm">R$ 1.500,00</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ManifestoStadiumMap;
